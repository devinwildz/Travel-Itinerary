import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

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

        const supabase = await createClient();
        const { error: databaseError } = await supabase
            .from('package_inquiries')
            .insert({
                package_name: packageName || 'Travel Package',
                name: String(name).trim(),
                email: String(email).trim(),
                phone: phone ? String(phone).trim() : null,
                message: String(message).trim(),
            });

        if (databaseError) {
            console.error('Supabase inquiry error:', databaseError);
            return NextResponse.json(
                { error: 'Failed to save inquiry' },
                { status: 500 }
            );
        }

        const safePackageName = escapeHtml(packageName || 'Travel Package');
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || 'Not provided');
        const safeMessage = escapeHtml(message);

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
            <p style="margin: 5px 0;"><strong>Package:</strong> ${safePackageName}</p>
            
            <h3 style="color: #8b5cf6; margin-top: 20px;">Customer Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${safePhone}</p>
            
            <h3 style="color: #8b5cf6; margin-top: 20px;">Message</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
              ${safeMessage}
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
