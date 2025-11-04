// Database Connection Test Script
// Run this after setting up your .env file with Supabase credentials

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...\n');

  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials!');
    console.log('Please create a .env file with:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key\n');
    return;
  }

  console.log('✅ Environment variables found');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey.substring(0, 20) + '...\n');

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Simple connection test
    console.log('🧪 Test 1: Basic Connection...');
    const { data, error } = await supabase
      .from('premium_experience')
      .select('count')
      .limit(1);

    if (error) {
      console.log('❌ Connection failed:', error.message);
      return;
    }

    console.log('✅ Database connection successful!\n');

    // Test 2: Insert a test record
    console.log('🧪 Test 2: Insert Test Record...');
    const testData = {
      email: 'test@example.com',
      feedback: 'Database connection test',
      tier: 'test',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('premium_experience')
      .insert([testData])
      .select();

    if (insertError) {
      console.log('❌ Insert test failed:', insertError.message);
      return;
    }

    console.log('✅ Insert test successful!');
    console.log('Inserted record ID:', insertData[0].id);

    // Test 3: Clean up test record
    console.log('\n🧪 Test 3: Cleanup...');
    const { error: deleteError } = await supabase
      .from('premium_experience')
      .delete()
      .eq('id', insertData[0].id);

    if (deleteError) {
      console.log('⚠️  Cleanup failed:', deleteError.message);
    } else {
      console.log('✅ Cleanup successful!');
    }

    console.log('\n🎉 All database tests passed! Your Supabase connection is working perfectly.');

  } catch (error) {
    console.log('❌ Database test failed:', error.message);
  }
}

// Run the test
testDatabaseConnection();

