<p align="center">
  <img src="./assets/images/icon.png" alt="Taskey Logo" width="120" />
</p>

<h1 align="center">Taskey — Frontend</h1>

<p align="center">
  <strong>Aplicación de control parental gamificada</strong><br/>
  Gestiona tareas, recompensas y hábitos saludables para tus hijos, todo desde tu teléfono.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-000020?logo=expo" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Arquitectura-MVVM-8B5CF6" alt="MVVM" />
  <img src="https://img.shields.io/badge/Plataformas-Android%20%7C%20iOS%20%7C%20Web-green" alt="Platforms" />
  <a href="https://github.com/RogueBaker01/TaskKey-Back1"><img src="https://img.shields.io/badge/Backend-FastAPI%20%7C%20Azure-009688?logo=fastapi&logoColor=white" alt="Backend" /></a>
</p>

---

## Descripción

**Taskey** es una aplicación móvil multiplataforma de control parental que convierte las responsabilidades diarias en una experiencia interactiva y motivadora. Los padres pueden crear y gestionar tareas y restricciones de aplicaciones, mientras que los hijos completan misiones y obtienen recompensas y logros.

### Funcionalidades Principales

| Rol | Funcionalidades |
|---|---|
| **Padre** | Crear/administrar tareas, gestionar perfiles de hijos, restricción de apps, notificaciones, recompensas |
| **Hijo** | Ver y completar tareas, canjear recompensas, personalizar avatar, ver logros y progreso, cámara para evidencias |

---

## Arquitectura

El proyecto sigue el patrón **MVVM (Model-View-ViewModel)** con una estrategia **offline-first**.

### Flujo de datos

```
View (Pantallas)
  └─► ViewModel       ← lógica de presentación, estado de UI
        └─► Repository   ← decide entre caché local y API remota
              ├─► Storage (AsyncStorage)   ← fuente offline
              └─► Service (API REST)       ← fuente remota (Backend FastAPI en Azure)
```

La regla general es: **leer primero desde AsyncStorage, sincronizar con la API en segundo plano.** Cuando no hay conexión, la app opera con los datos cacheados y encola las operaciones pendientes.

### Estructura del proyecto

```
Taskey-master/
├── app/                    # Pantallas (Expo Router)
│   ├── (auth)/             #   └─ Autenticación (login, registro)
│   ├── (parent)/           #   └─ Flujo del padre
│   ├── (child)/            #   └─ Flujo del hijo
│   └── (tabs)/             #   └─ Navegación con tabs
├── models/                 # Modelos de dominio (Padre, Hijo, Tarea, Recompensa)
├── viewmodels/             # ViewModels (lógica de presentación)
├── repositories/           # Repositorios (acceso a datos)
├── services/               # Servicios (API, lógica de negocio)
├── storage/                # Almacenamiento local (AsyncStorage)
├── components/             # Componentes reutilizables de UI
├── hooks/                  # Custom hooks de React
├── constants/              # Tema y constantes globales
├── styles/                 # Estilos globales
└── assets/                 # Imágenes e íconos
```

---

## Tecnologías

| Categoría | Tecnología |
|---|---|
| **Framework** | [Expo](https://expo.dev/) SDK 54 |
| **UI** | [React Native](https://reactnative.dev/) 0.81 |
| **Lenguaje** | TypeScript 5.9 + JavaScript |
| **Navegación** | [Expo Router](https://docs.expo.dev/router/introduction/) v6 (file-based routing) |
| **Almacenamiento** | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) |
| **Animaciones** | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) v4 |
| **Tipografía** | [Figtree](https://fonts.google.com/specimen/Figtree) (Google Fonts) |
| **Builds** | [EAS Build](https://docs.expo.dev/build/introduction/) |
| **OTA Updates** | [EAS Update](https://docs.expo.dev/eas-update/introduction/) |

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) v18+ (recomendado LTS)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli` o usa `npx expo`)
- Un dispositivo físico con [Expo Go](https://expo.dev/go) **o** un emulador configurado:
  - **Android:** [Android Studio](https://developer.android.com/studio)
  - **iOS:** [Xcode](https://developer.apple.com/xcode/) (solo macOS)

---

## Instalación y Configuración

```bash
# 1. Clonar el repositorio
git clone https://github.com/gallardoo8/Taskey-master
cd Taskey-master

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (ver sección siguiente)
cp .env.example .env

# 4. Levantar el servidor de desarrollo
npx expo start
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# URL base del backend (FastAPI en Azure)
EXPO_PUBLIC_API_URL=https://<tu-app>.azurewebsites.net

# Para desarrollo local apuntando al backend local
# EXPO_PUBLIC_API_URL=http://192.168.x.x:8000
```

---

## Scripts de Desarrollo

```bash
# Iniciar en modo desarrollo (Expo Go)
npx expo start

# Iniciar directamente en Android
npx expo start --android

# Iniciar directamente en iOS
npx expo start --ios

# Verificar tipos TypeScript
npx tsc --noEmit

# Linter
npm run lint
```

---

## Builds con EAS

El proyecto está configurado con **EAS Build** para generar builds nativos:

```bash
# Build de desarrollo (con dev client)
eas build --profile development --platform android

# Build de preview (APK para pruebas internas)
eas build --profile preview --platform android

# Build de producción
eas build --profile production --platform android
```

---

## Repositorios Relacionados

| Repositorio | Descripción | Stack |
|---|---|---|
| **[TaskKey-Back1](https://github.com/RogueBaker01/TaskKey-Back1)** | API REST del backend | FastAPI · PostgreSQL · Azure |
| **[Taskey-master](https://github.com/gallardoo8/Taskey-master)** | App móvil (este repo) | Expo · React Native · TypeScript |

> El frontend se comunica con el backend a través de la URL configurada en las variables de entorno (`API_URL`). Ver la sección [Variables de Entorno](#variables-de-entorno) para más detalles.

---

## Equipo

| Nombre | Rol |
|---|---|
| Gabriela Pacheco Sanchez | Project Manager |
| Constanza Lanuza Gallardo | Frontend Developer |
| Bernardo David Nolasco Vargas | Backend Developer |
| Diego Fernando Ramírez García | Backend Developer |
| Guadalupe Álvarez Bazaldúa | Designer |
| Mariana Araujo Flores | Designer |
| Angélica Cenobio Arreola | Frontend Developer |

---

## Licencia

Este proyecto es privado y de uso exclusivo del equipo de desarrollo de Taskey.