import { ArrowDownRight, ArrowRight, Check, FileText } from "lucide-react";
import { Reveal } from "@/components/reveal";

const details = [
  { label: "Candidato", value: "Cauê", number: "01" },
  { label: "Vaga pretendida", value: "Um encontro com Carol", number: "02" },
  { label: "Modalidade", value: "Interesse genuíno", number: "03" },
  { label: "Requisito", value: "Redação de 500 palavras", number: "04" },
];

export function Application() {
  return (
    <section className="application-section cream-section" id="candidatura" aria-labelledby="application-title">
      <div className="page-width">
        <Reveal><div className="section-kicker"><span>01 / A CANDIDATURA</span><span>FORMALIDADES À PARTE <ArrowDownRight size={16} aria-hidden="true" /></span></div></Reveal>
        <div className="application-grid">
          <Reveal className="application-intro">
            <h2 id="application-title">Prezada <br /><em>avaliadora,</em></h2>
            <p>Em atendimento ao edital publicado nos seus stories, apresento minha candidatura.</p>
            <span className="margin-note">Levei o requisito a sério.<br />Talvez até um pouco demais.</span>
          </Reveal>
          <Reveal className="application-form" delay={0.12}>
            <div className="form-heading"><FileText size={19} strokeWidth={1.4} aria-hidden="true" /><span>FICHA DE INSCRIÇÃO</span><span>Nº 0001</span></div>
            <dl className="application-details">
              {details.map(({ label, value, number }) => (
                <div className="detail-row" key={label}><dt><span>{number}</span>{label}</dt><dd>{value}</dd></div>
              ))}
              <div className="detail-row status-row"><dt><span>05</span>Situação</dt><dd><span className="pending-status"><span className="status-dot" />Aguardando avaliação</span></dd></div>
            </dl>
            <div className="form-footer"><span><Check size={14} aria-hidden="true" /> Intenções devidamente declaradas.</span><a href="#redacao" aria-label="Ir para a redação"><ArrowRight size={19} aria-hidden="true" /></a></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
