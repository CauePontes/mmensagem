import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Carol, você pediu 500 palavras. | Entre nós",
  description: "Eu achei melhor fazer um site. Uma candidatura de Cauê para Carol, com 500 palavras, interesse genuíno e uma proposta de encontro.",
  applicationName: "Entre nós",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Carol, você pediu 500 palavras.",
    description: "Eu achei melhor fazer um site. Uma candidatura com um pouco mais de intenção.",
    locale: "pt_BR",
    type: "website",
    siteName: "Entre nós",
  },
  twitter: { card: "summary_large_image", title: "Carol, você pediu 500 palavras.", description: "Eu achei melhor fazer um site." },
};

export const viewport: Viewport = {
  themeColor: "#401724",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${editorial.variable} ${sans.variable}`}>{children}</body></html>;
}
