export default function EvidenceReplay() {
    return (
        <section className="overflow-hidden rounded-lg border border-[#C2CEDE] bg-white shadow-sm">
            <div className="border-b border-[#C2CEDE] bg-[#F5F8FC] px-5 py-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#5A7099]">
                    Recreación ilustrativa
                </h2>
            </div>
            <div
                className="traffic-replay relative h-36 overflow-hidden bg-[#263746]"
                role="img"
                aria-label="Animación ilustrativa: un vehículo cruza una intersección mientras el semáforo está en rojo"
            >
                <div className="traffic-replay-road" />
                <div className="traffic-replay-stop-line" />
                <div className="traffic-replay-signal" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <div className="traffic-replay-car" aria-hidden="true">
                    <span />
                    <span />
                </div>
                <span className="absolute bottom-2 left-3 text-xs font-medium text-white/80">
                    Ejemplo de cruce con luz roja · 2,6 s
                </span>
            </div>
            <p className="px-5 py-3 text-xs text-[#5A7099]">
                Animación de referencia. No corresponde a la evidencia real de este comparendo.
            </p>
        </section>
    );
}