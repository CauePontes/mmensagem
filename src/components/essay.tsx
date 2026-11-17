import { ArrowDown, Check, Feather } from "lucide-react";
import { essayParagraphs, essayWordCount } from "@/lib/letter";
import { Reveal } from "@/components/reveal";

export function Essay() {
  return (
    <section className="essay-section cream-section" id="redacao" aria-labelledby="essay-title">
      <div className="page-width">
        <Reveal><div className="section-kicker"><span>02 / A REDAÇÃO</span><span>ARGUMENTOS POR ESCRITO <Feather size={16} aria-hidden="true" /></span></div></Reveal>
        <Reveal className="essay-heading">
          <h2 id="essay-title">500 palavras para <br />tentar <em>te convencer.</em></h2>
          <div className="word-counter"><span><Check size={14} aria-hidden="true" /> REQUISITO CUMPRIDO</span><p><strong>{essayWordCount}</strong><span> / 500 palavras</span></p><div className="word-counter-line" /></div>
        </Reveal>
        <div className="letter-layout">
          <aside className="letter-sidebar" aria-label="Sobre a carta"><span className="vertical-label">UMA CARTA. UMA CHANCE.</span><span className="sidebar-number">500</span><span>palavras,<br />nenhum Ctrl C<br />de cantada pronta.</span></aside>
          <article className="essay-paper" aria-label="Redação de 500 palavras">
            <div className="paper-heading"><span>CORRESPONDÊNCIA PARTICULAR</span><span>CAUÊ → CAROL</span></div>
            <div className="essay-text" data-testid="essay-content">
              {essayParagraphs.map((paragraph, index) => <Reveal key={index}><p>{paragraph}</p></Reveal>)}
            </div>
            <div className="paper-signature"><span>Com a devida intenção,</span><p>Cauê<span className="signature-period">.</span></p></div>
            <div className="paper-footer"><span>FIM DOS ARGUMENTOS POR ESCRITO.</span><span>CONTINUA, SE VOCÊ QUISER.</span></div>
          </article>
          <div className="letter-side-note" aria-hidden="true"><span>p.s.</span> os melhores<br />argumentos<br />ficam para<br />o encontro.</div>
        </div>
        <Reveal className="essay-bottom"><span>O texto termina aqui. A história, quem sabe, começa agora.</span><a href="#avaliacao" className="text-link">Vamos ao veredito <ArrowDown size={15} aria-hidden="true" /></a></Reveal>
      </div>
    </section>
  );
}
