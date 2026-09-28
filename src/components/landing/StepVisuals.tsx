import type { CSSProperties, ReactNode } from "react";
import { CameraFeed } from "./CameraFeed";
import {
  CursorArrow,
  IconArrowRight,
  IconCheck,
  IconDatabase,
  IconDownload,
  IconPlay,
  IconScale,
} from "./icons";
import { DEMO_PLATE, PlateBadge, TrafficScene } from "./TrafficScene";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

function StatusPill({ tone, children }: { tone: "pending" | "ok"; children: ReactNode }) {
  const cls = tone === "ok" ? "bg-ok-soft text-status-green" : "bg-warn-soft text-status-amber";
  const dot = tone === "ok" ? "bg-ok" : "bg-warn";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {children}
    </span>
  );
}

/* ---------- 1. La cámara detecta ---------- */
export function DetectVisual() {
  return (
    <CameraFeed className="absolute inset-x-3 top-14 bottom-3 rounded-xl border border-white/10 shadow-2xl shadow-black/40 sm:inset-x-6 sm:bottom-6" />
  );
}

/* ---------- 2. El sistema identifica ---------- */
const runt = [
  ["Marca", "Renault"],
  ["Línea", "Logan"],
  ["Modelo", "2019"],
  ["Color", "Gris"],
  ["Propietario", "C.C. ••••5821"],
];

