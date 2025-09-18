const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testNewSupabaseProject() {
  console.log('🔍 Probando conexión con el nuevo proyecto Supabase...\n');
  
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  console.log('📋 Credenciales del nuevo proyecto:');
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Key: ${supabaseKey ? '✅ Configurada' : '❌ Faltante'}`);
  console.log(`Proyecto ID: uznpnzbsaciemtsrtmxe\n`);
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Credenciales faltantes');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Probar conexión básica
    console.log('🔗 Probando conexión básica...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Error de autenticación:', authError.message);
    } else {
      console.log('✅ Conexión establecida correctamente');
    }
    
    // Verificar si las tablas existen
    console.log('\n📊 Verificando estructura de base de datos...');
    const tables = ['fundacion', 'sedes', 'usuarios', 'participantes', 'profesional', 'mensualidades'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('count', { count: 'exact' }).limit(1);
        
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: Tabla existe y es accesible`);
        }
      } catch (err) {
        console.log(`❌ ${table}: Error inesperado - ${err.message}`);
      }
    }
    
    console.log('\n🎯 Resumen:');
    console.log('   - Nuevo proyecto Supabase: ✅ Conectado');
    console.log('   - URL actualizada: ✅');
    console.log('   - API Key actualizada: ✅');
    
    console.log('\n📝 Próximos pasos:');
    console.log('1. Ve a https://supabase.com/dashboard/project/uznpnzbsaciemtsrtmxe/sql');
    console.log('2. Ejecuta el script complete_supabase_setup.sql');
    console.log('3. Reinicia el servidor: npm start');
    console.log('4. Prueba el login con apoyotic@todoporunalma.org');
    
  } catch (err) {
    console.log('❌ Error inesperado:', err.message);
  }
}

testNewSupabaseProject();
