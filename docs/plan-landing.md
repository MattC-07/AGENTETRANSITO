# Plan de diseño — Landing de SIFCA

> Documento para pasarle a Claude (u otro asistente) y que diseñe e implemente la **landing page** del proyecto.
> Proyecto: `C:\proyectos\transito` · Rama: `feature/landing`

---

## 1. Tu rol y el objetivo

Eres un diseñador y desarrollador frontend. Tu tarea es **diseñar y programar la landing page de SIFCA**. Debe ser una página pública que explique **en lenguaje sencillo** qué es el sistema, cómo funciona y a quién sirve. También debe llevar a cada usuario a su módulo: Agente, Ciudadano o Administrador.

El diseño tiene que ser **bonito, minimalista y tecnológico**. Tiene que sentirse moderno y confiable, como un servicio público digital serio. No debe parecer una página recargada ni un anuncio comercial.

**Regla de oro del texto:** cualquier persona tiene que entenderlo, desde un conductor que recibió una multa hasta un profesor que evalúa el proyecto. Nada de jerga técnica sin explicar. Usa frases cortas y ve al grano.

---

## 2. Qué es el proyecto (contexto que necesitas)

**SIFCA** significa *Sistema de Fotodetección de Infracciones Semafóricas*. Es un sistema de **fotomultas por pasarse el semáforo en rojo** para la **Secretaría de Movilidad del Municipio de Apartadó, Antioquia**. Es un proyecto académico del curso *Análisis y Diseño de Sistemas* de la **Universidad de Antioquia (UdeA)**.

### Cómo funciona, en palabras simples

1. **La cámara detecta.** Una cámara ubicada en un cruce con semáforo graba al vehículo que pasa la línea de pare con la luz en rojo.
2. **El sistema identifica.** Se lee la placa y se consultan los datos del vehículo en el RUNT: propietario, marca, modelo y color.
3. **Una persona revisa.** Un agente de tránsito mira la foto y el video. Si la evidencia es clara, **aprueba**. Si no lo es, **rechaza** e indica el motivo, por ejemplo "foto ilegible". **Ninguna multa sale sin revisión humana.**
4. **Se emite el comparendo.** Si el agente aprueba, se genera el comparendo oficial (código D04 — cruce de semáforo en luz roja).
5. **El ciudadano consulta.** Con su placa o su cédula, el ciudadano ve sus comparendos, revisa la evidencia en video, descarga el documento y conoce las opciones de pago. Hay **descuento del 50%** si paga a tiempo.
6. **El ciudadano puede apelar.** Si no está de acuerdo, presenta una apelación desde la misma plataforma.

### Los tres tipos de usuario (y sus rutas actuales)

| Usuario | Qué hace | Ruta |
|---|---|---|
| **Agente de tránsito** | Inicia sesión, revisa la bandeja de eventos, ve la evidencia (foto, video y datos del RUNT), aprueba o rechaza | `/agente` → `/agente/bandeja` → `/agente/evento/:id` → `/agente/confirmacion` |
| **Ciudadano** | Consulta sus comparendos, ve la evidencia, descarga el documento y apela | `/ciudadano` → `/ciudadano/resultado` |
| **Administrador** | Ve las métricas: eventos del día, pendientes, comparendos emitidos, estado de las cámaras y semáforos, mapa de calor por horas, finanzas | `/admin` → `/admin/panel` |

### Datos de ejemplo que ya usa el sistema (sirven como cifras de la landing)

Estos datos son **simulados** y así debe quedar indicado de forma discreta:

- 108 eventos detectados hoy
- 47 comparendos emitidos hoy
- 1.284 comparendos al mes
- Tiempo medio de validación: 3 min 12 s
- 4 de 5 semáforos activos
- Valor del comparendo D04: $548.500 COP (con descuento del 50%: $274.250)

---

## 3. Tecnologías (respétalas, no agregues otras sin necesidad)

