import { supabase } from '../supabase/supabaseClient';

// Definición de roles del sistema
export const ROLES = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  CONSULTA: 'CONSULTA'
};

class DatabaseService {
  // Obtener usuario actual con rol
  async getCurrentUser() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError };
      }

      // Buscar información del usuario en la tabla usuarios
      const { data: userData, error: dbError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', user.email)
        .single();

      if (dbError && dbError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching user data:', dbError);
        return { data: { ...user, rol: ROLES.CONSULTA }, error: null };
      }

      return { 
        data: userData ? { ...user, ...userData } : { ...user, rol: ROLES.CONSULTA }, 
        error: null 
      };
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return { data: null, error };
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
      console.error('Error checking permissions:', error);
      return false;
    }
  }

  // Obtener datos del dashboard
  async getDashboardData() {
    try {
      const [participantesRes, mensualidadesRes] = await Promise.all([
        supabase.from('participantes').select('*', { count: 'exact' }),
        supabase.from('mensualidades').select('*', { count: 'exact' })
      ]);

      return {
        participantes: participantesRes.count || 0,
        mensualidades: mensualidadesRes.count || 0,
        error: null
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return { error };
    }
  }

  // Obtener participantes
  async getParticipantes() {
    try {
      const { data, error } = await supabase
        .from('participantes')
        .select(`
          *,
          sedes (
            nombre,
            direccion
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error in getParticipantes:', error);
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching participantes:', error);
      return { data: [], error: { message: 'Error interno del servidor' } };
    }
  }

  // Obtener mensualidades/pagos
  async getMensualidades() {
    try {
      const { data, error } = await supabase
        .from('mensualidades')
        .select(`
          *,
          participantes (
            nombre,
            apellido
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error in getMensualidades:', error);
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching mensualidades:', error);
      return { data: [], error: { message: 'Error interno del servidor' } };
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

      // Sanitizar datos
      const sanitizedData = {
        ...participanteData,
        nombre: participanteData.nombre.trim(),
        email: participanteData.email.toLowerCase().trim(),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('participantes')
        .insert([sanitizedData])
        .select()
        .single();

      if (error) {
        console.error('Database error in createParticipante:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error creating participante:', error);
      return { 
        data: null, 
        error: { message: 'Error interno del servidor' } 
      };
    }
  }

  // Actualizar participante
  async updateParticipante(id, participanteData) {
    try {
      // Validar ID
      if (!id || isNaN(id)) {
        return { 
          data: null, 
          error: { message: 'ID de participante inválido' } 
        };
      }

      // Sanitizar datos de actualización
      const sanitizedData = { ...participanteData };
      if (sanitizedData.nombre) {
        sanitizedData.nombre = sanitizedData.nombre.trim();
      }
      if (sanitizedData.email) {
        sanitizedData.email = sanitizedData.email.toLowerCase().trim();
      }
      sanitizedData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('participantes')
        .update(sanitizedData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Database error in updateParticipante:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating participante:', error);
      return { 
        data: null, 
        error: { message: 'Error interno del servidor' } 
      };
    }
  }

  // Eliminar participante
  async deleteParticipante(id) {
    try {
      const { error } = await supabase
        .from('participantes')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      console.error('Error deleting participante:', error);
      return { error };
    }
  }

  // Obtener sedes
  async getSedes() {
    try {
      const { data, error } = await supabase
        .from('sedes')
        .select('*')
        .order('nombre');

      if (error) {
        console.error('Database error in getSedes:', error);
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching sedes:', error);
      return { data: [], error: { message: 'Error interno del servidor' } };
    }
  }

  // Crear nueva mensualidad
  async createMensualidad(mensualidadData) {
    try {
      // Validar datos requeridos
      if (!mensualidadData.participante_id || !mensualidadData.valor) {
        return { 
          data: null, 
          error: { message: 'Participante y valor son campos obligatorios' } 
        };
      }

      // Sanitizar datos
      const sanitizedData = {
        ...mensualidadData,
        valor: parseFloat(mensualidadData.valor),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('mensualidades')
        .insert([sanitizedData])
        .select()
        .single();

      if (error) {
        console.error('Database error in createMensualidad:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error creating mensualidad:', error);
      return { 
        data: null, 
        error: { message: 'Error interno del servidor' } 
      };
    }
  }

  // Actualizar mensualidad
  async updateMensualidad(id, mensualidadData) {
    try {
      // Validar ID
      if (!id || isNaN(id)) {
        return { 
          data: null, 
          error: { message: 'ID de mensualidad inválido' } 
        };
      }

      // Sanitizar datos
      const sanitizedData = { ...mensualidadData };
      if (sanitizedData.valor) {
        sanitizedData.valor = parseFloat(sanitizedData.valor);
      }
      sanitizedData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('mensualidades')
        .update(sanitizedData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Database error in updateMensualidad:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating mensualidad:', error);
      return { 
        data: null, 
        error: { message: 'Error interno del servidor' } 
      };
    }
  }

  // Validar estructura de base de datos
  async validateDatabaseStructure() {
    const requiredTables = ['usuarios', 'participantes', 'mensualidades', 'sedes', 'fundacion'];
    const results = {};

    for (const table of requiredTables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        results[table] = error ? { status: 'error', message: error.message } : { status: 'ok' };
      } catch (err) {
        results[table] = { status: 'error', message: err.message };
      }
    }

    return results;
  }
}

// Exportar instancia única del servicio
export const dbService = new DatabaseService();
export default dbService;
