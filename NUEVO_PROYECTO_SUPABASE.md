# 🚀 Configuración del Nuevo Proyecto Supabase

## 📋 Pasos para Crear y Configurar el Nuevo Proyecto

### 1. Crear Nuevo Proyecto en Supabase

1. **Ve a**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Haz clic** en "New Project"
3. **Configura**:
   - **Name**: `fundacion-todo-por-un-alma`
   - **Database Password**: `[genera una contraseña segura]`
   - **Region**: `South America (São Paulo)` o la más cercana
4. **Espera** a que se cree el proyecto (2-3 minutos)

### 2. Obtener Credenciales del Nuevo Proyecto

1. **Ve a**: Settings > API
2. **Copia**:
   - **Project URL**: `https://TU_NUEVO_ID.supabase.co`
   - **anon/public key**: La clave pública

### 3. Actualizar Variables de Entorno

1. **Actualiza** el archivo `.env` con las nuevas credenciales:
```env
REACT_APP_SUPABASE_URL=https://TU_NUEVO_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=TU_NUEVA_ANON_KEY
```

### 4. Ejecutar Script SQL Completo

1. **Ve a**: SQL Editor en tu nuevo proyecto
2. **Copia y pega** TODO el contenido de `complete_supabase_setup.sql`
3. **Ejecuta** el script completo
4. **Verifica** que no haya errores

### 5. Verificar Instalación

El script creará automáticamente:

#### ✅ Tablas Creadas
- `fundacion` - Información de la corporación
- `sedes` - Ubicaciones (Bello y Apartadó)
- `participantes` - Personas en tratamiento
- `profesional` - Personal médico y terapeutas
- `mensualidades` - Pagos mensuales
- `usuarios` - Perfiles de usuario con roles

#### ✅ Usuario Administrador
- **Email**: `apoyotic@todoporunalma.org`
- **Password**: `porunalma123`
- **Rol**: `ADMINISTRADOR`
- **Acceso**: Completo a todas las funciones

#### ✅ Datos Iniciales
- Información de la Corporación Todo por un Alma
- Sede Bello (capacidad 35)
- Sede Apartadó (capacidad 25)

#### ✅ Seguridad Configurada
- Row Level Security (RLS) habilitado
- Políticas de acceso por roles
- Trigger para nuevos usuarios

#### ✅ Vistas y Funciones
- Vista `dashboard_stats` para estadísticas
- Vista `participantes_completo` con información de sede
- Vista `profesionales_completo` con información de sede
- Función automática para crear perfiles de usuario

### 6. Probar la Aplicación

1. **Reinicia** el servidor de desarrollo:
```bash
npm start
```

2. **Ve a**: http://localhost:3001/login

3. **Haz login** con:
   - Email: `apoyotic@todoporunalma.org`
   - Password: `porunalma123`

4. **Verifica** que tengas acceso completo al dashboard

### 7. Configurar Google OAuth (Opcional)

Si quieres habilitar login con Google:

1. **Ve a**: Authentication > Providers
2. **Habilita** Google
3. **Configura** con tus credenciales de Google Cloud Console
4. **Agrega URLs** permitidas:
   - `http://localhost:3001`
   - `https://todoporunalma.org`

## 🔧 Verificación de Funcionamiento

### Script de Verificación
Ejecuta este comando para verificar que todo funcione:
```bash
node verify_database_setup.js
```

### Resultado Esperado
```
✅ fundacion       - Ready
✅ sedes           - Ready  
✅ usuarios        - Ready
✅ participantes   - Ready
✅ profesional     - Ready
✅ mensualidades   - Ready
🎉 Database setup is complete and working!
```

## 🎯 Funcionalidades Disponibles

### Para Administradores
- ✅ Gestión completa de participantes
- ✅ Administración de profesionales
- ✅ Control de mensualidades y pagos
- ✅ Estadísticas y reportes
- ✅ Configuración del sistema
- ✅ Gestión de usuarios y roles

### Para Profesionales
- ✅ Ver participantes de su sede
- ✅ Actualizar información de tratamientos
- ✅ Generar reportes de su sede

### Para Consulta
- ✅ Ver información general
- ✅ Consultar reportes básicos

## 🚨 Solución de Problemas

### Error: "Invalid API key"
- **Solución**: Verifica que las variables de entorno estén correctas
- **Reinicia**: El servidor después de cambiar `.env`

### Error: "Could not find table"
- **Solución**: Ejecuta el script SQL completo
- **Verifica**: Que no haya errores en la ejecución

### Error de Login
- **Solución**: Verifica que el usuario administrador se haya creado
- **Revisa**: La tabla `usuarios` en Table Editor

### Problemas de Permisos
- **Solución**: Las políticas RLS están configuradas automáticamente
- **Verifica**: Que el usuario tenga el rol correcto

## 📞 Soporte

Si encuentras problemas:
1. **Revisa** los logs en la consola del navegador
2. **Verifica** que todas las tablas existan en Table Editor
3. **Confirma** que el usuario administrador esté en la tabla `usuarios`
4. **Ejecuta** el script de verificación

---

## 🎉 ¡Listo para Usar!

Una vez completados estos pasos, tendrás:
- ✅ Proyecto Supabase completamente configurado
- ✅ Base de datos con todas las tablas y datos
- ✅ Usuario administrador funcional
- ✅ Aplicación React conectada y funcionando
- ✅ Seguridad y permisos configurados
- ✅ Listo para producción
