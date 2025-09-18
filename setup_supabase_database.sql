-- =====================================================
-- SETUP COMPLETO DE BASE DE DATOS PARA TODO POR UN ALMA
-- Corporación de Rehabilitación de Adicciones
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. TABLA FUNDACION - Información de la Organización
-- =====================================================
CREATE TABLE fundacion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  nit VARCHAR(20) UNIQUE,
  direccion TEXT,
  telefono VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(255),
  mision TEXT,
  vision TEXT,
  valores TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. TABLA SEDES - Centros de Rehabilitación
-- =====================================================
CREATE TABLE sedes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  direccion TEXT NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  ciudad VARCHAR(100) NOT NULL,
  departamento VARCHAR(100) NOT NULL DEFAULT 'Antioquia',
  capacidad_maxima INTEGER DEFAULT 30,
  tipo_sede VARCHAR(20) DEFAULT 'MIXTA' CHECK (tipo_sede IN ('MASCULINA', 'FEMENINA', 'MIXTA')),
  estado VARCHAR(20) DEFAULT 'ACTIVA' CHECK (estado IN ('ACTIVA', 'INACTIVA', 'MANTENIMIENTO')),
  director_nombre VARCHAR(255),
  director_telefono VARCHAR(20),
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. TABLA USUARIOS - Sistema de Autenticación
-- =====================================================
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  telefono VARCHAR(20),
  documento VARCHAR(20),
  rol INTEGER DEFAULT 1 CHECK (rol IN (1, 2)), -- 1=CONSULTA, 2=ADMINISTRADOR
  sede_id UUID REFERENCES sedes(id),
  activo BOOLEAN DEFAULT true,
  ultimo_acceso TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TABLA PARTICIPANTES - Beneficiarios del Programa
-- =====================================================
CREATE TABLE participantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento VARCHAR(20) UNIQUE NOT NULL,
  tipo_documento VARCHAR(10) DEFAULT 'CC' CHECK (tipo_documento IN ('CC', 'TI', 'CE', 'PP')),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE,
  genero VARCHAR(10) CHECK (genero IN ('MASCULINO', 'FEMENINO', 'OTRO')),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT,
  ciudad VARCHAR(100),
  departamento VARCHAR(100) DEFAULT 'Antioquia',
  sede_id UUID REFERENCES sedes(id),
  estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
  fecha_ingreso DATE DEFAULT CURRENT_DATE,
  fecha_egreso DATE,
  contacto_emergencia_nombre VARCHAR(255),
  contacto_emergencia_telefono VARCHAR(20),
  contacto_emergencia_parentesco VARCHAR(50),
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. TABLA MENSUALIDADES - Pagos y Aportes
-- =====================================================
CREATE TABLE mensualidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participante_id UUID REFERENCES participantes(id) ON DELETE CASCADE,
  mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
  año INTEGER NOT NULL CHECK (año >= 2020 AND año <= 2030),
  valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
  status VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (status IN ('PAGADO', 'PENDIENTE', 'VENCIDA')),
  fecha_vencimiento DATE NOT NULL,
  fecha_pago DATE,
  metodo_pago VARCHAR(50),
  referencia_pago VARCHAR(100),
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(participante_id, mes, año)
);

-- =====================================================
-- 6. TABLA ARCHIVOS - Gestión de Documentos (Storage)
-- =====================================================
CREATE TABLE archivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  ruta TEXT NOT NULL,
  tipo_mime VARCHAR(100),
  tamaño BIGINT,
  categoria VARCHAR(50) DEFAULT 'GENERAL',
  participante_id UUID REFERENCES participantes(id),
  subido_por UUID REFERENCES usuarios(id),
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN DE CONSULTAS
-- =====================================================

-- Índices para participantes
CREATE INDEX idx_participantes_documento ON participantes(documento);
CREATE INDEX idx_participantes_sede ON participantes(sede_id);
CREATE INDEX idx_participantes_estado ON participantes(estado);
CREATE INDEX idx_participantes_fecha_ingreso ON participantes(fecha_ingreso);

