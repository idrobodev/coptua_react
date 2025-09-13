// Mock Supabase Auth para desarrollo sin configuración real
const authStateListeners = new Set();
let currentUser = null;

const notifyAuthState = () => {
  authStateListeners.forEach((listener) => {
    try { listener('SIGNED_IN', { user: currentUser }); } catch (_) {}
  });
};

// Mock Supabase client
export const supabase = {
  auth: {
    get user() {
      return currentUser;
    },
    onAuthStateChange: (callback) => {
      authStateListeners.add(callback);
      // Notificar inmediatamente
      callback('INITIAL_SESSION', { user: currentUser });
      return {
        data: {
          subscription: { unsubscribe: () => authStateListeners.delete(callback) }
        }
      };
    },
    signInWithPassword: async ({ email, password }) => {
      // Caso de prueba específico para apoyotic@todoporunalma.org
      if (email === 'apoyotic@todoporunalma.org' && password === '12345') {
        currentUser = {
          id: 'mock-apoyotic-user',
          email,
          user_metadata: { 
            full_name: 'Apoyo TIC - Corporación Todo por un Alma',
            role: 'admin'
          },
          created_at: new Date().toISOString(),
        };
        notifyAuthState();
        return { 
          data: { 
            user: currentUser, 
            session: { 
              access_token: 'mock-access-token-apoyotic',
              refresh_token: 'mock-refresh-token'
            } 
          }, 
          error: null 
        };
      }
      // Otros usuarios de prueba
      if (email.includes('@todoporunalma.org') && password === '12345') {
        currentUser = {
          id: 'mock-' + Date.now(),
          email,
          user_metadata: { 
            full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
            role: 'user'
          },
          created_at: new Date().toISOString(),
        };
        notifyAuthState();
        return { 
          data: { 
            user: currentUser, 
            session: { 
              access_token: 'mock-access-token',
              refresh_token: 'mock-refresh-token'
            } 
          }, 
          error: null 
        };
      }
      return { 
        data: { user: null, session: null }, 
        error: { message: 'Credenciales inválidas. Use apoyotic@todoporunalma.org con contraseña 12345 para pruebas.' } 
      };
    },
    signUp: async ({ email, password }) => {
      currentUser = { 
        id: 'mock-new-user-' + Date.now(), 
        email, 
        user_metadata: { 
          full_name: email.split('@')[0].replace('.', ' '),
          role: 'user'
        },
        created_at: new Date().toISOString(),
      };
      notifyAuthState();
      return { data: { user: currentUser }, error: null };
    },
    signOut: async () => {
      currentUser = null;
      notifyAuthState();
      return { error: null };
    },
    resetPasswordForEmail: async (email) => {
      // Mock implementation for password reset
      return { data: {}, error: null };
    },
    signInWithOAuth: async ({ provider }) => {
      // Mock implementation for OAuth login
      currentUser = {
        id: 'mock-oauth-user',
        email: 'oauth@todoporunalma.org',
        user_metadata: { 
          full_name: 'Usuario OAuth',
          provider: provider
        }
      };
      notifyAuthState();
      return { data: { user: currentUser }, error: null };
    }
  }
};

// Funciones de autenticación simplificadas
export const auth = {
  signInWithPassword: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signUp: async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  resetPasswordForEmail: async (email) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({ provider: 'google' });
  }
};

export default supabase;
