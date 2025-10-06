import { NextRequest, NextResponse } from 'next/server';

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
      // Here you would typically update the user's subscription/pack status in your database
      
      console.log('Payment successful:', {
        userId,
        amount,
        packType: metadata.packType,
        reference,
      });

      // Example: Update user's pack status in Supabase
      // await supabase.from('user_packs').insert({
      //   user_id: userId,
      //   pack_type: metadata.packType,
      //   amount_paid: amount / 100, // Convert back from kobo
      //   reference,
      //   status: 'active',
      //   created_at: new Date().toISOString()
      // });

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
