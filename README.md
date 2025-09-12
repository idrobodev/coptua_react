# Fundación Todo por un Alma - Dashboard Administrativo

Sistema de gestión integral para la Fundación Todo por un Alma, desarrollado con React y Supabase para administrar participantes, profesionales, mensualidades, formularios especializados y generar reportes estadísticos.

## 📋 Descripción

Dashboard administrativo moderno y responsive diseñado específicamente para la gestión de fundaciones de atención integral. Incluye módulos completos para el manejo de participantes, profesionales de la salud, acudientes, sistema de pagos mensuales, formularios especializados por área médica y sistema de reportes con visualizaciones interactivas.

## ✨ Características Principales

### 🏥 Gestión Integral
- **Participantes**: Registro, perfiles, seguimiento y administración completa
- **Profesionales**: Gestión por sede y especialidad (Medicina, Psicología, Enfermería, etc.)
- **Acudientes**: Administración de responsables y contactos de emergencia
- **Mensualidades**: Sistema de facturación y seguimiento de pagos
- **Formularios**: 8 especialidades médicas con formularios específicos

### 📊 Dashboard y Reportes
- Dashboard principal con métricas en tiempo real
- Gráficos interactivos con Chart.js
- Reportes financieros y estadísticos
- Análisis de tendencias mensuales
- Exportación a PDF y Excel

### 🔐 Seguridad y Roles
- Autenticación con Supabase
- Sistema de roles: ADMINISTRADOR, PROFESIONAL, CONSULTA
- Rutas protegidas por permisos
- Gestión de usuarios y permisos

### 🎨 Interfaz Moderna
- Diseño responsive para todos los dispositivos
- Sidebar dinámico con toggle (colapsar/expandir)
- Tema coherente con identidad cristiana de la fundación
- Animaciones suaves y transiciones
- Tipografías Poppins y Montserrat

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 17+** - Biblioteca principal
- **React Router Dom** - Navegación y rutas
- **Tailwind CSS** - Framework de estilos
- **Chart.js + React-Chartjs-2** - Gráficos y visualizaciones
- **React Hook Form + Yup** - Formularios y validación
- **Font Awesome** - Iconografía

### Backend y Base de Datos
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos relacional
- **Supabase Auth** - Autenticación y autorización
- **Supabase Realtime** - Actualizaciones en tiempo real

### Herramientas de Desarrollo
- **CRACO** - Configuración de Create React App
- **Date-fns** - Manejo de fechas
- **UUID** - Generación de identificadores únicos

## 📦 Instalación

### Prerrequisitos
- Node.js 14+ 
- npm o yarn
- Cuenta de Supabase (opcional para desarrollo)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone git@github.com:idrobodev/coptua_react.git
cd coptua_react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env

# Editar .env con tus credenciales de Supabase
REACT_APP_SUPABASE_URL=tu_supabase_url
REACT_APP_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. **Iniciar servidor de desarrollo**
```bash
npm start
```

El proyecto estará disponible en `http://localhost:3001`

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Auth/            # Componentes de autenticación
│   ├── Charts/          # Gráficos y visualizaciones
│   ├── Context/         # Contextos de React
│   ├── Dashboard/       # Componentes del dashboard
│   ├── Footer/          # Pie de página
│   ├── Header/          # Encabezado
│   ├── Menu/            # Navegación principal
│   └── UI/              # Componentes de interfaz
├── images/              # Recursos gráficos
├── pages/               # Páginas principales
│   ├── Dashboard/       # Dashboard principal
│   ├── Forms/           # Gestión de formularios
│   ├── Guardians/       # Gestión de acudientes
│   ├── Participants/    # Gestión de participantes
│   ├── Payments/        # Sistema de pagos
│   ├── Professionals/   # Gestión de profesionales
│   └── Reports/         # Reportes y estadísticas
├── services/            # Servicios y API
└── supabase/           # Configuración de Supabase
```

## 🎯 Uso del Sistema

### Acceso al Dashboard
1. Iniciar sesión con credenciales válidas
2. Navegar por el sidebar dinámico
3. Acceder a módulos según permisos de usuario

### Gestión de Participantes
- Registro de nuevos participantes
- Edición de perfiles existentes
- Seguimiento de estado y progreso
- Asignación de profesionales

### Sistema de Pagos
- Registro de mensualidades
- Seguimiento de estados (Pagada, Pendiente, Vencida)
- Generación de reportes financieros
- Notificaciones de vencimientos

### Formularios Especializados
- Formulario Médico
- Evaluación Psicológica
- Formulario Espiritual
- Evaluación de Enfermería
- Formulario Terapéutico
- Trabajo Social
- Fonoaudiología
- Nutrición

## 📱 Funcionalidades del Sidebar

### Responsive Design
- **Desktop**: Sidebar colapsable con botón toggle
- **Mobile**: Sidebar overlay con botón hamburguesa
- **Tablet**: Adaptación automática según tamaño de pantalla

### Navegación Intuitiva
- Menú jerárquico con submenús
- Iconografía consistente
- Estados activos y hover
- Tooltips en modo colapsado

## 🔧 Configuración Avanzada

### Personalización de Temas
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#676CB8',
        'primary-dark': '#5A5F9D'
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif']
      }
    }
  }
}
```

### Configuración de Supabase
```javascript
// supabase/supabaseClient.js
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)
```

## 📊 Base de Datos

### Tablas Principales
- `fundacion` - Información de la fundación
- `sedes` - Sedes de atención
- `usuarios` - Usuarios del sistema
- `participantes` - Participantes registrados
- `profesionales` - Equipo profesional
- `acudientes` - Responsables de participantes
- `mensualidades` - Pagos mensuales
- `formularios` - Formularios especializados

## 🚀 Despliegue

### Desarrollo
```bash
npm start
```

### Producción
```bash
npm run build
npm run serve
```

### Variables de Entorno Requeridas
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Desarrollo Frontend**: React + Tailwind CSS
- **Backend**: Supabase + PostgreSQL
- **Diseño UX/UI**: Interfaz moderna y accesible
- **Integración**: APIs y servicios en tiempo real

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@fundaciontodoporunalma.org
- Documentación: [Wiki del proyecto]
- Issues: [GitHub Issues]

## 🔄 Changelog

### v1.0.0 (2024-01-12)
- ✅ Sistema completo de dashboard
- ✅ Gestión integral de participantes
- ✅ Sistema de pagos y facturación
- ✅ Formularios especializados
- ✅ Reportes y estadísticas
- ✅ Sidebar responsive con toggle
- ✅ Autenticación y roles
- ✅ Integración con Supabase

---

**Fundación Todo por un Alma** - Sistema de Gestión Administrativa
*Desarrollado con ❤️ para servir a la comunidad*
