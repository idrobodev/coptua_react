-- Script para crear tabla usuarios y usuario administrador
-- Ejecutar en el SQL Editor de Supabase

-- 1. Crear tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  rol INTEGER DEFAULT 1, -- 1 = CONSULTA, 2 = ADMINISTRADOR
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir acceso a usuarios autenticados
CREATE POLICY "Usuarios pueden ver su propia información" ON usuarios
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Administradores pueden gestionar usuarios" ON usuarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE email = auth.email() AND rol = 2
    )
  );

-- 4. Insertar usuario administrador (CAMBIAR EL EMAIL POR EL TUYO)
-- Reemplaza 'tu-email@ejemplo.com' por el email que usas para hacer login
INSERT INTO usuarios (email, nombre, rol, activo) 
VALUES ('admin@todoporunalma.org', 'Administrador', 2, true)
ON CONFLICT (email) DO UPDATE SET 
  rol = 2, 
  activo = true,
  updated_at = NOW();

-- 5. Verificar que se creó correctamente
SELECT * FROM usuarios WHERE rol = 2;
