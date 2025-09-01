# Portfolio de Lulu - Fotógrafa Profesional

Un sitio web de portfolio moderno, responsive y accesible para una fotógrafa profesional, construido como **Single Page Application** con React, Vite y Tailwind CSS.

## 🌟 Características Principales

- **Single Page Application**: Navegación fluida con scroll suave entre secciones
- **Navbar Inteligente**: Cambia automáticamente según la sección visible
- **Instagram Reels**: Videos verticales con preview al hover (3 segundos)
- **Galería Unificada**: Filtros dinámicos - primero tipo (fotos/reels), luego categorías
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Animaciones Suaves**: Implementadas con Framer Motion
- **Lightbox Avanzado**: Para fotos con zoom y navegación
- **Formulario de Contacto**: Validaciones HTML5 nativas
- **SEO Optimizado**: Meta tags y Open Graph configurados
- **Accesibilidad**: Cumple estándares WCAG AA

## 🛠️ Stack Tecnológico

- **Framework**: React 18 con Vite
- **Estilos**: Tailwind CSS
- **Navegación**: Scroll suave nativo (sin router)
- **Animaciones**: Framer Motion
- **Carrusel**: Swiper
- **Galería**: React Photo Album
- **Lightbox**: Yet Another React Lightbox
- **Reels**: Componente personalizado estilo Instagram
- **Iconos**: Lucide React
- **SEO**: React Helmet Async

## 📁 Estructura del Proyecto

```
portfolio-fotografa/
├── public/
│   ├── demo/                    # Imágenes y reels de demostración
│   └── vite.svg
├── src/
│   ├── components/              # Componentes de la SPA
│   │   ├── Navbar.jsx           # Nav con detección de sección activa
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── Hero.jsx             # Sección hero principal
│   │   ├── About.jsx            # Sección sobre mí
│   │   ├── Gallery.jsx          # Galería unificada con filtros
│   │   ├── Contact.jsx          # Sección de contacto
│   │   ├── PhotoGallery.jsx     # Galería de fotos con lightbox
│   │   ├── InstagramReels.jsx   # Reels estilo Instagram
│   │   └── ContactForm.jsx      # Formulario de contacto
│   ├── data/
│   │   └── media.js             # Datos con fotos y reels
│   ├── App.jsx                  # SPA principal
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales + reels
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes git configurado
   git clone <url-del-repositorio>
   cd portfolio-fotografa
   ```

2. **Limpiar e instalar dependencias**
   ```bash
   # Limpiar node_modules y reinstalar (para eliminar react-router-dom)
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Configurar archivos de demostración**
   - Ve a la carpeta `public/demo/`
   - **IMPORTANTE**: Copia `lulu.webp` de `src/assets/` a `public/demo/hero-lulu.webp`
   - Lee el archivo `placeholder-info.txt` para conocer los assets necesarios
   - Agrega **22 fotos + 12 reels verticales + foto de la fotógrafa**
   - Los reels deben ser formato vertical (9:16) de 10-20 segundos

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   - Ve a `http://localhost:3000`
   - ¡Disfruta del portfolio SPA con reels estilo Instagram!

## 📦 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción

# Preview
npm run preview      # Preview de la build de producción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código
```

## 🎨 Personalización

### Colores y Tema

Los colores principales están definidos en `tailwind.config.js`:

```javascript
colors: {
  primary: '#111111',    // Negro principal
  secondary: '#555555',  // Gris secundario
  accent: '#C0895E',     // Color acento (dorado)
  light: '#F8F8F8',      // Fondo claro
}
```

### Tipografías

- **Display**: Playfair Display (títulos)
- **Sans**: Inter (texto general)

### Datos de Demostración

Edita `src/data/media.js` para:
- Cambiar las rutas de imágenes y videos
- Modificar títulos y descripciones
- Agregar o quitar categorías
- Actualizar metadatos

### URLs Externas para Reels

Tienes **dos opciones** para mostrar contenido de Instagram:

#### **Opción 1: Solo Poster + Click a Instagram (Recomendado)**
```javascript
{
  src: 'https://www.instagram.com/p/DN4Jt7ogWcc/',
  poster: '/demo/mi_poster.jpg', // Imagen que se muestra
  isExternal: true,
  platform: 'instagram'
  // Al hacer click abre Instagram
}
```

#### **Opción 2: Video Directo + Click a Instagram**
```javascript
{
  src: 'https://www.instagram.com/p/DN4Jt7ogWcc/',
  poster: '/demo/mi_poster.jpg',
  videoUrl: '/demo/video_descargado.mp4', // Video descargado localmente
  isExternal: true,
  platform: 'instagram'
  // Hover: reproduce video | Click: abre Instagram
}
```

#### **Videos Locales (Comportamiento Normal)**
```javascript
{
  src: '/demo/mi-video.mp4',
  poster: '/demo/mi_poster.jpg',
  isExternal: false
  // Hover: preview 5 segundos | Click: play/pause
}
```

#### **Otras Plataformas**
```javascript
// YouTube, Vimeo, etc.
{
  src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  isExternal: true,
  platform: 'youtube'
}
```

### Información de Contacto

Actualiza la información en:
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`
- `index.html` (meta tags)

