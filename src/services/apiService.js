// Servicio API para comunicación con Spring Boot Backend
import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    
    // Manejar errores de red
    if (!error.response) {
      console.error('Error de red:', error.message);
      return Promise.reject({
        message: 'Error de conexión con el servidor',
        status: 0
      });
    }
    
    return Promise.reject(error.response.data || error);
  }
);

// Definición de roles del sistema
export const ROLES = {
  CONSULTA: 'CONSULTA',
  ADMINISTRADOR: 'ADMINISTRADOR'
};

class ApiService {
  // ==================== AUTENTICACIÓN ====================
  
  // Iniciar sesión
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Guardar token y usuario en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return { data: { user, token }, error: null };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al iniciar sesión' 
        } 
      };
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await apiClient.post('/auth/logout');
      
      // Limpiar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Error en logout:', error);
      // Limpiar localStorage aunque falle la petición
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      return { success: true, error: null };
    }
  }


  // Restablecer contraseña
  async resetPassword(email) {
    try {
      const response = await apiClient.post('/auth/reset-password', { email });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error en reset password:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al restablecer contraseña' 
        } 
      };
    }
  }

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Verificar que el token siga siendo válido
        const response = await apiClient.get('/auth/me');
        return { data: response.data, error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return { data: null, error };
    }
  }

  // Actualizar perfil de usuario
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      
      // Actualizar usuario en localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al actualizar perfil' 
        } 
      };
    }
  }

  // Verificar permisos del usuario
  async hasPermission(requiredRole) {
    try {
      const { data: user } = await this.getCurrentUser();
      
      if (!user) return false;

      const userRole = user.rol || ROLES.CONSULTA;
      
      // Jerarquía de roles: ADMINISTRADOR > CONSULTA
      const roleHierarchy = {
        [ROLES.ADMINISTRADOR]: 2,
        [ROLES.CONSULTA]: 1
      };

      const userLevel = roleHierarchy[userRole] || 1;
      const requiredLevel = roleHierarchy[requiredRole] || 1;

      return userLevel >= requiredLevel;
    } catch (error) {
      console.error('Error verificando permisos:', error);
      return false;
    }
  }

  // ==================== DASHBOARD ====================
  
  // Obtener datos del dashboard
  async getDashboardData() {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return { 
        data: response.data, 
        error: null 
      };
    } catch (error) {
      console.error('Error obteniendo datos del dashboard:', error);
      return { 
        data: { participantes: 0, mensualidades: 0 }, 
        error 
      };
    }
  }

  // ==================== PARTICIPANTES ====================
  
  // Obtener participantes
  async getParticipantes() {
    try {
      const response = await apiClient.get('/participantes');
      return { data: response.data || [], error: null };
    } catch (error) {
      console.error('Error obteniendo participantes:', error);
      return { 
        data: [], 
        error: { message: 'Error al cargar participantes' } 
      };
    }
  }

  // Crear nuevo participante
  async createParticipante(participanteData) {
    try {
      // Validar datos requeridos
      if (!participanteData.nombre || !participanteData.email) {
        return { 
          data: null, 
          error: { message: 'Nombre y email son campos obligatorios' } 
        };
      }

      const response = await apiClient.post('/participantes', participanteData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error creando participante:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al crear participante' 
        } 
      };
    }
  }

  // Actualizar participante
  async updateParticipante(id, participanteData) {
    try {
      if (!id) {
        return { 
          data: null, 
          error: { message: 'ID de participante requerido' } 
        };
      }

      const response = await apiClient.put(`/participantes/${id}`, participanteData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error actualizando participante:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al actualizar participante' 
        } 
      };
    }
  }

  // Eliminar participante
  async deleteParticipante(id) {
    try {
      await apiClient.delete(`/participantes/${id}`);
      return { error: null };
    } catch (error) {
      console.error('Error eliminando participante:', error);
      return { 
        error: { 
          message: error.message || 'Error al eliminar participante' 
        } 
      };
    }
  }

  // ==================== MENSUALIDADES ====================
  
  // Obtener mensualidades
  async getMensualidades() {
    try {
      const response = await apiClient.get('/mensualidades');
      return { data: response.data || [], error: null };
    } catch (error) {
      console.error('Error obteniendo mensualidades:', error);
      return { 
        data: [], 
        error: { message: 'Error al cargar mensualidades' } 
      };
    }
  }

  // Crear nueva mensualidad
  async createMensualidad(mensualidadData) {
    try {
      if (!mensualidadData.participante_id || !mensualidadData.valor) {
        return { 
          data: null, 
          error: { message: 'Participante y valor son campos obligatorios' } 
        };
      }

      const response = await apiClient.post('/mensualidades', mensualidadData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error creando mensualidad:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al crear mensualidad' 
        } 
      };
    }
  }

  // Actualizar mensualidad
  async updateMensualidad(id, mensualidadData) {
    try {
      if (!id) {
        return { 
          data: null, 
          error: { message: 'ID de mensualidad requerido' } 
        };
      }

      const response = await apiClient.put(`/mensualidades/${id}`, mensualidadData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error actualizando mensualidad:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Error al actualizar mensualidad' 
        } 
      };
    }
  }

  // ==================== SEDES ====================
  
  // Obtener sedes
  async getSedes() {
    try {
      const response = await apiClient.get('/sedes');
      return { data: response.data || [], error: null };
    } catch (error) {
      console.error('Error obteniendo sedes:', error);
      return { 
        data: [], 
        error: { message: 'Error al cargar sedes' } 
      };
    }
  }

  // ==================== UTILIDADES ====================
  
  // Verificar conexión con la API
  async testConnection() {
    try {
      const response = await apiClient.get('/health');
      console.log('✅ Conexión con API exitosa');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Error de conexión con API:', error.message);
      return { 
        success: false, 
        error: error.message || 'Error de conexión' 
      };
    }
  }

  // Obtener configuración de la API
  getApiConfig() {
    return {
      baseURL: API_BASE_URL,
      hasToken: !!localStorage.getItem('authToken'),
      environment: process.env.NODE_ENV,
      isConfigured: !!API_BASE_URL
    };
  }
}

// Exportar instancia única del servicio
export const apiService = new ApiService();
export default apiService;

// Exportar cliente axios para uso directo si es necesario
export { apiClient };
