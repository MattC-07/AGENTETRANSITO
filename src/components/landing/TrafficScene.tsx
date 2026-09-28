import { useId } from "react";

export const DEMO_PLATE = "KLM 482";

type Props = {
  /** true: el carro cruza en bucle (clases landing-*). false: foto fija del momento de la detección. */
  animated?: boolean;
  /** Muestra el recuadro de detección con la placa. */
  detection?: boolean;
  className?: string;
  label?: string;
  /** Placa que aparece en el recuadro de detección. */
  plate?: string;
};

/**
 * Escena del cruce: vía, línea de pare, cebra y semáforo en rojo.
 * Se usa animada en "Cómo funciona" y fija como evidencia en la vista del ciudadano.
 */
export function TrafficScene({
  animated = false,
  detection = true,
  className = "",
  label = "Ilustración: un vehículo cruza la línea de pare con el semáforo en rojo.",
  plate = DEMO_PLATE,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const grid = `grid-${uid}`;
  const blur = `blur-${uid}`;
  const scan = `scan-${uid}`;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" className="stroke-sifca-glow/10" strokeWidth="1" />
        </pattern>
        <filter id={blur} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id={scan} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" className="fill-sifca-deep" />
      <rect width="400" height="300" fill={`url(#${grid})`} />

      {/* Andenes y vía */}
      <rect x="0" y="128" width="400" height="22" className="fill-white/5" />
      <rect x="0" y="240" width="400" height="22" className="fill-white/5" />
      <rect x="0" y="150" width="400" height="90" className="fill-sifca-navy" />
      <path d="M0 150H400M0 240H400" className="stroke-white/20" strokeWidth="1" />
      <path
        d="M0 195H228"
        className="stroke-sifca-border/40"
        strokeWidth="2"
        strokeDasharray="14 12"
      />
      <path
        d="M292 195H400"
        className="stroke-sifca-border/40"
        strokeWidth="2"
        strokeDasharray="14 12"
      />

      {/* Cebra y línea de pare */}
      {[156, 172, 188, 204, 220].map((y) => (
        <rect key={y} x="252" y={y} width="30" height="9" rx="1" className="fill-white/25" />
      ))}
      <rect x="238" y="150" width="4" height="90" className="fill-white/85" />
      <text x="226" y="146" textAnchor="end" className="fill-sifca-light/60 font-mono" fontSize="8">
        LÍNEA DE PARE
      </text>

      {/* Semáforo en rojo */}
      <rect x="301" y="118" width="3" height="32" className="fill-sifca-border/40" />
      <rect
        x="288"
        y="38"
        width="29"
        height="82"
        rx="7"
        className="fill-sifca-deep stroke-white/20"
        strokeWidth="1"
      />
      <circle
        cx="302.5"
        cy="56"
        r="15"
        className={`fill-danger ${animated ? "landing-glow" : "opacity-70"}`}
        filter={`url(#${blur})`}
      />
      <circle cx="302.5" cy="56" r="8.5" className="fill-danger" />
      <circle cx="302.5" cy="79" r="8.5" className="fill-warn/20" />
      <circle cx="302.5" cy="102" r="8.5" className="fill-ok/20" />

      {/* Vehículo + recuadro de detección */}
      <g
        className={animated ? "landing-car" : undefined}
        transform={animated ? undefined : "translate(262 0)"}
      >
        {detection ? (
          <g className={animated ? "landing-detect" : undefined}>
            <rect
              x="-7"
              y="195"
              width="86"
              height="42"
              rx="3"
              fill="none"
              className="stroke-sifca-glow"
              strokeWidth="1.5"
            />
            <rect x="-7" y="176" width="86" height="16" rx="3" className="fill-sifca-glow" />
            <text
              x="36"
              y="187.5"
              textAnchor="middle"
              className="fill-sifca-deep font-mono"
              fontSize="10"
              fontWeight="600"
            >
              {plate}
            </text>
          </g>
        ) : null}
        <rect x="0" y="201" width="72" height="30" rx="8" className="fill-sifca-light" />
        <rect x="46" y="205" width="13" height="22" rx="3" className="fill-sifca-mid/80" />
        <rect x="9" y="206" width="10" height="20" rx="3" className="fill-sifca-mid/55" />
        <rect x="69" y="204" width="3" height="5" rx="1" className="fill-white" />
        <rect x="69" y="223" width="3" height="5" rx="1" className="fill-white" />
      </g>

      {animated ? (
        <>
          <g className="landing-scan text-sifca-glow">
            <rect x="0" y="-20" width="400" height="20" fill={`url(#${scan})`} />
            <path d="M0 0H400" className="stroke-sifca-glow/50" strokeWidth="1" />
          </g>
          <rect width="400" height="300" className="landing-flash fill-white" />
        </>
      ) : null}
    </svg>
  );
}

/** Placa estilizada (sin los colores reales de placa, solo tokens). */
export function PlateBadge({
  plate = DEMO_PLATE,
  size = "lg",
  city = "APARTADÓ",
}: {
  plate?: string;
  size?: "sm" | "lg";
  city?: string;
}) {
  const big = size === "lg";
  return (
    <span
      className={`inline-flex flex-col items-center rounded-md border-2 border-sifca-text bg-white font-mono leading-none text-sifca-text shadow-lg shadow-black/20 ${
        big ? "px-5 pt-2.5 pb-1.5" : "px-2.5 pt-1.5 pb-1"
      }`}
    >
      <span
        className={`font-bold tracking-wider whitespace-nowrap ${big ? "text-3xl sm:text-4xl" : "text-base"}`}
      >
        {plate}
      </span>
      <span
        className={`tracking-[0.3em] text-sifca-muted ${big ? "mt-1 text-[10px]" : "mt-0.5 text-[7px]"}`}
      >
        {city}
      </span>
    </span>
  );
}
