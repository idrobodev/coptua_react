import { supabase, ROLES } from '../supabase/supabaseClient';

// Mock data for development
const mockData = {
  fundacion: [
    {
      id: 1,
      nombre: 'Fundación Todo por un Alma',
      nit: '900123456-1',
      direccion: 'Antioquia, Colombia',
      telefono: '3104577835',
      email: 'info@todoporunalma.org',
      mision: 'Transformar vidas desde el amor y la evidencia científica',
      vision: 'Ser referente en tratamiento integral de adicciones',
      created_at: new Date().toISOString()
    }
  ],
  sede: [
    {
      id: 1,
      fundacion_id: 1,
      nombre: 'Sede Bello',
      direccion: 'Bello, Antioquia',
      telefono: '3104577835',
      capacidad_maxima: 35,
      capacidad_actual: 28,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      fundacion_id: 1,
      nombre: 'Sede Apartadó',
      direccion: 'Apartadó, Antioquia',
      telefono: '3104577836',
      capacidad_maxima: 25,
      capacidad_actual: 18,
      created_at: new Date().toISOString()
    }
  ],
  usuario: [
    {
      id: 'mock-apoyotic-user',
      email: 'apoyotic@todoporunalma.org',
      nombre: 'Apoyo TIC',
      apellido: 'Fundación',
      rol: ROLES.ADMINISTRADOR,
      sede_id: null,
      activo: true,
      created_at: new Date().toISOString()
    }
  ],
  participante: [
    {
      id: 1,
      sede_id: 1,
      nombres: 'Juan Carlos',
      apellidos: 'Pérez González',
      documento: '12345678',
      tipo_documento: 'CC',
      fecha_nacimiento: '1990-05-15',
      telefono: '3001234567',
      direccion: 'Calle 123 #45-67',
      estado_civil: 'Soltero',
      nivel_educativo: 'Bachillerato',
      ocupacion: 'Estudiante',
      estado: 'ACTIVO',
      fecha_ingreso: '2024-01-15',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      sede_id: 1,
      nombres: 'María Elena',
      apellidos: 'Rodríguez López',
      documento: '87654321',
      tipo_documento: 'CC',
      fecha_nacimiento: '1985-08-22',
      telefono: '3007654321',
      direccion: 'Carrera 45 #12-34',
      estado_civil: 'Casada',
      nivel_educativo: 'Técnico',
      ocupacion: 'Comerciante',
      estado: 'ACTIVO',
      fecha_ingreso: '2024-02-01',
      created_at: new Date().toISOString()
    }
  ],
  profesional: [
    {
      id: 1,
      sede_id: 1,
      nombres: 'Dr. Carlos',
      apellidos: 'Mendoza',
      documento: '98765432',
      especialidad: 'PSICOLOGIA',
      registro_profesional: 'PSI-12345',
      telefono: '3009876543',
      email: 'carlos.mendoza@todoporunalma.org',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      sede_id: 1,
      nombres: 'Dra. Ana',
      apellidos: 'García',
      documento: '11223344',
      especialidad: 'MEDICINA',
      registro_profesional: 'MED-67890',
      telefono: '3001122334',
      email: 'ana.garcia@todoporunalma.org',
      activo: true,
      created_at: new Date().toISOString()
    }
  ],
  mensualidad: [
    {
      id: 1,
      participante_id: 1,
      mes: 1,
      año: 2024,
      valor: 150000,
      fecha_vencimiento: '2024-01-31',
      fecha_pago: '2024-01-28',
      estado: 'PAGADO',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      participante_id: 1,
      mes: 2,
      año: 2024,
      valor: 150000,
      fecha_vencimiento: '2024-02-29',
      fecha_pago: null,
      estado: 'PENDIENTE',
      created_at: new Date().toISOString()
    }
  ]
};

// Database service class
class DatabaseService {
  constructor() {
    this.useMockData = true; // Set to false when real Supabase is configured
  }

