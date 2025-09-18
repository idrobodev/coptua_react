const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Verify database setup after running the SQL script
async function verifyDatabaseSetup() {
  console.log('🔍 Verifying Supabase database setup...\n');
  
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const tables = ['fundacion', 'sedes', 'usuarios', 'participantes', 'mensualidades'];
  const results = {};
  
  console.log('📋 Checking database tables...\n');
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*', { count: 'exact' }).limit(1);
      
      if (error) {
        results[table] = { status: '❌', error: error.message };
      } else {
        results[table] = { status: '✅', count: data?.length || 0 };
      }
    } catch (err) {
      results[table] = { status: '❌', error: err.message };
    }
  }
  
  // Display results
  console.log('Table Status:');
  console.log('─'.repeat(50));
  for (const [table, result] of Object.entries(results)) {
    if (result.status === '✅') {
      console.log(`${result.status} ${table.padEnd(15)} - Ready (${result.count} records accessible)`);
    } else {
      console.log(`${result.status} ${table.padEnd(15)} - Error: ${result.error}`);
    }
  }
  
  // Check authentication
  console.log('\n🔐 Testing authentication...');
  try {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else {
      console.log('✅ Authentication service working');
    }
  } catch (err) {
    console.log('❌ Auth test failed:', err.message);
  }
  
  // Summary
  const successCount = Object.values(results).filter(r => r.status === '✅').length;
  const totalTables = tables.length;
  
  console.log('\n📊 Summary:');
  console.log(`   Tables ready: ${successCount}/${totalTables}`);
  
  if (successCount === totalTables) {
    console.log('🎉 Database setup is complete and working!');
    console.log('\n🚀 Next steps:');
    console.log('   1. Start your React app: npm start');
    console.log('   2. Test the authentication flow');
    console.log('   3. Verify dashboard functionality');
  } else {
    console.log('⚠️  Database setup incomplete');
    console.log('\n📝 To fix:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Run the complete scripts/setup_supabase.sql');
    console.log('   3. Run this verification script again');
  }
}

verifyDatabaseSetup();