- **React 19** + **TypeScript 5.7**
- **Vite 8** (el servidor de desarrollo ya está corriendo; no hace falta iniciarlo)
- **Tailwind CSS v4** mediante `@tailwindcss/vite`. **No existe `tailwind.config`**: los tokens de tema se definen en `src/index.css` dentro de `@theme { ... }`.
- **react-router v8**: las rutas están en `src/routes.ts` y se cargan con `lazy()`.
- Fuentes ya importadas en `src/index.css`: **Inter** (texto) y **JetBrains Mono** (placas, códigos y cifras).
- Iconos: SVG en línea, como en el resto del proyecto. **No instales librerías de iconos ni de animación.** Las animaciones se hacen con CSS o Tailwind.
- Formato: `pnpm format` (oxfmt).

### Archivos relevantes

- `src/pages/Home.tsx`: la pantalla actual de `/`, que es solo un **selector de acceso** (dos tarjetas y un enlace de administrador). Exporta `SifcaHeader`, que se usa en otras pantallas. **No rompas ese export.**
- `src/routes.ts`: las rutas.
- `src/index.css`: la paleta y las fuentes (`@theme`) y la animación `traffic-replay-*`, que dibuja un carro cruzando el semáforo en rojo y **se puede reutilizar en la sección principal**.
- `src/imports/EvidenceReplay.tsx`: el componente de reproducción de la evidencia.

---

## 4. Análisis de la paleta de colores actual

Antes de diseñar, **revisa `src/index.css` y los archivos de `src/pages/`** para confirmar esta paleta. A continuación está el análisis ya hecho: cuántas veces aparece cada color en el código y para qué se usa.

### 4.1 Colores institucionales (ya definidos como tokens en `@theme`)

| Token Tailwind | Hex | Usos en código | Rol actual | Uso sugerido en la landing |
|---|---|---|---|---|
| `sifca-navy` | `#0D2247` | 14 | Header, fondos oscuros | Fondo de la sección principal, del footer y de las secciones oscuras |
| `sifca-blue` | `#1A3A6B` | 49 | Color de marca, botones, bordes en hover | Botón principal, títulos destacados, enlaces |
| `sifca-mid` | `#2558A8` | 11 | Logo, acentos | Acento "tecnológico": íconos, líneas, brillos, degradados |
| `sifca-light` | `#D6E3F7` | 6 | Fondo de insignias e íconos | Etiquetas (pills), fondo de íconos |
| `sifca-bg` | `#EDF1F7` | 25 | Fondo general de la app | Fondo de las secciones claras |
| `sifca-border` | `#C2CEDE` | 57 | Bordes y divisores | Bordes de tarjetas y líneas separadoras |
| `sifca-text` | `#0F1F3D` | 37 | Texto principal | Títulos y texto sobre fondo claro |
| `sifca-muted` | `#5A7099` | 73 | Texto secundario (el más usado) | Párrafos y descripciones |

Hay además un tono sin token: **`#F5F8FC`** (17 usos). Es un fondo casi blanco que sirve para alternar secciones. **Agrégalo como token** (por ejemplo `--color-sifca-surface`).

### 4.2 Colores de estado (semáforo)

| Token | Hex | Significado | Pareja de fondo usada en la app |
|---|---|---|---|
| `danger` | `#DC2626` | Rojo: infracción, sin conexión | `#FEE2E2` |
| `status-red` | `#B91C1C` | Texto rojo sobre fondo claro | — |
| `warn` | `#D97706` | Ámbar: pendiente, mantenimiento | `#FEF3C7` |
| `status-amber` | `#92400E` | Texto ámbar sobre fondo claro | — |
| `ok` | `#15803D` | Verde: aprobado, operativo | `#DCFCE7` |
| `status-green` | `#166534` | Texto verde sobre fondo claro | — |

### 4.3 Diagnóstico

