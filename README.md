# 🚦 Dashboard de Control de Tránsito — Sistema de Fotomultas

Sistema web para agentes y autoridades de tránsito enfocado en la **detección, validación y gestión de fotomultas por infracción de cruce de semáforo en rojo**.

Proyecto desarrollado para el curso de **Análisis y Diseño de Sistemas** — Universidad de Antioquia (UdeA).

---

## 📌 Descripción General

Esta plataforma permite a los agentes de tránsito supervisar intersecciones semaforizadas, revisar las evidencias fotográficas y en video capturadas por las cámaras de fotodetección, validar las placas vehiculares involucradas y emitir las sanciones correspondientes de manera ágil, transparente y auditable.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/)
- **Diseño de Interfaz:** Figma
- **Control de Versiones:** Git & GitHub

---

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu computadora:

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/MattC-07/dashboard-transito-fotomultas.git
cd dashboard-transito-fotomultas
\`\`\`

### 2. Instalar las dependencias
\`\`\`bash
pnpm install
\`\`\`

### 3. Iniciar el servidor local
\`\`\`bash
pnpm dev
\`\`\`

Abre tu navegador en `http://localhost:5173/` para interactuar con la aplicación.

---

## 📋 Módulos y Funcionalidades Principales

- [x] **Arquitectura base y configuración del entorno (Vite + TypeScript).**
- [ ] **Panel de Monitoreo:** Visualización de cámaras y estado de semáforos en tiempo real.
- [ ] **Módulo de Validación de Infracciones:**
  - Visualización de evidencia (fotograma del vehículo cruzando en luz roja).
  - Reconocimiento y confirmación manual de número de placa.
  - Registro de metadatos (hora exacta, ubicación/intersección, velocidad estimada).
- [ ] **Gestión de Estados de Sanción:**
  - `Pendiente de revisión`
  - `Aprobada / Emitida`
  - `Desestimada / Rechazada`
- [ ] **Historial y Reportes:** Búsqueda por placa, rango de fechas o agente validador.

---

## 📁 Estructura del Proyecto

\`\`\`text
dashboard-transito/
├── src/               # Código fuente (componentes, vistas, lógica de validación)
├── .figma/            # Especificaciones y assets de diseño de interfaz
├── AGENTS.md          # Pautas y contexto para agentes de desarrollo
├── index.html         # Punto de entrada HTML
├── package.json       # Dependencias y scripts del proyecto
├── tsconfig.json      # Configuración de TypeScript
└── vite.config.ts     # Configuración de empaquetado y servidor Vite
\`\`\`

---

## 👤 Autor

* **Mateo** — [@MattC-07](https://github.com/MattC-07)
