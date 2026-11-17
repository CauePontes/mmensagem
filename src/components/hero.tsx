import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Envelope } from "@/components/envelope";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section className="hero wine-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-main page-width">
        <div className="hero-copy">
          <Reveal><p className="eyebrow hero-eyebrow"><span className="status-dot" /> UMA RESPOSTA AO SEU STORY...</p></Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title">Carol, você pediu <span className="highlight-number">500<svg viewBox="0 0 300 22" fill="none" aria-hidden="true"><path d="M5 13C75 0 190 0 294 7M25 20c92-12 176-12 248-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span> palavras.</h1>
          </Reveal>
          <Reveal delay={0.38}><p className="hero-answer">Eu achei melhor <br />fazer <em>um site.</em><ArrowDownRight className="hero-drawn-arrow" strokeWidth={1} aria-hidden="true" /></p></Reveal>
          <Reveal delay={0.5}>
            <p className="hero-description">Porque algumas oportunidades merecem uma apresentação um pouquinho mais elaborada.</p>
            <a href="#candidatura" className="button button-cream">Analisar candidatura <ArrowUpRight size={19} aria-hidden="true" /></a>
            <span className="hero-button-note">Sem anexo. Sem PowerPoint. Com intenção.</span>
          </Reveal>
        </div>
        <Reveal className="hero-art" delay={0.25}><Envelope /></Reveal>
      </div>
      <div className="hero-bottom page-width">
        <span>DE CAUÊ <span className="metadata-line" /> PARA CAROL</span>
        <a href="#candidatura">A história continua aqui <ArrowDown size={14} aria-hidden="true" /></a>
        <span className="hero-bottom-right">INTERESSE GENUÍNO, DESIGN TAMBÉM.</span>
      </div>
    </section>
  );
}
