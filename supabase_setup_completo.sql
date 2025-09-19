-- =====================================================
-- CONFIGURACIÓN COMPLETA DE SUPABASE PARA TODO POR UN ALMA
-- Ejecutar paso a paso en el SQL Editor de Supabase
-- =====================================================

-- PASO 1: Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- PASO 2: CREAR TABLAS PRINCIPALES
-- =====================================================

-- Tabla fundacion
CREATE TABLE IF NOT EXISTS fundacion (
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

-- Tabla sedes
CREATE TABLE IF NOT EXISTS sedes (
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

-- Tabla usuarios (para roles y permisos)
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  rol INTEGER DEFAULT 1, -- 1 = CONSULTA, 2 = ADMINISTRADOR
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla participantes
CREATE TABLE IF NOT EXISTS participantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento VARCHAR(20) UNIQUE NOT NULL,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT,
  estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
  sede_id UUID REFERENCES sedes(id),
  fecha_ingreso DATE DEFAULT CURRENT_DATE,
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla mensualidades
CREATE TABLE IF NOT EXISTS mensualidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participante_id UUID REFERENCES participantes(id) ON DELETE CASCADE,
  mes INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
  anio INTEGER NOT NULL,
  monto DECIMAL(10,2) NOT NULL DEFAULT 0,
  fecha_vencimiento DATE,
  fecha_pago DATE,
  estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'PAGADA', 'VENCIDA')),
  metodo_pago VARCHAR(50),
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(participante_id, mes, anio)
);

-- =====================================================
-- PASO 3: CONFIGURAR ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE fundacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE sedes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE participantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensualidades ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PASO 4: CREAR POLÍTICAS DE SEGURIDAD
-- =====================================================

-- Políticas para fundacion (lectura pública, escritura solo admin)
CREATE POLICY "Fundacion lectura publica" ON fundacion FOR SELECT USING (true);
CREATE POLICY "Fundacion escritura admin" ON fundacion FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);

-- Políticas para sedes (lectura pública, escritura solo admin)
CREATE POLICY "Sedes lectura publica" ON sedes FOR SELECT USING (true);
CREATE POLICY "Sedes escritura admin" ON sedes FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);

-- Políticas para usuarios (cada usuario ve su info, admin ve todo)
CREATE POLICY "Usuarios ven su propia info" ON usuarios FOR SELECT USING (
  auth.email() = email OR 
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);
CREATE POLICY "Solo admin gestiona usuarios" ON usuarios FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);
CREATE POLICY "Solo admin actualiza usuarios" ON usuarios FOR UPDATE USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);
CREATE POLICY "Solo admin elimina usuarios" ON usuarios FOR DELETE USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);

-- Políticas para participantes (usuarios autenticados pueden ver, admin puede todo)
CREATE POLICY "Participantes lectura autenticados" ON participantes FOR SELECT USING (
  auth.role() = 'authenticated'
);
CREATE POLICY "Participantes escritura admin" ON participantes FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);

-- Políticas para mensualidades (usuarios autenticados pueden ver, admin puede todo)
CREATE POLICY "Mensualidades lectura autenticados" ON mensualidades FOR SELECT USING (
  auth.role() = 'authenticated'
);
CREATE POLICY "Mensualidades escritura admin" ON mensualidades FOR ALL USING (
  EXISTS (SELECT 1 FROM usuarios WHERE email = auth.email() AND rol = 2)
);

-- =====================================================
-- PASO 5: CREAR FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener nombre del rol
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

-- Función para crear usuario automáticamente cuando se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (email, nombre, rol, activo)
  VALUES (NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 2, true)
  ON CONFLICT (email) DO UPDATE SET 
    rol = 2, 
    activo = true,
    nombre = COALESCE(NEW.raw_user_meta_data->>'full_name', usuarios.nombre, NEW.email),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear usuario automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- PASO 6: INSERTAR DATOS INICIALES
-- =====================================================

-- Insertar datos de la fundación
INSERT INTO fundacion (nombre, nit, direccion, telefono, email, website, mision, vision) 
VALUES (
  'Corporación Todo por un Alma',
  '900123456-7',
  'Bello, Antioquia, Colombia',
  '+57-314-570-2708',
  'contacto@todoporunalma.org',
  'https://todoporunalma.org',
  'Brindar atención integral a personas con problemas de adicción, combinando terapia psicológica profesional con guía espiritual basada en la Palabra de Dios.',
  'Ser reconocidos como el centro de rehabilitación líder en Colombia, transformando vidas y familias a través de un enfoque integral y humanizado.'
) ON CONFLICT (nit) DO UPDATE SET 
  nombre = EXCLUDED.nombre,
  direccion = EXCLUDED.direccion,
  telefono = EXCLUDED.telefono,
  email = EXCLUDED.email,
  website = EXCLUDED.website,
  mision = EXCLUDED.mision,
  vision = EXCLUDED.vision,
  updated_at = NOW();