-- Índices para mensualidades
CREATE INDEX idx_mensualidades_participante ON mensualidades(participante_id);
CREATE INDEX idx_mensualidades_mes_año ON mensualidades(mes, año);
CREATE INDEX idx_mensualidades_status ON mensualidades(status);
CREATE INDEX idx_mensualidades_fecha_vencimiento ON mensualidades(fecha_vencimiento);

-- Índices para usuarios
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_sede ON usuarios(sede_id);
CREATE INDEX idx_usuarios_activo ON usuarios(activo);

-- =====================================================
-- TRIGGERS PARA UPDATED_AT AUTOMÁTICO
-- =====================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para todas las tablas
CREATE TRIGGER update_fundacion_updated_at BEFORE UPDATE ON fundacion FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sedes_updated_at BEFORE UPDATE ON sedes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_participantes_updated_at BEFORE UPDATE ON participantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mensualidades_updated_at BEFORE UPDATE ON mensualidades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGER PARA CREAR USUARIO AUTOMÁTICAMENTE
-- =====================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (id, email, nombre, apellido, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    COALESCE(NEW.raw_user_meta_data->>'apellido', ''),
    1 -- Rol por defecto: CONSULTA
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE fundacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE sedes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE participantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensualidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE archivos ENABLE ROW LEVEL SECURITY;

-- Políticas para FUNDACION (solo lectura para todos)
CREATE POLICY "fundacion_select" ON fundacion FOR SELECT USING (true);
CREATE POLICY "fundacion_admin_all" ON fundacion FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- Políticas para SEDES
CREATE POLICY "sedes_select" ON sedes FOR SELECT USING (true);
CREATE POLICY "sedes_admin_all" ON sedes FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- Políticas para USUARIOS
CREATE POLICY "usuarios_select" ON usuarios FOR SELECT USING (
  auth.uid() = id OR 
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);
CREATE POLICY "usuarios_update_own" ON usuarios FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "usuarios_admin_all" ON usuarios FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- Políticas para PARTICIPANTES
CREATE POLICY "participantes_select" ON participantes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND (rol = 2 OR sede_id = participantes.sede_id OR sede_id IS NULL)
  )
);
CREATE POLICY "participantes_admin_all" ON participantes FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- Políticas para MENSUALIDADES
CREATE POLICY "mensualidades_select" ON mensualidades FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM usuarios u
    JOIN participantes p ON p.id = mensualidades.participante_id
    WHERE u.id = auth.uid() 
    AND (u.rol = 2 OR u.sede_id = p.sede_id OR u.sede_id IS NULL)
  )
);
CREATE POLICY "mensualidades_admin_all" ON mensualidades FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- Políticas para ARCHIVOS
CREATE POLICY "archivos_select" ON archivos FOR SELECT USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND (rol = 2 OR id = archivos.subido_por))
);
CREATE POLICY "archivos_insert" ON archivos FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid()) AND subido_por = auth.uid()
);
CREATE POLICY "archivos_admin_all" ON archivos FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
);

-- =====================================================
-- VISTAS OPTIMIZADAS PARA CONSULTAS FRECUENTES
-- =====================================================

-- Vista del Dashboard con estadísticas
CREATE VIEW dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM participantes WHERE estado = 'ACTIVO') as total_participantes,
  (SELECT COUNT(*) FROM participantes WHERE estado = 'INACTIVO') as participantes_inactivos,
  (SELECT COUNT(*) FROM mensualidades WHERE status = 'PAGADO') as mensualidades_pagadas,
  (SELECT COUNT(*) FROM mensualidades WHERE status = 'PENDIENTE') as mensualidades_pendientes,
  (SELECT COUNT(*) FROM mensualidades WHERE status = 'VENCIDA') as mensualidades_vencidas,
  (SELECT COUNT(*) FROM sedes WHERE estado = 'ACTIVA') as sedes_activas,
  (SELECT COALESCE(SUM(valor), 0) FROM mensualidades WHERE status = 'PAGADO') as total_recaudado,
  (SELECT COALESCE(SUM(valor), 0) FROM mensualidades WHERE status IN ('PENDIENTE', 'VENCIDA')) as total_pendiente;

