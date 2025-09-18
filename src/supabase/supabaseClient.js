import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase usando variables de entorno
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found in environment variables');
  console.warn('Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your .env file');
  
  // En desarrollo, mostrar ayuda adicional
  if (process.env.NODE_ENV === 'development') {
    console.warn('💡 Create a .env file in the root directory with:');
    console.warn('REACT_APP_SUPABASE_URL=your_supabase_url');
    console.warn('REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key');
  }
}

// Validar URLs de Supabase
const isValidSupabaseUrl = (url) => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('supabase.co') || urlObj.hostname.includes('localhost');
  } catch {
    return false;
  }
};

// Crear cliente de Supabase con validación
const createSupabaseClient = () => {
  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseAnonKey || 'placeholder-key';
  
  if (!isValidSupabaseUrl(supabaseUrl) && process.env.NODE_ENV === 'production') {
    throw new Error('Invalid Supabase URL in production environment');
  }
  
  return createClient(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'X-Client-Info': 'todo-por-un-alma-web'
      }
    }
  });
};

export const supabase = createSupabaseClient();

// Helpers de autenticación para compatibilidad
export const authHelpers = {
  // Iniciar sesión con email y contraseña
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },

  // Cerrar sesión
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  // Escuchar cambios de autenticación
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },


  // Restablecer contraseña
  resetPassword: async (email, options = {}) => {
    return await supabase.auth.resetPasswordForEmail(email, options);
  }
};

// Verificar conexión con Supabase
export const testConnection = async () => {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection error:', error.message);
      return { success: false, error: error.message };
    }
    
    // Test básico de conectividad a la base de datos
    const { error: dbError } = await supabase.from('usuarios').select('count', { count: 'exact', head: true });
    if (dbError) {
      console.warn('Database connection warning:', dbError.message);
      return { success: true, warning: 'Auth OK, but database may not be configured' };
    }
    
    console.log('✅ Supabase connection successful');
    return { success: true };
  } catch (error) {
    console.error('Supabase connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Verificar estado de la configuración
export const getConfigStatus = () => {
  return {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    isValidUrl: isValidSupabaseUrl(supabaseUrl),
    environment: process.env.NODE_ENV,
    isConfigured: !!(supabaseUrl && supabaseAnonKey && isValidSupabaseUrl(supabaseUrl))
  };
};

export default supabase;

export const TABLES = {
  FUNDACION: 'fundacion',
  SEDES: 'sedes',
  USUARIOS: 'usuarios',
  PARTICIPANTES: 'participantes',
  MENSUALIDADES: 'mensualidades'
};
