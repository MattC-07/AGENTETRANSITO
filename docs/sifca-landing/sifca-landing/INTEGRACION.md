# Landing de SIFCA: cómo integrarla

Rama sugerida: `feature/landing`

## 1. Copiar archivos nuevos

```
src/pages/Landing.tsx
src/components/landing/
  ├─ LandingNav.tsx      barra fija + menú "Ingresar" + menú móvil
  ├─ Hero.tsx            título protagonista (sin animación)
  ├─ HowItWorks.tsx      recorrido interactivo de 5 pasos (pestañas + reproducción automática)
  ├─ StepVisuals.tsx     la escena de cada paso (cámara, RUNT, revisión, comparendo, consulta)
  ├─ CameraFeed.tsx      visor de cámara animado (paso 1)
  ├─ TrafficScene.tsx    escena del cruce en SVG, animada o fija (se reutiliza como evidencia)
  ├─ Transparency.tsx    derechos del ciudadano
  ├─ Audiences.tsx       Ciudadano / Agente / Administrador (reemplaza el selector de Home)
  ├─ Faq.tsx             acordeón accesible
  ├─ LandingFooter.tsx
  ├─ icons.tsx           iconos SVG en línea
  └─ ui.tsx              clases de botones, encabezado de sección, useReveal()

src/pages/ciudadano/
  ├─ Consulta.tsx        /ciudadano: búsqueda por placa o cédula, validación y autorización de datos
  └─ Resultado.tsx       /ciudadano/resultado?tipo=placa&valor=KLM482
src/components/ciudadano/
  ├─ data.ts             tipos, datos SIMULADOS, validación, formato y cálculo del descuento
  ├─ ui.tsx              encabezado del módulo, insignia de estado, paneles, botones
  ├─ EvidencePlayer.tsx  video / foto de la infracción / foto de la placa
  ├─ ProcessTimeline.tsx estado del proceso (por pagar, en apelación, pagado)
  ├─ PaymentCard.tsx     valor con/sin descuento, diálogo de medios de pago, descarga
  └─ AppealCard.tsx      formulario de apelación con validación y radicado
```

## 2. `src/index.css`

Pega **al final** el contenido de `index.css.landing.css`. Agrega:

- Tokens nuevos: `sifca-glow`, `sifca-surface`, `sifca-deep`, `danger-soft`, `warn-soft`, `ok-soft`
- Clases `landing-*` (cuadrícula, aparición al hacer scroll y la animación de la cámara)
- Soporte para `prefers-reduced-motion`

Revisa que tu `@theme` tenga `--font-mono` apuntando a JetBrains Mono (y `--font-sans` a Inter). Si no está, agrégalo:

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

## 3. `src/routes.ts`

Apunta `/` a la landing y las dos rutas del ciudadano a las páginas nuevas, con `lazy()` como las demás:

```ts
const Landing = lazy(() => import("./pages/Landing"));
const CiudadanoConsulta = lazy(() => import("./pages/ciudadano/Consulta"));
const CiudadanoResultado = lazy(() => import("./pages/ciudadano/Resultado"));
// ...
{ path: "/", element: <Landing /> },
{ path: "/ciudadano", element: <CiudadanoConsulta /> },
{ path: "/ciudadano/resultado", element: <CiudadanoResultado /> },
```

Estas dos páginas **reemplazan** las pantallas actuales de ciudadano. Si quieres conservar las viejas mientras comparas, déjalas en otra ruta (por ejemplo `/ciudadano-v1`).

### Conectar con el backend

Todo el módulo ciudadano lee de `components/ciudadano/data.ts`. Para usar datos reales, cambia `buscarComparendos()` por la llamada a tu API y deja los mismos tipos (`Comparendo`, `Vehiculo`). Pagar, descargar y apelar son de demostración: muestran un aviso en lugar de llamar a un servidor.

**No borres `Home.tsx`**, porque otras pantallas importan `SifcaHeader` desde ahí. Si ya ninguna ruta usa el componente por defecto de `Home`, solo quita su import de `routes.ts`.

## 4. Probar

```
pnpm format
pnpm build
```

Luego abre `/` en el servidor de desarrollo y revisa lo siguiente:

- Los botones llevan a `/ciudadano`, `/agente` y `/admin` (el menú "Ingresar" tiene Agente y Administrador).
- Los anclas del menú llegan a cada sección sin quedar tapadas por la barra fija.
- Con la ventana de DevTools en 360 px no aparece scroll horizontal.
- Con "Emulate prefers-reduced-motion: reduce" la cámara se ve quieta con el carro ya detectado.

## Notas

- La cámara (paso 1 de "Cómo funciona") usa su propia animación (`landing-car`, `landing-detect`) en vez de `traffic-replay-*`. No tuve tu `index.css`, así que la hice independiente para no romper `EvidenceReplay`. Si prefieres reutilizar la tuya, cambia el `<g className="landing-car">` en `TrafficScene.tsx`.
- Contraste: `sifca-muted` sobre `sifca-bg` (#EDF1F7) da 4.4:1, un poco por debajo de AA para texto normal. Por eso la landing usa blanco y `sifca-surface` (4.65:1) como fondos claros.
- La landing no tiene ningún color hex ni `style={{ color }}`. Todo sale de los tokens.
- Si vienes de una versión anterior, borra `Stats.tsx`, `SystemPreview.tsx`, `CitizenSection.tsx` y `CitizenView.tsx`: ya no se usan.
- El recorrido de pasos avanza solo únicamente cuando está en pantalla. Se pausa al pasar el mouse, tiene botón de pausa y no avanza si el usuario tiene activado "reducir movimiento".
