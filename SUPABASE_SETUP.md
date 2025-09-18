# Configuración de Supabase

Este proyecto utiliza Supabase. Sigue estos pasos para configurarlo correctamente.

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

2. Edita el archivo `.env` con tus credenciales de Supabase (agrega estas líneas al final del archivo):
```env
REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

**Nota**: Si tu proyecto ya tiene SUPABASE_KEY, puedes usar REACT_APP_SUPABASE_ANON_KEY = ${SUPABASE_KEY} para compatibilidad.

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

### 1. Ejecutar Script SQL en Supabase

1. Ve a tu proyecto Supabase > SQL Editor
2. Copia y pega el contenido completo del archivo `scripts/setup_supabase.sql`
3. Haz clic en "Run" para ejecutar el script
4. Verifica que no haya errores y que las tablas se hayan creado correctamente en Table Editor

### 2. Configurar Google OAuth (Opcional)

1. Ve a Authentication > Providers en tu dashboard de Supabase
2. Habilita Google
3. Ingresa tu Client ID y Secret de Google Cloud Console
4. Agrega `http://localhost:3000/auth/callback` a Site URL y Redirect URLs

### 3. Verificar Variables de Entorno

Asegúrate de que tu `.env` incluya:
```env
REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

### Tablas Creadas por el Script

El script `setup_supabase.sql` crea las siguientes tablas con RLS habilitado:

- **fundacion**: Información de la corporación
- **sedes**: Sedes de la fundación
- **usuarios**: Perfiles de usuarios con roles
- **participantes**: Información de participantes
- **profesional**: Profesionales de la salud
- **mensualidades**: Pagos mensuales

### Políticas RLS Implementadas

- Administradores: Acceso completo a todas las tablas
- Usuarios: Acceso limitado a su sede y datos propios
- Profesionales: Acceso a su sede asignada

### Datos de Prueba

El script incluye datos de prueba para:
- 1 fundación
- 2 sedes (Bello y Apartadó)
- 1 usuario admin
- 2 participantes
- 2 profesionales
- 2 mensualidades (1 pagada, 1 pendiente)

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
