import { useEffect } from "react";
import { Audiences } from "../components/landing/Audiences";
import { Faq } from "../components/landing/Faq";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingNav } from "../components/landing/LandingNav";
import { Transparency } from "../components/landing/Transparency";
import { useReveal } from "../components/landing/ui";

export default function Landing() {
  useReveal();

  useEffect(() => {
    const previous = document.title;
    document.title = "SIFCA · Fotodetección de infracciones semafóricas · Apartadó";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="landing min-h-screen overflow-x-clip bg-white font-sans text-sifca-text antialiased">
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-lg bg-white px-4 py-2 text-sm font-semibold text-sifca-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <LandingNav />
      <main id="contenido">
        <Hero />
        <HowItWorks />
        <Transparency />
        <Audiences />
        <Faq />
      </main>
      <LandingFooter />
    </div>
  );
}
