import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Temporarily disabled authentication for preview
    // const { userId } = auth();
    const userId = 'preview-user-id';
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      throw new Error(paystackData.message || 'Payment verification failed');
    }

    const { status, amount, metadata } = paystackData.data;

    if (status === 'success') {
      // Payment successful - unlock the pack for the user
      console.log('Payment successful:', {
        userId,
        amount,
        packType: metadata.packType,
        reference,
      });

      try {
        // Store user pack in Supabase
        const { data, error } = await supabase
          .from('user_packs')
          .insert([
            {
              user_id: userId,
              pack_type: metadata.packType,
              amount_paid: amount / 100, // Convert back from kobo
              reference,
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
          .select();

        if (error) {
          console.error('Supabase insert error:', error);
          // Still return success for payment, but log the database error
        }

        console.log('User pack stored successfully:', data);

      } catch (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the payment verification if database fails
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        packType: metadata.packType,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment not successful',
        status,
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
