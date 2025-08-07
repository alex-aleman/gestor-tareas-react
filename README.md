# Gestor de Tareas React

Aplicación web desarrollada con React y Firebase Firestore para la gestión de tareas personales. Incluye funcionalidades avanzadas como notificaciones locales, modo oscuro, prioridad de tareas y almacenamiento en la nube.

## Características

- Añadir, editar, eliminar y marcar tareas como completadas.
- Ordenar por prioridad, fecha de vencimiento o fecha de creación.
- Filtrado de tareas por estado (todas, completadas, pendientes).
- Búsqueda de tareas por texto.
- Notificaciones web (vencimiento y recordatorios).
- Soporte PWA: instalación en dispositivos móviles y trabajo offline.
- Almacenamiento en Firebase Firestore con actualizaciones en tiempo real.
- Diseño responsive y modo oscuro.

## Tecnologías utilizadas

- **React** con Hooks
- **Vite** como bundler
- **Firebase Firestore** (modo realtime)
- **Service Workers** para PWA y caché offline
- **HTML5 + CSS3**

## Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/alex-aleman/gestor-tareas-react.git
   cd gestor-tareas-react
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en [Firebase](https://console.firebase.google.com/)
   - Habilita Firestore Database
   - Copia tu configuración en un archivo `firebase.js`:

     ```js
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "TU_API_KEY",
       authDomain: "TU_AUTH_DOMAIN",
       projectId: "TU_PROJECT_ID",
       storageBucket: "TU_STORAGE_BUCKET",
       messagingSenderId: "TU_MESSAGING_SENDER_ID",
       appId: "TU_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     export const db = getFirestore(app);
     ```

4. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```

## Despliegue

La aplicación está desplegada como PWA y es funcional en dispositivos móviles y escritorio.

## Autor

**Glenn Alexander Bodden Alemán**  
[LinkedIn](https://www.linkedin.com/in/glenn-alexander-bodden-aleman)  
[GitHub](https://github.com/alex-aleman)

---

Este proyecto forma parte de mi portafolio profesional.