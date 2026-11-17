import Link from "next/link";

export default function NotFound() {
  return <main className="not-found wine-section"><span className="eyebrow">CORRESPONDÊNCIA NÃO ENCONTRADA · 404</span><h1>Essa carta<br /><em>se perdeu.</em></h1><p>Mas a candidatura continua no lugar certo.</p><Link href="/" className="button button-cream">Voltar para a candidatura ↗</Link></main>;
}
