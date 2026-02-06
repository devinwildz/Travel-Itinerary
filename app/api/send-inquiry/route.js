import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, packageName } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send email
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: process.env.RESEND_TO_EMAIL,
            subject: `New Package Inquiry: ${packageName || 'Travel Package'}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            📧 New Package Inquiry
          </h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #8b5cf6; margin-top: 0;">Package Details</h3>
            <p style="margin: 5px 0;"><strong>Package:</strong> ${packageName || 'N/A'}</p>
            
            <h3 style="color: #8b5cf6; margin-top: 20px;">Customer Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            
            <h3 style="color: #8b5cf6; margin-top: 20px;">Message</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
              ${message}
            </div>
          </div>
          
          <p style="text-align: center; color: #666; margin-top: 20px; font-size: 12px;">
            Sent from TripPlanner AI • ${new Date().toLocaleString()}
          </p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Inquiry sent successfully!',
            id: data.id,
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}