# SEO Optimization Guide - Todo por un Alma

## Mejoras Implementadas

### 1. Meta Tags y Open Graph
- ✅ Actualizado `index.html` con meta tags completos
- ✅ Configurado Open Graph para Facebook
- ✅ Configurado Twitter Cards
- ✅ Meta tags geográficos para Colombia/Antioquia
- ✅ Canonical URLs configuradas

### 2. Structured Data (JSON-LD)
- ✅ Schema.org Organization en `index.html`
- ✅ Structured data específico por página (About, Programs, Contact)
- ✅ Información de contacto y ubicaciones
- ✅ Servicios y especialidades

### 3. Componente SEO Dinámico
- ✅ Creado `src/components/SEO/SEO.jsx`
- ✅ Implementado en páginas principales (Home, About, Programs, Contact)
- ✅ Meta tags dinámicos por página
- ✅ Structured data personalizable

### 4. Archivos de Configuración
- ✅ `robots.txt` optimizado con directivas específicas
- ✅ `sitemap.xml` creado con páginas principales
- ✅ `manifest.json` actualizado con información corporativa

### 5. Optimizaciones Técnicas
- ✅ Idioma cambiado a español (`lang="es"`)
- ✅ Preconnect para Google Fonts
- ✅ Theme color corporativo
- ✅ Meta viewport optimizado

## Configuración Requerida

### Variables de Entorno
Copia `.env.example` a `.env.local` y configura:

```bash
# Site Configuration for SEO
REACT_APP_SITE_URL=https://todoporunalma.org

# Social Media URLs
REACT_APP_FACEBOOK_URL=https://www.facebook.com/todoporunalma
REACT_APP_INSTAGRAM_URL=https://www.instagram.com/todoporunalma
REACT_APP_WHATSAPP_URL=https://wa.me/573104577835
```

## Keywords Principales Implementadas

### Página Principal (Home)
- rehabilitación, desintoxicación, adicciones
- centro de rehabilitación, terapia cognitivo conductual
- logoterapia, Bello, Apartadó, Colombia
- tratamiento adicciones, recuperación, transformación de vidas

### Sobre Nosotros (About)
- sobre nosotros, historia, equipo profesional
- valores cristianos, centro rehabilitación
- psicólogos, terapeutas, adicciones

### Programas (Programs)
- programas rehabilitación, internado, terapia familiar
- reinserción social, tratamiento adicciones
- terapia cognitivo conductual, logoterapia

### Contacto (Contact)
- contacto, teléfono, dirección, Bello, Apartadó
- centro rehabilitación, ayuda inmediata, emergencia

## Próximos Pasos Recomendados

### 1. Google Search Console
- Verificar propiedad del sitio
- Enviar sitemap.xml
- Monitorear indexación

### 2. Google Analytics
- Configurar tracking
- Establecer objetivos de conversión
- Monitorear tráfico orgánico

### 3. Google My Business
- Crear perfiles para ambas sedes (Bello y Apartadó)
- Optimizar con fotos, horarios, servicios
- Gestionar reseñas

### 4. Contenido Adicional
- Blog con artículos sobre recuperación
- Testimonios de pacientes (con permisos)
- Recursos educativos sobre adicciones

### 5. Optimizaciones Técnicas Adicionales
- Implementar lazy loading para imágenes
- Optimizar Core Web Vitals
- Configurar CDN para mejor rendimiento
- Implementar Service Worker para PWA

## Monitoreo y Métricas

### Herramientas Recomendadas
- Google Search Console
- Google Analytics 4
- Google PageSpeed Insights
- SEMrush o Ahrefs (opcional)

### KPIs a Monitorear
- Posicionamiento para keywords principales
- Tráfico orgánico mensual
- Tasa de conversión de formularios
- Tiempo de permanencia en el sitio
- Páginas por sesión

## Estructura de URLs Optimizada

```
https://todoporunalma.org/
├── /about (Sobre Nosotros)
├── /programs (Programas)
├── /contact (Contacto)
└── /dashboard/* (Área privada - no indexada)
```

## Contactos para SEO Local

### Bello, Antioquia
- Dr. Juan Camilo Machado: 3145702708
- Dra. Mildrey Leonel Melo: 3216481687

### Apartadó, Antioquia  
- Martín Muñoz Pino: 3104577835
- Dra. Luz Yasmin Estrada: 3104577835

---

**Nota**: Este documento debe actualizarse conforme se implementen nuevas optimizaciones SEO.
