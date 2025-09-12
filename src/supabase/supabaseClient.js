import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database tables
export const TABLES = {
  FUNDACION: 'fundacion',
  SEDE: 'sede',
  USUARIO: 'usuario',
  PROFESIONAL: 'profesional',
  PARTICIPANTE: 'participante',
  ACUDIENTE: 'acudiente',
  MENSUALIDAD: 'mensualidad',
  FORMULARIO_REGISTRO: 'formulario_registro',
  FORMULARIO_ENFERMERIA: 'formulario_enfermeria',
  FORMULARIO_MEDICO: 'formulario_medico',
  FORMULARIO_PSICOLOGIA: 'formulario_psicologia',
  FORMULARIO_ESPIRITUAL: 'formulario_espiritual',
  FORMULARIO_TERAPEUTICO: 'formulario_terapeutico',
  FORMULARIO_TRABAJO_SOCIAL: 'formulario_trabajo_social',
  FORMULARIO_SEGUIMIENTO: 'formulario_seguimiento'
};

// User roles
export const ROLES = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  PROFESIONAL: 'PROFESIONAL',
  CONSULTA: 'CONSULTA'
};

// Form types
export const FORM_TYPES = {
  REGISTRO: 'REGISTRO',
  ENFERMERIA: 'ENFERMERIA',
  MEDICO: 'MEDICO',
  PSICOLOGIA: 'PSICOLOGIA',
  ESPIRITUAL: 'ESPIRITUAL',
  TERAPEUTICO: 'TERAPEUTICO',
  TRABAJO_SOCIAL: 'TRABAJO_SOCIAL',
  SEGUIMIENTO: 'SEGUIMIENTO'
};

export default supabase;