- **Lo bueno:** es una paleta **institucional, sobria y coherente**, con una escala de azules marino que transmite confianza y autoridad. Los colores de estado coinciden con los de un semáforo (rojo, ámbar y verde), lo cual es perfecto para el tema.
- **El problema:** en el código casi todos los colores están **escritos a mano en `style={{ }}`** en vez de usar los tokens (`bg-sifca-navy`, `text-sifca-muted`, etc.). **En la landing usa siempre las clases de Tailwind con los tokens.**
- **Lo que falta para un look "tecnológico":** un acento luminoso para usar sobre el azul marino. Se propone **agregar**:
  - `--color-sifca-glow: #4F8BFF`: azul eléctrico para brillos, líneas finas, bordes de tarjetas en hover y degradados sutiles sobre `sifca-navy`.
  - `--color-sifca-surface: #F5F8FC`: el tono mencionado arriba.
  - (Opcional) `--color-sifca-deep: #0B1929`, que ya aparece en el código, para degradados más profundos del hero.
- **Regla de uso:** el rojo, el ámbar y el verde se usan **solo con su significado de semáforo** (infracción, pendiente, aprobado), nunca como decoración. El rojo encendido del semáforo puede ser el único punto de color intenso de la sección principal.
- **Contraste:** verifica que se cumpla WCAG AA. `sifca-muted` sobre `sifca-bg` pasa para texto normal. Sobre `sifca-navy`, usa blanco o `sifca-light` para el texto y nunca `sifca-muted`.

### 4.4 Proporción sugerida

- 60 %: claros (`sifca-bg`, `sifca-surface`, blanco)
- 25 %: azul marino (`sifca-navy`, `sifca-text`)
- 10 %: azul de marca (`sifca-blue`, `sifca-mid`)
- 5 %: acentos (`sifca-glow` y los colores de semáforo con su significado)

---

## 5. Estructura de la landing (secciones en orden)

Mantén un texto corto en cada sección: un título, una frase de apoyo y, como mucho, 3 o 4 elementos.

1. **Barra de navegación (fija, delgada)**
   - Logo SIFCA + "Secretaría de Movilidad · Apartadó"
   - Enlaces ancla: Cómo funciona · Para quién · Transparencia · Preguntas
   - Botón "Consultar mi comparendo" (principal) y enlace "Ingresar" (agente o administrador)

2. **Hero (sección principal)**, con fondo `sifca-navy`, cuadrícula sutil de puntos o líneas en `sifca-glow` a baja opacidad y un degradado suave.
   - Etiqueta: "Sistema de Fotodetección de Infracciones Semafóricas"
   - Título: algo como **"Cruces más seguros en Apartadó"**
   - Subtítulo: "Cámaras que detectan cuando un vehículo se pasa el semáforo en rojo. Personas que revisan cada caso antes de emitir una multa."
   - Dos botones: **Consultar mi comparendo** → `/ciudadano` · **Soy agente de tránsito** → `/agente`
   - Visual: **reutiliza la animación `traffic-replay-*`** (el carro cruzando en rojo) dentro de un "marco de cámara" con esquinas de visor, una etiqueta "● REC", la hora en JetBrains Mono y una placa de ejemplo.

3. **Cifras rápidas**: 3 o 4 números grandes en JetBrains Mono (ver sección 2). Agrega una nota pequeña: *"Datos de demostración"*.

4. **¿Cómo funciona?**: una línea de tiempo horizontal de 5 pasos (Detecta → Identifica → Revisa una persona → Se emite el comparendo → Consultas o apelas), con un ícono y una frase por paso. En móvil se vuelve vertical.

5. **¿Para quién es?**: 3 tarjetas: **Ciudadano**, **Agente de tránsito**, **Administrador**. Cada una tiene 3 viñetas con lo que puede hacer y un botón a su ruta. Este bloque **reemplaza** al selector actual de `Home.tsx`, así que ninguna ruta de acceso se puede perder.

6. **Transparencia y tus derechos**: el mensaje clave es que **"Ninguna multa se emite sin que una persona revise la evidencia."** Incluye 3 puntos: ves el video de tu infracción, conoces el motivo, y puedes apelar desde la plataforma. Menciona el descuento del 50% por pronto pago.

7. **Vista previa del sistema**: una maqueta o captura estilizada del panel del agente o del ciudadano (bandeja de eventos con estados en rojo, ámbar y verde) para mostrar que es una herramienta real.