  // Generic CRUD operations
  async select(table, options = {}) {
    if (this.useMockData) {
      let data = mockData[table] || [];
      
      // Apply filters
      if (options.eq) {
        const [column, value] = options.eq;
        data = data.filter(item => item[column] === value);
      }
      
      if (options.in) {
        const [column, values] = options.in;
        data = data.filter(item => values.includes(item[column]));
      }
      
      // Apply ordering
      if (options.order) {
        const [column, direction = 'asc'] = options.order;
        data.sort((a, b) => {
          if (direction === 'desc') {
            return b[column] > a[column] ? 1 : -1;
          }
          return a[column] > b[column] ? 1 : -1;
        });
      }
      
      // Apply limit
      if (options.limit) {
        data = data.slice(0, options.limit);
      }
      
      return { data, error: null };
    }
    
    let query = supabase.from(table).select('*');
    
    if (options.eq) {
      const [column, value] = options.eq;
      query = query.eq(column, value);
    }
    
    if (options.in) {
      const [column, values] = options.in;
      query = query.in(column, values);
    }
    
    if (options.order) {
      const [column, direction] = options.order;
      query = query.order(column, { ascending: direction !== 'desc' });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    return await query;
  }

  async insert(table, data) {
    if (this.useMockData) {
      const newId = Math.max(...(mockData[table]?.map(item => item.id) || [0])) + 1;
      const newItem = {
        ...data,
        id: newId,
        created_at: new Date().toISOString()
      };
      
      if (!mockData[table]) {
        mockData[table] = [];
      }
      
      mockData[table].push(newItem);
      return { data: newItem, error: null };
    }
    
    return await supabase.from(table).insert(data).select().single();
  }

  async update(table, id, data) {
    if (this.useMockData) {
      const index = mockData[table]?.findIndex(item => item.id === id);
      if (index !== -1) {
        mockData[table][index] = {
          ...mockData[table][index],
          ...data,
          updated_at: new Date().toISOString()
        };
        return { data: mockData[table][index], error: null };
      }
      return { data: null, error: { message: 'Record not found' } };
    }
    
    return await supabase.from(table).update(data).eq('id', id).select().single();
  }

  async delete(table, id) {
    if (this.useMockData) {
      const index = mockData[table]?.findIndex(item => item.id === id);
      if (index !== -1) {
        const deleted = mockData[table].splice(index, 1)[0];
        return { data: deleted, error: null };
      }
      return { data: null, error: { message: 'Record not found' } };
    }
    
    return await supabase.from(table).delete().eq('id', id);
  }

  // Specific service methods
  async getFundacionInfo() {
    return await this.select('fundacion', { limit: 1 });
  }

  async getSedes() {
    return await this.select('sede', { order: ['nombre', 'asc'] });
  }

  async getParticipantes(sedeId = null) {
    const options = { order: ['apellidos', 'asc'] };
    if (sedeId) {
      options.eq = ['sede_id', sedeId];
    }
    return await this.select('participante', options);
  }

  async getProfesionales(sedeId = null) {
    const options = { order: ['apellidos', 'asc'] };
    if (sedeId) {
      options.eq = ['sede_id', sedeId];
    }
    return await this.select('profesional', options);
  }

  async getMensualidades(participanteId = null) {
    const options = { order: ['año', 'desc'], order2: ['mes', 'desc'] };
    if (participanteId) {
      options.eq = ['participante_id', participanteId];
    }
    return await this.select('mensualidad', options);
  }

  async getDashboardStats() {
    if (this.useMockData) {
      const participantes = mockData.participante || [];
      const mensualidades = mockData.mensualidad || [];
      const profesionales = mockData.profesional || [];
      const sedes = mockData.sede || [];
      
      return {
        data: {
          participantesActivos: participantes.filter(p => p.estado === 'ACTIVO').length,
          totalParticipantes: participantes.length,
          mensualidadesPagadas: mensualidades.filter(m => m.estado === 'PAGADO').length,
          mensualidadesPendientes: mensualidades.filter(m => m.estado === 'PENDIENTE').length,
          profesionalesActivos: profesionales.filter(p => p.activo).length,
          totalSedes: sedes.length,
          capacidadTotal: sedes.reduce((sum, sede) => sum + sede.capacidad_maxima, 0),
          ocupacionActual: sedes.reduce((sum, sede) => sum + sede.capacidad_actual, 0)
        },
        error: null
      };
    }
    
    // Real Supabase implementation would go here
    return { data: null, error: { message: 'Not implemented for real Supabase yet' } };
  }

  // Authentication helpers
  async getCurrentUser() {
    if (this.useMockData) {
      const authUser = supabase.auth.user;
      if (authUser) {
        const usuario = mockData.usuario.find(u => u.id === authUser.id);
        return { data: usuario, error: null };
      }
      return { data: null, error: null };
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return await this.select('usuario', { eq: ['id', user.id] });
    }
    return { data: null, error: null };
  }

  async hasPermission(requiredRole) {
    const { data: user } = await this.getCurrentUser();
    if (!user) return false;
    
    const roleHierarchy = {
      [ROLES.CONSULTA]: 1,
      [ROLES.PROFESIONAL]: 2,
      [ROLES.ADMINISTRADOR]: 3
    };
    
    return roleHierarchy[user.rol] >= roleHierarchy[requiredRole];
  }
}

export const dbService = new DatabaseService();
export default dbService;
