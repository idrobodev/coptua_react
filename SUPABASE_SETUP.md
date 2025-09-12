# Configuración de Supabase

Este proyecto ha sido migrado de Firebase a Supabase. Sigue estos pasos para configurar Supabase correctamente.

## 🚀 Configuración Inicial

### 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos del proyecto:
   - **Name**: fundacion-todo-por-un-alma
   - **Database Password**: (genera una contraseña segura)
   - **Region**: Selecciona la más cercana a tu ubicación

### 2. Obtener Credenciales

1. Una vez creado el proyecto, ve a **Settings > API**
2. Copia las siguientes credenciales:
   - **Project URL**: `https://tu-proyecto-id.supabase.co`
   - **anon/public key**: La clave pública para el cliente

### 3. Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus credenciales:
```env
REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

## 📁 Estructura de Archivos

```
src/
├── supabase/
│   └── supabase.config.js    # Configuración principal de Supabase
├── components/
│   └── Context/
│       └── AuthContext.jsx   # Context de autenticación actualizado
```

## 🔧 Funcionalidades Disponibles

### Autenticación
- ✅ Registro de usuarios
- ✅ Inicio de sesión con email/contraseña
- ✅ Cierre de sesión
- ✅ Restablecimiento de contraseña
- ✅ Autenticación con Google
- ✅ Estado de autenticación en tiempo real

### Base de Datos
- ✅ Cliente configurado para consultas
- ✅ Realtime subscriptions
- ✅ Row Level Security (RLS)

### Storage
- ✅ Almacenamiento de archivos
- ✅ Transformación de imágenes

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
```

## 📋 Configuración de Base de Datos

### Tablas Recomendadas

```sql
-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo vean su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 🔐 Configuración de Autenticación

### Providers Habilitados
- Email/Password ✅
- Google OAuth (configurar en Authentication > Providers)

### URLs de Redirección
- Desarrollo: `http://localhost:3000`
- Producción: `https://tu-dominio.com`

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de React con Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Autenticación con Supabase](https://supabase.com/docs/guides/auth)

## 🐛 Solución de Problemas

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto

### Error de CORS
- Configura las URLs permitidas en Supabase Dashboard > Authentication > Settings

### Problemas de Autenticación
- Verifica que la autenticación esté habilitada en tu proyecto de Supabase
- Revisa las políticas RLS si tienes problemas de permisos
