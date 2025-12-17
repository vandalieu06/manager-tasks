# TaskGener - Gestor de Tareas

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

**TaskGener** es una aplicación web de gestión de tareas diseñada para estudiantes del **Jaume Viladoms Centre Educatiu**. Permite crear, actualizar, eliminar y organizar tareas de manera eficiente con una interfaz limpia y moderna.

## 🎯 Características

- ✅ **Dashboard intuitivo** con vista general de todas las tareas
- 📝 **Crear tareas** con título, descripción, fecha, prioridad y etiquetas
- 🏷️ **Sistema de etiquetas** para categorizar por tecnología, prioridad o categoría
- ✏️ **Editar y eliminar** tareas fácilmente
- 🔐 **Sistema de autenticación** con login y registro
- 💾 **Almacenamiento local** usando LocalStorage (preparado para integración con base de datos)
- 🎨 **Diseño moderno** siguiendo especificaciones de Figma
- 📱 **Interfaz responsive** adaptada a diferentes dispositivos

## 🚀 Tecnologías

- **HTML5** - Estructura semántica
- **TypeScript** - Tipado estático y lógica de negocio
- **Tailwind CSS** - Estilos y diseño responsive
- **Font Awesome** - Iconografía
- **Google Fonts (Inter)** - Tipografía

## 📁 Estructura del Proyecto

```
manager-tasks/
├── index.html              # Dashboard principal
├── login.html              # Página de inicio de sesión
├── signup.html             # Página de registro
├── crearTarea.html         # Formulario de creación de tareas
├── todasLasTareas.html     # Vista de todas las tareas
├── TS/
│   ├── script.ts           # Lógica principal del dashboard
│   ├── login.ts            # Lógica de autenticación
│   └── signup.ts           # Lógica de registro
├── src/
│   ├── index.css           # Estilos personalizados
│   └── assets/             # Imágenes y recursos
├── db/
│   └── init.sql            # Script de inicialización de base de datos
├── dist/                   # Archivos JavaScript compilados
├── tsconfig.json           # Configuración de TypeScript
└── tailwind.config.js      # Configuración de Tailwind CSS
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Navegador web moderno

### Pasos de instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/vandalieu06/mangaer-tasks.git
   cd manager-tasks
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Compilar TypeScript**

   ```bash
   npx tsc
   ```

   O en modo watch para desarrollo:

   ```bash
   npx tsc --watch
   ```

4. **Abrir la aplicación**

   Abre `index.html` en tu navegador o usa un servidor local:

   ```bash
   # Con Python
   python -m http.server 8000

   # Con Node.js (http-server)
   npx http-server
   ```

5. **Acceder a la aplicación**

   Navega a `http://localhost:8000` en tu navegador

## 📖 Uso

### Registro e Inicio de Sesión

1. Accede a `signup.html` para crear una cuenta
2. Completa el formulario con tus datos:
   - Nombre
   - Apellidos
   - Correo electrónico
   - Nombre de usuario
   - Contraseña (mínimo 6 caracteres)
3. Inicia sesión en `login.html` con tus credenciales

### Crear una Tarea

1. Desde el dashboard, haz clic en "Crear Tarea"
2. Se abrirá un modal con el formulario
3. Completa los campos:
   - **Título**: Nombre de la tarea (obligatorio)
   - **Descripción**: Detalles adicionales
   - **Fecha**: Fecha límite
   - **Prioridad**: Nivel de importancia (1-5)
   - **Etiquetas**: Tags separados por comas
4. Haz clic en "Crear"

### Gestionar Tareas

- **Ver todas las tareas**: Navega a "Todas las tareas" desde el sidebar
- **Actualizar tarea**: Usa la función `actualizarTarea()` desde la consola
- **Eliminar tarea**: Usa la función `eliminarTarea()` desde la consola
- **Cerrar sesión**: Botón flotante en la esquina inferior derecha

## 🎨 Diseño y Colores

El proyecto sigue las especificaciones de diseño definidas en Figma:

### Paleta de Colores

| Color          | Hex       | Uso                        |
| -------------- | --------- | -------------------------- |
| Primary        | `#6d5dfb` | Botones, enlaces, acentos  |
| Primary Dark   | `#362c77` | Bordes, textos importantes |
| Neutral Light  | `#f7f7fb` | Fondos claros              |
| Neutral Medium | `#d4d4e0` | Placeholders               |
| Neutral Dark   | `#1f1f29` | Textos, bordes principales |
| Warning        | `#ffca65` | Estado pendiente           |
| Success        | `#32d18a` | Estado completado          |

### Tipografía

- **Fuente**: Inter
- **Pesos**: 400 (Regular), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

## 🗂️ Sistema de Etiquetas

Las tareas pueden categorizarse con diferentes tipos de etiquetas:

### Categorías (Negro `#1f1f29`)

- Frontend, Backend, Fullstack, Design, Mobile, DevOps, Testing, Documentation

### Prioridad (Rojo `#ff6b6b`)

- Prioridad: Alta, Media, Baja, Urgente, Crítico

### Tecnologías (Morado `#6d5dfb`)

- React, Vue.js, Angular, Node.js, SQL, Database, Python, TypeScript, JavaScript

## 🔄 Próximas Mejoras

- [ ] Integración con base de datos PostgreSQL
- [ ] API REST con Node.js/Express
- [ ] Autenticación JWT
- [ ] Filtros y búsqueda avanzada de tareas
- [ ] Drag & drop para reorganizar tareas
- [ ] Notificaciones y recordatorios
- [ ] Modo oscuro
- [ ] Exportar tareas a PDF/CSV
- [ ] Colaboración en equipo

## 📚 Documentación Adicional

- [DESIGN_IMPLEMENTATION.md](DESIGN_IMPLEMENTATION.md) - Especificaciones de diseño detalladas
- [ICON_COLOR_GUIDE.md](ICON_COLOR_GUIDE.md) - Guía de iconos y colores
- [DOCUMENTACION_COMPLETA_TASKGENER.md](DOCUMENTACION_COMPLETA_TASKGENER.md) - Documentación técnica completa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

Desarrollado para **Jaume Viladoms Centre Educatiu**

## 🔗 Enlaces

- [Repositorio GitHub](https://github.com/vandalieu06/mangaer-tasks)
- [Reportar un Bug](https://github.com/vandalieu06/mangaer-tasks/issues)
- [Diseño en Figma](https://www.figma.com/proto/zAulmgBMEDtZdLUihnyfiM/TaskGener?page-id=9%3A55&node-id=20-2&viewport=821%2C638%2C0.35&t=Y3VAjIpA45LN7fgH-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=20%3A2)

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub
