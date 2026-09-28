import { useEffect, useId, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import {
  cedulaValida,
  normalizarCedula,
  normalizarPlaca,
  placaValida,
  type TipoBusqueda,
} from "../../components/ciudadano/data";
import { CitizenHeader, btnC, shell } from "../../components/ciudadano/ui";
import {
  IconArrowRight,
  IconEye,
  IconScale,
  IconSearch,
  IconTag,
} from "../../components/landing/icons";

const beneficios = [
  { icon: IconEye, titulo: "Ves la evidencia", texto: "El video y las fotos del momento exacto." },
  { icon: IconTag, titulo: "Pagas con descuento", texto: "50 % menos si pagas dentro del plazo." },
  { icon: IconScale, titulo: "Apelas en línea", texto: "Explica tu caso y adjunta pruebas." },
];

const pruebas: { tipo: TipoBusqueda; valor: string; nota: string }[] = [
  { tipo: "placa", valor: "KLM482", nota: "por pagar" },
  { tipo: "placa", valor: "GHT915", nota: "en apelación" },
  { tipo: "cedula", valor: "71000222", nota: "2 vehículos" },
  { tipo: "placa", valor: "XYZ789", nota: "sin comparendos" },
];

export default function CiudadanoConsulta() {
  const navigate = useNavigate();
  const id = useId();
  const [tipo, setTipo] = useState<TipoBusqueda>("placa");
  const [valor, setValor] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Consulta tu comparendo · SIFCA";
  }, []);

  const cambiarTipo = (t: TipoBusqueda) => {
    setTipo(t);
    setValor("");
    setError(null);
  };

  const consultar = (e: FormEvent) => {
    e.preventDefault();
    const v = tipo === "placa" ? normalizarPlaca(valor) : normalizarCedula(valor);
    if (!v)
      return setError(
        tipo === "placa" ? "Escribe la placa del vehículo." : "Escribe tu número de cédula.",
      );
    if (tipo === "placa" && !placaValida(v))
      return setError(
        "La placa debe tener 3 letras y 3 números, por ejemplo ABC123 (motos: ABC12D).",
      );
    if (tipo === "cedula" && !cedulaValida(v))
      return setError("La cédula debe tener entre 6 y 10 números.");
    if (!acepta) return setError("Debes autorizar el tratamiento de datos para consultar.");
    setError(null);
    navigate(`/ciudadano/resultado?${new URLSearchParams({ tipo, valor: v })}`);
  };

  const usarPrueba = (t: TipoBusqueda, v: string) => {
    setTipo(t);
    setValor(v);
    setError(null);
  };

  return (
    <div className="sifca-ui min-h-screen bg-sifca-surface font-sans text-sifca-text antialiased">
      <CitizenHeader>
        <Link to="/" className={btnC.ghostDark}>
          Volver al inicio
        </Link>
      </CitizenHeader>

      <main>
        {/* Encabezado oscuro con la identidad de la landing */}
        <section className="relative isolate overflow-hidden bg-sifca-deep pt-14 pb-40 text-center sm:pt-20">
          <div aria-hidden="true" className="landing-grid absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="absolute top-[-16rem] left-1/2 -z-10 h-[32rem] w-[52rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-sifca-glow/20 blur-3xl"
          />
          <div className={shell}>
            <p className="font-mono text-xs tracking-[0.18em] text-sifca-glow uppercase">
              Consulta ciudadana
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
              Consulta tu comparendo
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sifca-light sm:text-lg">
              Escribe la placa del vehículo o tu número de cédula. Es gratis y no necesitas crear
              una cuenta.
            </p>
          </div>
        </section>

        <div className={`${shell} relative -mt-28 pb-20`}>
          <form
            noValidate
            onSubmit={consultar}
            className="mx-auto max-w-xl rounded-2xl border border-sifca-border bg-white p-5 shadow-2xl shadow-sifca-navy/15 sm:p-8"
          >
            <fieldset>
              <legend className="text-sm font-semibold text-sifca-text">Buscar por</legend>
              <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-sifca-surface p-1">
                {(["placa", "cedula"] as const).map((t) => (
                  <label
                    key={t}
                    className={`cursor-pointer rounded-lg py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sifca-glow ${
                      tipo === t
                        ? "bg-white text-sifca-blue shadow-sm"
                        : "text-sifca-muted hover:text-sifca-blue"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value={t}
                      checked={tipo === t}
                      onChange={() => cambiarTipo(t)}
                      className="sr-only"
                    />
                    {t === "placa" ? "Placa" : "Cédula"}
                  </label>
                ))}
              </div>
            </fieldset>

            <label
              htmlFor={`${id}-valor`}
              className="mt-6 block text-sm font-semibold text-sifca-text"
            >
              {tipo === "placa" ? "Placa del vehículo" : "Número de cédula"}
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl border-2 px-4 transition focus-within:border-sifca-glow ${
                error ? "border-danger" : "border-sifca-border"
              }`}
            >
              <IconSearch className="size-5 shrink-0 text-sifca-muted" />
              <input
                id={`${id}-valor`}
                value={valor}
                onChange={(e) => {
                  setValor(tipo === "placa" ? e.target.value.toUpperCase() : e.target.value);
                  setError(null);
                }}
                inputMode={tipo === "placa" ? "text" : "numeric"}
                autoComplete="off"
                autoCapitalize={tipo === "placa" ? "characters" : "off"}
                maxLength={tipo === "placa" ? 7 : 12}
                placeholder={tipo === "placa" ? "ABC123" : "1037000111"}
                aria-invalid={!!error}
                aria-describedby={`${id}-ayuda`}
                className="w-full bg-transparent py-3.5 font-mono text-xl font-semibold tracking-wider text-sifca-text outline-none placeholder:text-sifca-border"
              />
            </div>
            <p
              id={`${id}-ayuda`}
              role={error ? "alert" : undefined}
              className={`mt-2 text-xs ${error ? "text-status-red" : "text-sifca-muted"}`}
            >
              {error ??
                (tipo === "placa"
                  ? "Sin espacios ni guiones. Carros: ABC123 · Motos: ABC12D."
                  : "Solo números, sin puntos.")}
            </p>

            <label className="mt-6 flex cursor-pointer gap-3 text-xs leading-relaxed text-sifca-muted">
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => {
                  setAcepta(e.target.checked);
                  setError(null);
                }}
                className="mt-0.5 size-4 shrink-0 accent-sifca-blue"
              />
              Autorizo el tratamiento de mis datos personales para esta consulta, de acuerdo con la
              Ley 1581 de 2012.
            </label>

            <button type="submit" className={`${btnC.primary} mt-6 w-full py-3.5 text-base`}>
              Consultar
              <IconArrowRight className="size-4" />
            </button>

            <div className="mt-6 rounded-xl border border-dashed border-sifca-border bg-sifca-surface p-4">
              <p className="text-xs font-semibold text-sifca-text">
                Datos de prueba (demostración)
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pruebas.map((p) => (
                  <button
                    key={p.valor}
                    type="button"
                    onClick={() => usarPrueba(p.tipo, p.valor)}
                    className="rounded-lg border border-sifca-border bg-white px-2.5 py-1.5 text-left text-xs transition hover:border-sifca-glow"
                  >
                    <span className="block font-mono font-semibold text-sifca-text">{p.valor}</span>
                    <span className="block text-[11px] text-sifca-muted">{p.nota}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {beneficios.map((b) => (
              <li key={b.titulo} className="flex gap-3 sm:flex-col sm:items-center sm:text-center">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sifca-light text-sifca-blue">
                  <b.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-sifca-text">{b.titulo}</span>
                  <span className="block text-sm text-sifca-muted">{b.texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
