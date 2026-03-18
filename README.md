# 🚀 Rodrigo Arévalo — Portafolio CV Web

<div align="center">

![GitHub Pages](https://img.shields.io/badge/Desplegado%20en-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**[🌐 Ver en vivo](https://rodrigoarevaloabarca-svg.github.io/Rodrigo-Arevalo-Cv/)** · **[📄 Descargar CV](assets/-CV-Rodrigo%20Arevalo.pdf)** · **[💼 LinkedIn](https://www.linkedin.com/in/rodrigoarevaloabarca/)**

</div>

---

## 📋 Descripción

Portafolio personal de **Rodrigo Arévalo**, Full Stack Developer en formación especializado en **Python y Django**. El sitio muestra trayectoria profesional, proyectos desarrollados y datos de contacto, con un diseño moderno tipo *glassmorphism neon* optimizado para escritorio y dispositivos móviles.

---

## ✨ Características

- **Diseño Glassmorphism Neon** — fondo oscuro con aurora animada, cards con efecto cristal y acentos en violeta/cyan/pink
- **Modo claro / oscuro** — toggle persistente usando `localStorage`, sincronizado entre páginas
- **100% Responsive** — nav pill en desktop, menú hamburguesa con drawer lateral en mobile (breakpoint 860px)
- **Galería de proyectos** — slider automático con autoplay, drag, swipe táctil, dots y barra de progreso
- **Foto de perfil** — con anillo neon giratorio y punto de estado "disponible"
- **Botón FAB** — scroll to top flotante con aparición animada
- **Barra de progreso** — indica el porcentaje de scroll de la página
- **Contadores animados** — números que se incrementan al entrar en el viewport
- **Favicon SVG** personalizado con iniciales "RA" y gradiente neon
- **Formulario funcional** — integrado con [FormSubmit](https://formsubmit.co) para envío real de emails
- **Página de confirmación** — `agradecimiento.html` con diseño consistente tras enviar el formulario
- **Animaciones** — reveal al hacer scroll, efecto tilt 3D en cards, cursor glow suave

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Uso |
|------|-----------|-----|
| **Estructura** | HTML5 semántico | Estructura de todo el sitio |
| **Estilos** | CSS3 puro | Variables, animaciones, grid, flexbox, glassmorphism |
| **Interactividad** | JavaScript ES6+ | Slider, drawer, contadores, tema, FAB |
| **Tipografías** | Google Fonts | `Outfit` (display) + `Fira Code` (monospace) |
| **Íconos** | SVG inline | Sin dependencias externas |
| **Favicon** | SVG | Generado a mano, escalable |
| **Formulario** | FormSubmit.co | Envío de emails sin backend |
| **Despliegue** | GitHub Pages | Hosting estático gratuito |

> **Sin frameworks, sin npm, sin dependencias.** Todo el sitio corre con archivos estáticos puros.

---

## 📁 Estructura del Proyecto

```
Rodrigo-Arevalo-Cv/
│
├── index.html                      # Página principal
├── agradecimiento.html             # Confirmación de formulario
│
└── assets/
    ├── css/
    │   ├── style.css               # Estilos del portafolio principal
    │   └── agradecimiento.css      # Estilos de la página de confirmación
    │
    ├── js/
    │   ├── main.js                 # Lógica principal (slider, nav, tema, etc.)
    │   └── agradecimiento.js       # Lógica de la página de confirmación
    │
    └── img/
        ├── favicon.svg             # Favicon pestaña del navegador
        ├── foto.png                # Foto de perfil (hero)
        ├── -CV-Rodrigo Arevalo.pdf # CV descargable
        └── projects/
            ├── sge-1.png           # Screenshot SGE — dashboard
            ├── sge-2.png           # Screenshot SGE — módulo notas
            ├── inventario-1.png    # Screenshot Gestión Inventario
            ├── wallet-1.png        # Screenshot Alke Wallet
            ├── gic-1.png           # Screenshot Gestor Clientes
            └── cv-1.png            # Screenshot Portafolio Web
```

---

## 🖼️ Imágenes de la Galería

Las imágenes de proyectos deben ubicarse en `assets/img/projects/` con las siguientes especificaciones:

| Medida | Valor |
|--------|-------|
| **Resolución recomendada** | 1200 × 525 px |
| **Aspect ratio** | 16 : 7 |
| **Formato** | `.webp` (preferido) / `.png` / `.jpg` |
| **Peso máximo** | 180 KB por imagen |

> 💡 Comprimir imágenes en [tinypng.com](https://tinypng.com) antes de subir.

---

## 🚀 Despliegue en GitHub Pages

### Paso 1 — Preparar el repositorio

```bash
# Clonar el repositorio (si no lo tienes localmente)
git clone https://github.com/rodrigoarevaloabarca-svg/Rodrigo-Arevalo-Cv.git
cd Rodrigo-Arevalo-Cv
```

### Paso 2 — Subir los archivos

```bash
# Agregar todos los cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "feat: actualizar portafolio neon v4"

# Subir a GitHub
git push origin main
```

### Paso 3 — Activar GitHub Pages

1. Ir al repositorio en **GitHub.com**
2. Click en **Settings** (⚙️ pestaña superior)
3. En el menú lateral ir a **Pages**
4. En **Source** seleccionar: `Deploy from a branch`
5. En **Branch** seleccionar: `main` → carpeta `/ (root)`
6. Click en **Save**

### Paso 4 — Verificar el despliegue

Después de 1-3 minutos el sitio estará disponible en:

```
https://rodrigoarevaloabarca-svg.github.io/Rodrigo-Arevalo-Cv/
```

> ⚠️ El primer despliegue puede tardar hasta **5 minutos**. Los siguientes son casi instantáneos.

---

## 🔧 Desarrollo Local

No necesitas ningún servidor ni instalar dependencias. Abre directamente el archivo en el navegador:

```bash
# Opción 1: abrir directo (puede haber limitaciones con rutas locales)
open index.html

# Opción 2 (recomendada): servidor local simple con Python
python3 -m http.server 8000
# Luego abrir: http://localhost:8000

# Opción 3: con VS Code + extensión Live Server
# Click derecho en index.html → "Open with Live Server"
```

---

## ✉️ Configuración del Formulario

El formulario usa **[FormSubmit.co](https://formsubmit.co)** para enviar emails sin backend.

```html
<!-- En index.html, línea del form: -->
<form action="https://formsubmit.co/TU_EMAIL@gmail.com" method="POST">
```

**Primera vez:** al recibir el primer mensaje, FormSubmit enviará un email de **activación**. Debes confirmarlo para que los mensajes siguientes lleguen correctamente.

**Configuración adicional** (opcional, agregar dentro del `<form>`):

```html
<!-- Redirigir a la página de agradecimiento tras enviar -->
<input type="hidden" name="_next" value="https://TU_USUARIO.github.io/Rodrigo-Arevalo-Cv/agradecimiento.html">

<!-- Evitar spam con honeypot -->
<input type="hidden" name="_honey" style="display:none">

<!-- Desactivar captcha de FormSubmit -->
<input type="hidden" name="_captcha" value="false">
```

---

## 🎨 Personalización

### Cambiar colores neon
En `assets/css/style.css`, bloque `:root`:

```css
:root {
  --neon1: #a855f7;   /* violeta  → cambiar por tu color principal */
  --neon2: #06b6d4;   /* cyan     → cambiar por tu color secundario */
  --neon3: #f472b6;   /* pink     → cambiar por tu color terciario */
  --neon4: #34d399;   /* esmeralda → usado en el check y estado */
}
```

### Cambiar la foto de perfil
Reemplazar el archivo `assets/img/foto.png` manteniendo el mismo nombre,  
o actualizar el atributo `src` en `index.html`:

```html
<img src="assets/img/TU_FOTO.jpg" alt="Tu nombre" class="hero-avatar">
```

### Agregar un nuevo proyecto a la galería
1. Agregar la imagen en `assets/img/projects/`
2. Agregar un nuevo `<div class="gallery-slide">` en `index.html` dentro de `#galleryTrack`

---

## 📱 Responsive Breakpoints

| Breakpoint | Comportamiento |
|-----------|---------------|
| `> 1024px` | Layout completo — grilla de 3 columnas en proyectos |
| `860px – 1024px` | Menú hamburguesa activo, grilla de 2 columnas |
| `< 600px` | Todo en 1 columna, foto y nombre apilados, stats en 2×2 |

---

## 📄 Licencia

Uso personal. Si usas este diseño como base para tu propio portafolio, se agradece una mención. 🙌

---

<div align="center">

Hecho con ☕ y código en **Chile 🇨🇱**

**[⬆ Volver arriba](#-rodrigo-arévalo--portafolio-cv-web)**

</div>