export function IdentifyVisual() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-5 md:flex-row md:gap-6">
      <div className="landing-pop w-full max-w-64 rounded-xl border border-white/10 bg-sifca-deep/70 p-4 md:w-auto">
        <p className="font-mono text-[10px] tracking-widest text-sifca-light/80 uppercase">
          Lectura de placa
        </p>
        <div className="relative mt-3 flex justify-center overflow-hidden rounded-lg border border-sifca-glow/40 bg-sifca-navy px-4 py-6">
          <PlateBadge />
          <span
            aria-hidden="true"
            className="landing-scan-x pointer-events-none absolute inset-y-0 left-1/2 w-0.5 bg-sifca-glow shadow-[0_0_16px_2px] shadow-sifca-glow/70"
          />
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-sifca-light">
          <IconCheck className="size-3.5 text-sifca-glow" />
          Placa leída automáticamente
        </p>
      </div>

      <IconArrowRight
        className="landing-pop size-6 shrink-0 rotate-90 text-sifca-glow md:rotate-0"
        style={delay(300)}
      />

      <div
        className="landing-pop w-full max-w-72 rounded-xl bg-white p-4 shadow-xl shadow-black/30"
        style={delay(450)}
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
          <IconDatabase className="size-4 text-sifca-mid" />
          Consulta en el RUNT
        </p>
        <dl className="mt-3 divide-y divide-sifca-border/70 text-sm">
          {runt.map(([k, v], i) => (
            <div
              key={k}
              className="landing-pop flex justify-between gap-4 py-1.5"
              style={delay(700 + i * 180)}
            >
              <dt className="text-sifca-muted">{k}</dt>
              <dd className="font-medium text-sifca-text">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ---------- 3. Una persona revisa ---------- */
const checks = [
  "El semáforo estaba en rojo",
  "La placa se lee con claridad",
  "El vehículo pasó la línea de pare",
];

export function ReviewVisual() {
  return (
    <div className="landing-pop w-full max-w-md rounded-xl bg-white p-4 shadow-xl shadow-black/30 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] text-sifca-muted">EVENTO EV-1082</p>
          <p className="text-sm font-semibold text-sifca-text">Revisión del agente</p>
        </div>
        <span className="relative inline-grid">
          <span className="landing-out col-start-1 row-start-1" style={delay(3100)}>
            <StatusPill tone="pending">Pendiente</StatusPill>
          </span>
          <span className="landing-pop col-start-1 row-start-1" style={delay(3200)}>
            <StatusPill tone="ok">Aprobado</StatusPill>
          </span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <TrafficScene className="absolute inset-0 size-full" label="Foto de evidencia" />
          <span className="absolute bottom-1.5 left-1.5 rounded bg-sifca-deep/80 px-1.5 py-0.5 text-[10px] text-white">
            Foto
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <TrafficScene
            className="absolute inset-0 size-full"
            detection={false}
            label="Video de evidencia"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-8 items-center justify-center rounded-full bg-white/90 text-sifca-navy">
              <IconPlay className="size-4" />
            </span>
          </span>
          <span className="absolute bottom-1.5 left-1.5 rounded bg-sifca-deep/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
            Video 00:08
          </span>
        </div>
      </div>

      <ul className="mt-4 grid gap-2">
        {checks.map((c, i) => (
          <li key={c} className="flex items-center gap-2.5 text-sm text-sifca-text">
            <span className="relative size-5 shrink-0 rounded-full border border-sifca-border">
              <span
                className="landing-pop absolute -inset-px flex items-center justify-center rounded-full bg-sifca-mid text-white"
                style={delay(700 + i * 550)}
              >
                <IconCheck className="size-3.5" strokeWidth={2.25} />
              </span>
            </span>
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <span className="rounded-lg border border-sifca-border py-2 text-center text-sm font-medium text-sifca-muted">
          Rechazar
        </span>
        <span className="relative">
          <span
            className="landing-press block rounded-lg bg-sifca-blue py-2 text-center text-sm font-semibold text-white"
            style={delay(2750)}
          >
            Aprobar
          </span>
          <CursorArrow className="landing-cursor absolute top-4 left-1/2 size-6" />
        </span>
      </div>
    </div>
  );
}

/* ---------- 4. Se emite el comparendo ---------- */
export function IssueVisual() {
  return (
    <div className="landing-pop relative w-full max-w-sm -rotate-1 rounded-lg bg-white p-5 shadow-2xl shadow-black/40 sm:p-6">
      <div className="flex items-start justify-between gap-3 border-b border-sifca-border pb-3">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-sifca-mid uppercase">
            Comparendo electrónico
          </p>
          <p className="mt-0.5 font-mono text-xs text-sifca-muted">N.º 05045-2026-001082</p>
        </div>
        <span className="rounded bg-sifca-navy px-2 py-1 font-mono text-sm font-bold text-white">
          D04
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-sifca-text">
        No detenerse ante la luz roja del semáforo
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {[
          ["Placa", DEMO_PLATE],
          ["Fecha", "22/09/2026 · 10:42"],
          ["Lugar", "CAM-03 · Apartadó"],
          ["Valor", "$548.500"],
        ].map(([k, v], i) => (
          <div key={k} className="landing-pop" style={delay(300 + i * 150)}>
            <dt className="text-sifca-muted">{k}</dt>
            <dd className="font-mono font-semibold text-sifca-text">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-dashed border-sifca-border pt-3 pr-28 text-xs text-sifca-muted">
        Revisado y aprobado por un agente de tránsito de la Secretaría de Movilidad.
      </p>
      <span
        className="landing-stamp absolute right-4 bottom-5 rounded-md border-2 border-ok px-2.5 py-1 text-sm font-bold tracking-widest text-status-green"
        style={delay(1100)}
      >
        APROBADO
      </span>
    </div>
  );
}

/* ---------- 5. Consultas o apelas ---------- */
export function CitizenVisual() {
  return (
    <div className="landing-pop w-60 rounded-[2rem] border-4 border-sifca-text bg-sifca-text p-1.5 shadow-2xl shadow-black/40 sm:w-64">
      <div className="overflow-hidden rounded-[1.6rem] bg-sifca-surface">
        <div className="bg-sifca-navy px-4 pt-3 pb-4">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30" />
          <p className="text-[11px] text-sifca-light">SIFCA · Consulta</p>
          <div className="mt-2 flex items-center rounded-lg bg-white px-3 py-2 font-mono text-sm font-semibold text-sifca-text">
            {DEMO_PLATE}
            <span className="landing-caret ml-0.5 h-4 w-px bg-sifca-text" aria-hidden="true" />
          </div>
        </div>
        <div className="p-3">
          <p className="landing-pop text-[11px] text-sifca-muted" style={delay(500)}>
            1 comparendo encontrado
          </p>
          <div className="landing-pop mt-2 rounded-xl bg-white p-3 shadow-sm" style={delay(750)}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-sifca-text">D04</span>
              <StatusPill tone="pending">Por pagar</StatusPill>
            </div>
            <div className="relative mt-2 aspect-video overflow-hidden rounded-md">
              <TrafficScene className="absolute inset-0 size-full" label="Evidencia" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-6 items-center justify-center rounded-full bg-white/90 text-sifca-navy">
                  <IconPlay className="size-3" />
                </span>
              </span>
            </div>
            <p className="mt-2 text-[11px] text-sifca-muted">Con 50 % de descuento</p>
            <p className="font-mono text-base font-bold text-sifca-text">$274.250</p>
          </div>
          <div className="landing-pop mt-2 grid grid-cols-2 gap-1.5" style={delay(1050)}>
            <span className="flex items-center justify-center gap-1 rounded-lg bg-sifca-blue py-1.5 text-[11px] font-semibold text-white">
              <IconDownload className="size-3" /> Descargar
            </span>
            <span className="flex items-center justify-center gap-1 rounded-lg border border-sifca-border bg-white py-1.5 text-[11px] font-semibold text-sifca-blue">
              <IconScale className="size-3" /> Apelar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