-- Insertar sedes iniciales
INSERT INTO sedes (nombre, direccion, telefono, ciudad, capacidad_maxima, tipo_sede, director_nombre, director_telefono) 
VALUES 
  ('Sede Bello - Masculina', 'Vereda Potreritos, Finca el Alto, Bello', '+57-314-570-2708', 'Bello', 30, 'MASCULINA', 'Juan Camilo Machado Bernal', '+57-314-570-2708'),
  ('Sede Bello - Femenina', 'Vereda Potreritos, Finca el Alto, Bello', '+57-321-648-1687', 'Bello', 20, 'FEMENINA', 'Mildrey Leonel Melo', '+57-321-648-1687'),
  ('Sede Apartadó - Masculina', 'Calle 102BB #76-34, Barrio 20 de Enero, Apartadó', '+57-310-457-7835', 'Apartadó', 25, 'MASCULINA', 'Martín Muñoz Pino', '+57-310-457-7835'),
  ('Sede Apartadó - Femenina', 'Calle 102BB #76-36, Barrio 20 de Enero, Apartadó', '+57-310-457-7835', 'Apartadó', 15, 'FEMENINA', 'Luz Yasmin Estrada Fabra', '+57-310-457-7835')
ON CONFLICT DO NOTHING;

-- =====================================================
-- PASO 7: CREAR USUARIO ADMINISTRADOR
-- =====================================================

-- IMPORTANTE: Cambia 'admin@todoporunalma.org' por tu email real
INSERT INTO usuarios (email, nombre, rol, activo) 
VALUES ('admin@todoporunalma.org', 'Administrador Principal', 2, true)
ON CONFLICT (email) DO UPDATE SET 
  rol = 2, 
  activo = true,
  nombre = 'Administrador Principal',
  updated_at = NOW();

-- =====================================================
-- PASO 8: CREAR VISTAS ÚTILES PARA EL DASHBOARD
-- =====================================================

-- Vista de estadísticas del dashboard
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM participantes WHERE estado = 'ACTIVO') as participantes_activos,
  (SELECT COUNT(*) FROM participantes WHERE estado = 'INACTIVO') as participantes_inactivos,
  (SELECT COUNT(*) FROM participantes) as total_participantes,
  (SELECT COUNT(*) FROM mensualidades WHERE estado = 'PAGADA') as mensualidades_pagadas,
  (SELECT COUNT(*) FROM mensualidades WHERE estado = 'PENDIENTE') as mensualidades_pendientes,
  (SELECT COUNT(*) FROM mensualidades WHERE estado = 'VENCIDA') as mensualidades_vencidas,
  (SELECT COUNT(*) FROM sedes WHERE estado = 'ACTIVA') as sedes_activas,
  (SELECT COALESCE(SUM(monto), 0) FROM mensualidades WHERE estado = 'PAGADA') as ingresos_totales;

-- Vista de participantes con información de sede
CREATE OR REPLACE VIEW participantes_completo AS
SELECT 
  p.*,
  s.nombre as sede_nombre,
  s.ciudad as sede_ciudad,
  s.tipo_sede
FROM participantes p
LEFT JOIN sedes s ON p.sede_id = s.id;

-- Vista de mensualidades con información del participante
CREATE OR REPLACE VIEW mensualidades_completo AS
SELECT 
  m.*,
  p.nombres || ' ' || p.apellidos as participante_nombre,
  p.documento as participante_documento,
  s.nombre as sede_nombre
FROM mensualidades m
JOIN participantes p ON m.participante_id = p.id
LEFT JOIN sedes s ON p.sede_id = s.id;

-- =====================================================
-- PASO 9: VERIFICACIÓN FINAL
-- =====================================================

-- Verificar que todo se creó correctamente
SELECT 
  'Tablas creadas' as tipo,
  COUNT(*) as cantidad
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('fundacion', 'sedes', 'usuarios', 'participantes', 'mensualidades')

UNION ALL

SELECT 
  'Políticas RLS' as tipo,
  COUNT(*) as cantidad
FROM pg_policies 
WHERE schemaname = 'public'

UNION ALL

SELECT 
  'Usuarios administradores' as tipo,
  COUNT(*) as cantidad
FROM usuarios 
WHERE rol = 2

UNION ALL

SELECT 
  'Sedes configuradas' as tipo,
  COUNT(*) as cantidad
FROM sedes

UNION ALL

SELECT 
  'Fundación configurada' as tipo,
  COUNT(*) as cantidad
FROM fundacion;

-- Mostrar información del usuario administrador
SELECT 
  'Usuario Administrador:' as info,
  email,
  nombre,
  CASE rol WHEN 2 THEN 'ADMINISTRADOR' ELSE 'OTRO' END as rol_nombre,
  activo,
  created_at
FROM usuarios 
WHERE rol = 2;

/*
=====================================================
CONFIGURACIÓN COMPLETADA ✅
=====================================================

PRÓXIMOS PASOS:

1. CREAR USUARIO DE AUTENTICACIÓN:
   - Ve a Authentication → Users en Supabase
   - Crea un usuario con email: admin@todoporunalma.org
   - Asigna una contraseña segura

2. CONFIGURAR AUTH SETTINGS:
   - Ve a Settings → Auth → URL Configuration
   - Site URL: http://localhost:3004
   - Redirect URLs: http://localhost:3004/*

3. PROBAR LA APLICACIÓN:
   - Haz login con admin@todoporunalma.org
   - Verifica acceso a todas las páginas del dashboard
   - Prueba la funcionalidad de Formatos (debería funcionar como admin)

4. OPCIONAL - DATOS DE PRUEBA:
   - Agrega algunos participantes de ejemplo
   - Crea mensualidades de prueba
   - Verifica que el dashboard muestre estadísticas

¡La base de datos está lista para usar! 🚀

NOTA: Todos los usuarios creados en Authentication tendrán 
automáticamente rol de ADMINISTRADOR.
*/
