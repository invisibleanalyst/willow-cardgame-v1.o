import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  // Initialize Supabase client inside the handler
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
  
  try {
    const { email, feedback, tier, timestamp } = await req.json();

    // Validate required fields
    if (!email || !tier) {
      return NextResponse.json(
        { error: 'Email and tier are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.warn('Supabase client not initialized - skipping VIP request storage');
      return NextResponse.json({
        success: true,
        message: 'VIP request received (database not configured)'
      });
    }

    // Store VIP request in Supabase
    const { data, error } = await supabase
      .from('premium_experience')
      .insert([
        {
          email,
          feedback: feedback || null,
          tier,
          status: 'pending',
          created_at: timestamp || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to store VIP request' },
        { status: 500 }
      );
    }

    // Send developer notification email (if Resend/SendGrid is configured)
    try {
      await sendDeveloperNotification(email, feedback, tier);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'VIP request submitted successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('VIP request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendDeveloperNotification(email: string, feedback: string | null, tier: string) {
  // This would integrate with Resend or SendGrid
  // For now, we'll just log it and you can set up the email service later
  
  const notificationData = {
    to: process.env.DEVELOPER_EMAIL || 'admin@willow.app', // Set this in your .env
    subject: `New VIP Request from ${email}`,
    html: `
      <h2>New VIP Experience Request</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tier:</strong> ${tier}</p>
      <p><strong>Feedback:</strong> ${feedback || 'No feedback provided'}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      
      <p>Please follow up with this user within 24 hours.</p>
    `
  };

  console.log('VIP Request Notification:', notificationData);

  // TODO: Integrate with your email service (Resend/SendGrid)
  // Example with Resend:
  // const response = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(notificationData),
  // });
}