-- Vista de participantes con información de sede
CREATE VIEW participantes_detalle AS
SELECT 
  p.*,
  s.nombre as sede_nombre,
  s.ciudad as sede_ciudad,
  s.tipo_sede,
  EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento)) as edad,
  CASE 
    WHEN p.fecha_egreso IS NOT NULL THEN EXTRACT(DAY FROM p.fecha_egreso - p.fecha_ingreso)
    ELSE EXTRACT(DAY FROM CURRENT_DATE - p.fecha_ingreso)
  END as dias_en_programa
FROM participantes p
LEFT JOIN sedes s ON p.sede_id = s.id;

-- Vista de mensualidades con información del participante
CREATE VIEW mensualidades_detalle AS
SELECT 
  m.*,
  p.nombre || ' ' || p.apellido as participant_name,
  p.documento as participant_documento,
  s.nombre as sede_nombre,
  CASE 
    WHEN m.status = 'VENCIDA' OR (m.status = 'PENDIENTE' AND m.fecha_vencimiento < CURRENT_DATE) 
    THEN 'VENCIDA'
    ELSE m.status
  END as status_actual
FROM mensualidades m
JOIN participantes p ON m.participante_id = p.id
LEFT JOIN sedes s ON p.sede_id = s.id;

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar información de la fundación
INSERT INTO fundacion (nombre, nit, direccion, telefono, email, website, mision, vision) VALUES (
  'Corporación Todo por un Alma',
  '900123456-7',
  'Carrera 50 # 52 - 21, Bello, Antioquia',
  '+57 310 457 7835',
  'info@todoporunalma.org',
  'https://todoporunalma.org',
  'Brindar tratamiento integral para la rehabilitación de adicciones combinando enfoques psicológicos validados con guía espiritual basada en la Palabra de Dios.',
  'Ser reconocidos como el centro de rehabilitación líder en Colombia, transformando vidas a través del amor de Cristo y la excelencia profesional.'
);

-- Insertar sedes iniciales
INSERT INTO sedes (nombre, direccion, telefono, ciudad, departamento, tipo_sede, capacidad_maxima, director_nombre, director_telefono) VALUES 
('Sede Bello - Masculina', 'Vereda Potreritos, Finca el Alto, Bello', '+57 314 570 2708', 'Bello', 'Antioquia', 'MASCULINA', 30, 'Juan Camilo Machado Bernal', '+57 314 570 2708'),
('Sede Bello - Femenina', 'Vereda Potreritos, Finca el Alto, Bello', '+57 321 648 1687', 'Bello', 'Antioquia', 'FEMENINA', 20, 'Mildrey Leonel Melo', '+57 321 648 1687'),
('Sede Apartadó - Masculina', 'Calle 102BB #76-34, Barrio 20 de Enero, Apartadó', '+57 310 457 7835', 'Apartadó', 'Antioquia', 'MASCULINA', 25, 'Martín Muñoz Pino', '+57 310 457 7835'),
('Sede Apartadó - Femenina', 'Calle 102BB #76-36, Barrio 20 de Enero, Apartadó', '+57 310 457 7835', 'Apartadó', 'Antioquia', 'FEMENINA', 15, 'Luz Yasmin Estrada Fabra', '+57 310 457 7835');

-- =====================================================
-- FUNCIONES UTILITARIAS
-- =====================================================

