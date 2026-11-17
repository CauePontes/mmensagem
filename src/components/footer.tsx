import { ArrowUp, Asterisk } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer cream-section">
      <div className="page-width">
        <div className="footer-main"><Asterisk size={35} strokeWidth={1} aria-hidden="true" /><div><p>Feito especialmente para você, <em>Carol.</em></p><span>Porque responder só com um &apos;oi&apos; seria muito sem graça.</span></div><span className="footer-signature">— Cauê</span></div>
        <div className="footer-bottom"><span>UMA CANDIDATURA COM UM POUCO MAIS DE INTENÇÃO.</span><a href="#inicio">Voltar ao começo <ArrowUp size={14} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
