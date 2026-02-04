'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateItinerary(data) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `You are a professional travel planner API. Generate a comprehensive ${data.duration}-day travel plan for ${data.destination}.

Travel Details:
- Destination: ${data.destination}
- Duration: ${data.duration} days
- Budget Level: ${data.budget}
- Travel Type: ${data.travelType}

BUDGET GUIDELINES:
- LOW: ₹500-1500/day (budget hotels ₹800-1200, street food, free attractions)
- MEDIUM: ₹2000-4000/day (3-star hotels ₹2500-3500, mid-range dining, paid attractions)
- LUXURY: ₹8000+/day (4-5 star hotels ₹6000+, fine dining, premium experiences)

Return ONLY valid JSON (no markdown, no code blocks, no extra text):

{
  "destination": "${data.destination}",
  "duration": "${data.duration}",
  "budgetLevel": "${data.budget}",
  "travelType": "${data.travelType}",
  "topPlaces": [
    {
      "name": "Specific landmark/attraction name",
      "whyVisit": "Brief compelling reason (20-30 words)",
      "entryFee": "₹XXX or Free",
      "bestTime": "Morning/Afternoon/Evening with timing"
    }
  ],
  "hotels": [
    {
      "name": "Actual hotel name or hotel type",
      "pricePerNight": "₹XXXX",
      "rating": "4.5",
      "location": "Specific area/neighborhood",
      "type": "Budget/Mid-Range/Luxury",
      "amenities": "WiFi, Pool, Breakfast included"
    }
  ],
  "restaurants": [
    {
      "name": "Restaurant name or cuisine type",
      "priceForTwo": "₹XXXX",
      "rating": "4.3",
      "cuisine": "North Indian/Italian/Chinese etc",
      "location": "Area name",
      "mustTry": "Signature dish"
    }
  ],
  "days": [
    {
      "day": 1,
      "title": "Day theme/title",
      "plan": [
        "Morning: Specific activity with time (8 AM - 11 AM)",
        "Afternoon: Specific activity with time (12 PM - 4 PM)",
        "Evening: Specific activity with time (5 PM - 8 PM)"
      ],
      "estimatedCost": "₹XXXX"
    }
  ],
  "costBreakdown": {
    "accommodation": "₹XXXX",
    "food": "₹XXXX",
    "activities": "₹XXXX",
    "transport": "₹XXXX",
    "total": "₹XXXX"
  },
  "tips": [
    "Practical tip 1 specific to ${data.destination}",
    "Practical tip 2 about local transport/safety",
    "Practical tip 3 about best time to visit places",
    "Practical tip 4 about money/bargaining",
    "Practical tip 5 about hidden gems"
  ]
}

IMPORTANT:
- Provide exactly ${data.duration} days in the "days" array
- Provide at least 6 top places
- Provide at least 5 hotels matching the ${data.budget} budget
- Provide at least 6 restaurants
- All prices in Indian Rupees (₹)
- Be specific with names, locations, and timings
- Make it realistic and actionable`;

    const result = await model.generateContent(prompt);
    let content = result.response.text();

    if (!content) {
      throw new Error('No response content from Gemini');
    }

    // Clean the response
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const itinerary = JSON.parse(content);

    return {
      success: true,
      data: {
        ...itinerary,
        destination: data.destination,
        duration: data.duration,
        budget: data.budget,
        travelType: data.travelType,
      },
    };
  } catch (error) {
    console.error('[Gemini] Itinerary generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate itinerary',
    };
  }
}