-- Función para convertir rol numérico a texto
CREATE OR REPLACE FUNCTION get_rol_name(rol_id INTEGER)
RETURNS TEXT AS $$
BEGIN
  CASE rol_id
    WHEN 1 THEN RETURN 'CONSULTA';
    WHEN 2 THEN RETURN 'ADMINISTRADOR';
    ELSE RETURN 'DESCONOCIDO';
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Función para generar mensualidades automáticamente
CREATE OR REPLACE FUNCTION generar_mensualidades_participante(
  p_participante_id UUID,
  p_valor DECIMAL(10,2) DEFAULT 150000,
  p_meses_adelante INTEGER DEFAULT 12
)
RETURNS INTEGER AS $$
DECLARE
  mes_actual INTEGER := EXTRACT(MONTH FROM CURRENT_DATE);
  año_actual INTEGER := EXTRACT(YEAR FROM CURRENT_DATE);
  contador INTEGER := 0;
  i INTEGER;
BEGIN
  FOR i IN 0..p_meses_adelante-1 LOOP
    INSERT INTO mensualidades (
      participante_id, 
      mes, 
      año, 
      valor, 
      fecha_vencimiento
    ) VALUES (
      p_participante_id,
      CASE WHEN (mes_actual + i - 1) % 12 + 1 > 12 THEN (mes_actual + i - 1) % 12 + 1 ELSE (mes_actual + i - 1) % 12 + 1 END,
      año_actual + ((mes_actual + i - 1) / 12)::INTEGER,
      p_valor,
      DATE(año_actual + ((mes_actual + i - 1) / 12)::INTEGER || '-' || 
           LPAD(((mes_actual + i - 1) % 12 + 1)::TEXT, 2, '0') || '-05')
    ) ON CONFLICT (participante_id, mes, año) DO NOTHING;
    
    GET DIAGNOSTICS contador = ROW_COUNT;
  END LOOP;
  
  RETURN contador;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CONFIGURACIÓN DE STORAGE BUCKET
-- =====================================================

-- Crear bucket para documentos (ejecutar en Supabase Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Políticas para storage bucket
-- CREATE POLICY "documents_select" ON storage.objects FOR SELECT USING (
--   bucket_id = 'documents' AND 
--   EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid())
-- );

-- CREATE POLICY "documents_insert" ON storage.objects FOR INSERT WITH CHECK (
--   bucket_id = 'documents' AND 
--   EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
-- );

-- CREATE POLICY "documents_delete" ON storage.objects FOR DELETE USING (
--   bucket_id = 'documents' AND 
--   EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 2)
-- );

-- =====================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE fundacion IS 'Información general de la corporación';
COMMENT ON TABLE sedes IS 'Centros de rehabilitación y sus ubicaciones';
COMMENT ON TABLE usuarios IS 'Usuarios del sistema con roles y permisos - Roles: 1=CONSULTA, 2=ADMINISTRADOR';
COMMENT ON TABLE participantes IS 'Beneficiarios del programa de rehabilitación';
COMMENT ON TABLE mensualidades IS 'Pagos y aportes mensuales de participantes';
COMMENT ON TABLE archivos IS 'Metadatos de archivos almacenados en Storage';

-- Documentación del sistema de roles
COMMENT ON COLUMN usuarios.rol IS 'Rol del usuario: 1=CONSULTA (solo lectura), 2=ADMINISTRADOR (acceso completo)';

COMMENT ON VIEW dashboard_stats IS 'Estadísticas principales para el dashboard';
COMMENT ON VIEW participantes_detalle IS 'Vista completa de participantes con información de sede';
COMMENT ON VIEW mensualidades_detalle IS 'Vista de mensualidades con datos del participante';

-- =====================================================
-- FINALIZACIÓN
-- =====================================================

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE '✅ Base de datos configurada exitosamente para Todo por un Alma';
  RAISE NOTICE '📊 Tablas creadas: fundacion, sedes, usuarios, participantes, mensualidades, archivos';
  RAISE NOTICE '🔐 Row Level Security configurado con políticas por rol';
  RAISE NOTICE '📈 Vistas optimizadas creadas para consultas frecuentes';
  RAISE NOTICE '🚀 Sistema listo para producción';
END $$;
