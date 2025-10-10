import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get the body
    const payload = await req.json();
    
    // Handle the webhook
    const eventType = payload.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name } = payload.data;
      
      // Here you would typically save the user to your database
      console.log('User created:', { id, email_addresses, first_name, last_name });
      
      // You can integrate with Supabase here to store user data
      // await supabase.from('users').insert({
      //   clerk_id: id,
      //   email: email_addresses[0].email_address,
      //   first_name,
      //   last_name,
      //   created_at: new Date().toISOString()
      // });
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = payload.data;
      
      console.log('User updated:', { id, email_addresses, first_name, last_name });
      
      // Update user in your database
      // await supabase.from('users').update({
      //   email: email_addresses[0].email_address,
      //   first_name,
      //   last_name,
      //   updated_at: new Date().toISOString()
      // }).eq('clerk_id', id);
    }

    if (eventType === 'user.deleted') {
      const { id } = payload.data;
      
      console.log('User deleted:', id);
      
      // Delete user from your database
      // await supabase.from('users').delete().eq('clerk_id', id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
