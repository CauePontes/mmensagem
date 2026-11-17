"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, CheckCheck, Coffee, Copy, FileCheck2, MessageCircle, Sparkles, X } from "lucide-react";
import { decisionMessage } from "@/lib/letter";
import { Reveal } from "@/components/reveal";

type Decision = "approved" | "appeal" | null;
type CopyState = "idle" | "copied" | "manual";

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 46 }, (_, index) => (
        <span key={index} style={{
          left: `${(index * 37) % 100}%`,
          backgroundColor: ["#e2b9b4", "#f7efdf", "#b98763", "#b8657d", "#d4ba84"][index % 5],
          animationDelay: `${(index % 9) * 0.065}s`,
          animationDuration: `${2.2 + (index % 5) * 0.23}s`,
          width: index % 3 === 0 ? 6 : 9,
          borderRadius: index % 3 === 0 ? "50%" : "1px",
          transform: `rotate(${index * 29}deg)`,
        }} />
      ))}
    </div>
  );
}

export function Evaluation() {
  const [decision, setDecision] = useState<Decision>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!decision) {
      if (dialog.open) {
        dialog.close();
        returnFocusRef.current?.focus({ preventScroll: true });
      }
      return;
    }
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [decision]);

  function openDecision(value: Exclude<Decision, null>, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setCopyState("idle");
    setDecision(value);
  }

  async function copyDecision() {
    try {
      await navigator.clipboard.writeText(decisionMessage);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
  }

  return (
    <>
      <section className="evaluation-section wine-section" id="avaliacao" aria-labelledby="evaluation-title">
        <div className="page-width">
          <Reveal><div className="section-kicker"><span>03 / O VEREDITO</span><span>USO EXCLUSIVO DA AVALIADORA <FileCheck2 size={16} aria-hidden="true" /></span></div></Reveal>
          <div className="evaluation-grid">
            <Reveal className="evaluation-copy"><span className="eyebrow evaluation-eyebrow">CANDIDATURA Nº 0001 · ETAPA FINAL</span><h2 id="evaluation-title">Agora a decisão <br />está nas <br /><em>suas mãos.</em></h2><p>Depois dessa dedicação toda, acho justo pelo menos uma avaliação da banca examinadora.</p></Reveal>
            <Reveal className="verdict-card" delay={0.12}>
              <div className="verdict-card-heading"><span>PARECER DA BANCA</span><span className="verdict-dot" /></div>
              <div className="verdict-icon"><Coffee size={36} strokeWidth={1.1} aria-hidden="true" /></div>
              <p className="verdict-question">Nos vemos na<br /><em>próxima etapa?</em></p>
              <p className="verdict-caption">Prometo que o encontro não<br />tem limite de palavras.</p>
              <button type="button" className="button button-cream approve-button" onClick={(event) => openDecision("approved", event.currentTarget)}>Candidatura aprovada <ArrowUpRight size={19} aria-hidden="true" /></button>
              <button type="button" className="appeal-button" onClick={(event) => openDecision("appeal", event.currentTarget)}>Preciso de mais argumentos <MessageCircle size={15} aria-hidden="true" /></button>
              <div className="verdict-footnote"><Check size={13} aria-hidden="true" /><span>A decisão é sua. O interesse é meu.</span></div>
            </Reveal>
          </div>
          <div className="evaluation-footer"><span>O PRÓXIMO CAPÍTULO PODE SER FORA DESTA TELA.</span><Sparkles size={17} strokeWidth={1.1} aria-hidden="true" /></div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="decision-dialog"
        aria-labelledby="decision-title"
        aria-describedby="decision-description"
        onCancel={() => setDecision(null)}
        onClose={() => {
          setDecision(null);
          returnFocusRef.current?.focus({ preventScroll: true });
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), textarea, a[href], [tabindex="0"]');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setDecision(null);
        }}
      >
        {decision === "approved" && !reducedMotion && <Confetti />}
        <div className="dialog-content">
          <button type="button" ref={closeRef} className="dialog-close" aria-label="Fechar avaliação" onClick={() => setDecision(null)}><X size={20} aria-hidden="true" /></button>
          <span className="eyebrow dialog-eyebrow">PARECER OFICIAL · Nº 0001</span>
          <div className={`dialog-icon ${decision === "approved" ? "approved-icon" : ""}`}>{decision === "approved" ? <CheckCheck size={32} strokeWidth={1.3} aria-hidden="true" /> : <MessageCircle size={30} strokeWidth={1.3} aria-hidden="true" />}</div>
          <h2 id="decision-title">{decision === "approved" ? <>Aprovado para <br />a <em>próxima etapa.</em></> : <>Recurso <br /><em>solicitado!</em></>}</h2>
          <p id="decision-description">{decision === "approved" ? "Parabéns! Você acaba de desbloquear uma entrevista presencial com direito a boa conversa, risadas e, quem sabe, uma sobremesa." : "Prometo que pessoalmente sou mais interessante do que uma redação de 500 palavras. Que tal uma entrevista para tirar a dúvida?"}</p>
          {decision === "approved" ? (
            <>
              <div className="decision-message"><span>PARA LEVAR AO DIRECT</span><p>{decisionMessage}</p></div>
              <button type="button" className="button button-wine dialog-action" onClick={copyDecision}>{copyState === "copied" ? "Decisão copiada!" : "Copiar minha decisão"}{copyState === "copied" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button>
              <p className="copy-status" role="status" aria-live="polite">{copyState === "copied" ? "Pronto! Agora é só colar na nossa conversa." : copyState === "manual" ? "A cópia automática não está disponível. Selecione e copie a mensagem abaixo." : "Você copia e envia quando quiser. Sem pressão."}</p>
              {copyState === "manual" && <textarea className="manual-copy" aria-label="Mensagem para copiar manualmente" readOnly value={decisionMessage} onFocus={(event) => event.currentTarget.select()} />}
            </>
          ) : <button type="button" className="button button-wine dialog-action" onClick={() => setDecision(null)}>Reconsiderar decisão <ArrowUpRight size={18} aria-hidden="true" /></button>}
          <span className="dialog-signature">Com interesse, Cauê.</span>
        </div>
      </dialog>
    </>
  );
}