## 📱 Características Responsive

### Breakpoints

- **Mobile**: < 640px (1 columna)
- **Tablet**: 640px - 1024px (2-3 columnas)
- **Desktop**: > 1024px (4-5 columnas)

### Navegación

- Desktop: Menú horizontal
- Mobile: Menú hamburguesa con drawer

## ♿ Accesibilidad

- **Navegación por teclado**: Todos los elementos interactivos
- **Lectores de pantalla**: Aria-labels y roles apropiados
- **Contraste**: Cumple WCAG AA
- **Foco visible**: Indicadores claros de foco
- **Textos alternativos**: En todas las imágenes

## 🔍 SEO

### Configurado

- Meta descriptions únicas por página
- Open Graph tags
- Twitter Cards
- Títulos optimizados
- Estructura semántica HTML5

### Para Mejorar

- Sitemap XML
- Schema.org markup
- Google Analytics
- Search Console

## 🎯 Funcionalidades Principales

### Single Page Application
- **Sección Hero**: Imagen de fondo, título, CTAs con scroll suave
- **Sobre Mí**: Foto de la clienta, biografía, valores, estadísticas
- **Galería Unificada**: 
  - Filtros por tipo (Fotos/Reels) 
  - Categorías dinámicas según el tipo seleccionado
  - Fotos con lightbox y zoom
  - Reels estilo Instagram con preview al hover
- **Contacto**: Formulario, información, FAQ, redes sociales

### Instagram Reels
- **Soporte URLs externas**: Instagram, YouTube, Vimeo o archivos locales
- **Embeds nativos** de Instagram con iframe
- **Preview automático** al hacer hover (videos locales)
- **Click para abrir** en nueva pestaña (URLs externas)
- **Controles estilo Instagram**: likes, comentarios, compartir
- **Badges de plataforma**: Muestra icono de Instagram, etc.
- **Sistema híbrido**: Mezcla contenido local y externo

### Navegación Inteligente
- **Navbar sticky** que cambia según la sección visible
- **Scroll suave** entre secciones
- **Detección automática** de sección activa
- **Menú móvil** responsive con animaciones

## 🐛 Solución de Problemas

### Imágenes no cargan
- Verifica que las imágenes estén en `public/demo/`
- Revisa las rutas en `src/data/media.js`
- Asegúrate de que los nombres coincidan exactamente

### Errores de build
- Ejecuta `npm install` para reinstalar dependencias
- Verifica que Node.js sea versión 16+
- Revisa que no haya errores de sintaxis con `npm run lint`

### Problemas de rendimiento
- Optimiza el tamaño de las imágenes
- Usa formatos modernos (WebP, AVIF)
- Implementa lazy loading si es necesario

## 🔄 Próximas Mejoras

- [ ] Sistema de administración de contenido
- [ ] Integración con redes sociales
- [ ] Blog/noticias section
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Optimización de imágenes automática
- [ ] Formulario de contacto con backend
- [ ] Sistema de reservas online

## 📄 Licencia

Este proyecto es de uso privado para el portfolio de Lulu - Fotógrafa Profesional.

## 🤝 Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: [tu-email@ejemplo.com]
- Documentación adicional en el código fuente

---

**Desarrollado con ❤️ para capturar momentos únicos**