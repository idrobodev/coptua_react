# Contador de Visitantes - Todo por un Alma

## Funcionalidades Implementadas

### 🎯 **Características Principales**
- ✅ Contador funcional que incrementa con cada nueva sesión
- ✅ Persistencia de datos usando localStorage
- ✅ Animaciones en tiempo real cuando se actualiza el contador
- ✅ Diseño responsivo (desktop y mobile)
- ✅ Simulación de visitantes en línea
- ✅ Crecimiento realista basado en horarios y días
- ✅ Preparado para integración con API futura

### 📁 **Archivos Creados**

#### 1. Servicio Principal
**`/src/services/visitorCounterService.js`**
- Manejo de localStorage y sessionStorage
- Detección de nuevas visitas por sesión
- Simulación de crecimiento realista
- Preparado para sincronización con API

#### 2. Hook Personalizado
**`/src/hooks/useVisitorCounter.js`**
- Estado reactivo del contador
- Animaciones automáticas
- Actualizaciones periódicas (cada 30 segundos)
- Manejo de estados de carga

#### 3. Componentes de UI
**`/src/components/VisitorCounter/VisitorCounter.jsx`**
- Versión desktop con diseño completo
- Muestra visitantes totales y usuarios en línea
- Animaciones y efectos visuales

**`/src/components/VisitorCounter/VisitorCounterMobile.jsx`**
- Versión móvil optimizada
- Diseño compacto y responsive

### 🎨 **Diseño y UX**

#### Características Visuales
- **Fondo translúcido** con efecto backdrop-blur
- **Animaciones suaves** cuando se actualiza el contador
- **Indicador en línea** con punto pulsante verde
- **Formato numérico** con separadores de miles (ej: 1.250)
- **Iconografía** consistente con el diseño del sitio

#### Responsive Design
- **Desktop**: Contador completo con estadísticas adicionales
- **Mobile**: Versión compacta optimizada para pantallas pequeñas
- **Tablet**: Se adapta automáticamente según el breakpoint

### ⚙️ **Funcionamiento Técnico**

#### Detección de Visitas
```javascript
// Solo cuenta como nueva visita si es una nueva sesión
isNewVisit() {
  return !sessionStorage.getItem(this.sessionKey);
}
```

#### Persistencia de Datos
```javascript
// Guarda en localStorage para persistencia entre sesiones
saveLocalCount(count) {
  localStorage.setItem(this.storageKey, count.toString());
}
```

#### Crecimiento Realista
- **Horarios comerciales**: Mayor actividad 8AM-6PM
- **Días laborales**: Más visitas lunes a viernes
- **Crecimiento aleatorio**: 1-5 visitantes por actualización
- **Factor de crecimiento**: Basado en hora y día actual

### 📊 **Estadísticas Mostradas**

#### Contador Principal
- **Visitantes totales**: Número acumulativo formateado
- **Usuarios en línea**: Número aleatorio entre 3-17
- **Estado**: Indicador visual "En línea" con animación

#### Estadísticas Adicionales (Desktop)
- **Año de fundación**: 2020
- **Número de sedes**: 2 (Bello y Apartadó)
- **Disponibilidad**: 24/7

### 🔧 **Configuración**

#### Variables de Entorno
```bash
# Opcional: URL de API para sincronización futura
REACT_APP_API_URL=https://api.todoporunalma.org
```

#### Personalización
```javascript
// En visitorCounterService.js
this.storageKey = 'todoporunalma_visitor_count';
this.sessionKey = 'todoporunalma_session_visited';
```

### 🚀 **Integración Futura**

#### API Backend (Preparado)
```javascript
// Método ya implementado para sincronización
async syncWithAPI(count) {
  await fetch(`${this.apiEndpoint}/visitor-count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count, timestamp: new Date().toISOString() })
  });
}
```

#### Analytics Integration
- Google Analytics events
- Tracking de páginas visitadas
- Métricas de engagement

### 📱 **Ubicación en el Sitio**

El contador se encuentra en el **footer** de todas las páginas:
- **Posición**: Esquina inferior izquierda
- **Visibilidad**: Siempre visible en todas las páginas públicas
- **Layout**: Integrado con copyright y estadísticas corporativas

### 🎯 **Beneficios SEO y Marketing**

#### Social Proof
- Muestra actividad y popularidad del sitio
- Genera confianza en visitantes nuevos
- Demuestra credibilidad de la organización

#### Engagement
- Elemento visual atractivo
- Actualización en tiempo real mantiene interés
- Estadísticas corporativas refuerzan profesionalismo

### 🔄 **Actualizaciones Automáticas**

#### Frecuencia
- **Inicial**: Al cargar la página (nueva sesión)
- **Periódica**: Cada 30 segundos (30% probabilidad)
- **Realista**: Basada en horarios y patrones de tráfico

#### Animaciones
- **Escala**: Efecto de zoom al actualizar
- **Color**: Cambio a verde durante actualización
- **Duración**: 800ms de transición suave

---

## 🎉 **Resultado Final**

El contador de visitantes está completamente funcional y integrado en el footer del sitio web. Proporciona una experiencia visual atractiva que demuestra la actividad y credibilidad de la Corporación Todo por un Alma, mientras mantiene un diseño profesional y responsivo.
