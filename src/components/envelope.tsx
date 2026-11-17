import { ArrowUpRight, Asterisk, Heart, PenLine } from "lucide-react";

export function Envelope() {
  return (
    <div className="correspondence" aria-hidden="true">
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <Asterisk className="envelope-spark spark-one" size={31} strokeWidth={1} />
      <Asterisk className="envelope-spark spark-two" size={17} strokeWidth={1} />
      <div className="floating-note">
        <span className="note-pin" />
        <span className="eyebrow">REQUISITO DO EDITAL</span>
        <p>“Quero uma redação<br />de 500 palavras.”</p>
        <span className="note-source">— Carol, nos stories <ArrowUpRight size={12} /></span>
      </div>
      <div className="envelope-composition">
        <div className="letter-peek">
          <div className="letter-peek-header"><PenLine size={16} strokeWidth={1.4} /><span>UMA BOA PRIMEIRA IMPRESSÃO</span></div>
          <p>Prezada Carol,</p>
          <div className="handwriting-line long" /><div className="handwriting-line" /><div className="handwriting-line medium" />
          <span className="peek-signature">Com interesse, Cauê.</span>
        </div>
        <div className="envelope-back" />
        <div className="envelope-front" />
        <div className="envelope-fold" />
        <div className="wax-seal"><Heart size={27} strokeWidth={1.1} /><span>C & C</span></div>
        <div className="envelope-to"><span>PARA ENTREGA EXCLUSIVA A</span><strong>Carol.</strong></div>
      </div>
      <div className="official-stamp"><span>CANDIDATURA</span><Asterisk size={24} strokeWidth={1} /><span>OFICIAL · Nº 0001</span></div>
      <span className="envelope-caption">Uma intenção boa. Um pouco de criatividade.</span>
    </div>
  );
}