8. **Preguntas frecuentes** (acordeón, 5 o 6 preguntas en lenguaje simple):
   - ¿Cómo sé si tengo un comparendo?
   - ¿Qué pasa si la foto no es clara?
   - ¿Puedo ver la evidencia?
   - ¿Cómo apelo?
   - ¿Hay descuento si pago rápido?
   - ¿Quién revisa las multas?

9. **Footer** con fondo `sifca-navy`: SIFCA, Secretaría de Movilidad · Apartadó, Antioquia; "Proyecto académico — Análisis y Diseño de Sistemas, Universidad de Antioquia"; accesos rápidos; `© 2026 SIFCA · v2.1.4`.

---

## 6. Lineamientos visuales ("minimalista y tecnológico")

- **Mucho espacio en blanco.** Secciones con padding generoso (`py-24`) y un ancho máximo de `max-w-6xl`.
- **Tipografía:** Inter para todo el texto. Títulos grandes (`text-5xl`/`text-6xl` en el hero) con `tracking-tight`. **JetBrains Mono** solo para cifras, placas, códigos (D04) y horas, que son los elementos que dan el aire "tecnológico".
- **Detalles tecnológicos sutiles:** cuadrícula de fondo, líneas finas de 1 px, esquinas de visor de cámara, un punto rojo pulsante de "en vivo" y bordes que brillan en `sifca-glow` al pasar el mouse. Todo discreto.
- **Tarjetas:** fondo blanco, borde `sifca-border`, `rounded-xl`, sombra muy suave. En hover se elevan un poco.
- **Animaciones:** pocas y suaves. Las secciones aparecen con un fade/slide de ~300 ms al hacer scroll (usa `IntersectionObserver`, sin librerías). Respeta `prefers-reduced-motion`.
- **Iconos:** SVG en línea, de trazo fino y del mismo estilo en todo el sitio.
- **Evita:** fotos de stock, emojis, degradados chillones y exceso de colores.

---

## 7. Requisitos técnicos

- **Responsive** desde 360 px hasta escritorio. La cuadrícula de tarjetas pasa de 3 a 1 columna y la línea de tiempo se vuelve vertical. El `Home` actual usa `px-20` y `grid-cols-2` fijos, así que no copies eso.
- **Accesibilidad:** HTML semántico (`header`, `nav`, `main`, `section`, `footer`), un solo `h1`, `alt`/`aria-label` en los íconos, foco visible y contraste AA. El acordeón debe manejarse con teclado.
- **Colores:** usa **solo clases de Tailwind con los tokens** de `@theme`. No uses `style={{ color: '#...' }}`. Agrega los tokens nuevos (`sifca-glow`, `sifca-surface`, `sifca-deep`) en `src/index.css`.
- **Organización:** crea `src/pages/Landing.tsx` y, si crece, divide en `src/components/landing/*.tsx`. En `src/routes.ts`, la ruta índice `/` debe apuntar a la landing. **Mantén el export `SifcaHeader` de `Home.tsx`**, porque otras pantallas lo usan.
- **Idioma:** todo el texto visible va en español de Colombia.
- **No toques** la lógica de las pantallas de Agente, Ciudadano y Administrador.

---

## 8. Criterios de aceptación

- [ ] En `/` se ve la nueva landing con todas las secciones de la sección 5.
- [ ] Desde la landing se llega a `/ciudadano`, `/agente` y `/admin`.
- [ ] Los textos se entienden sin conocimientos técnicos.
- [ ] La paleta usa los tokens `sifca-*` y los colores de semáforo solo con su significado.
- [ ] Se ve bien en móvil, tableta y escritorio, sin scroll horizontal.
- [ ] `pnpm build` compila sin errores de TypeScript.
- [ ] Las demás pantallas siguen funcionando igual.

---

## 9. Entrega esperada

1. Muestra primero un **resumen corto del diseño**: la estructura, la paleta final con los tokens nuevos y una idea del hero.
2. Luego, implementa.
3. Al final, explica qué archivos creaste o modificaste y cómo probarlo.
