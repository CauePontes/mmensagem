import { ImageResponse } from "next/og";

export const alt = "Carol, você pediu 500 palavras. Eu achei melhor fazer um site.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", background: "#401724", color: "#f4ecdf" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}><span>ENTRE NÓS.</span><span>CANDIDATURA Nº 0001</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "serif" }}><span style={{ fontSize: 82, lineHeight: 1.1 }}>Carol, você pediu</span><span style={{ fontSize: 100, color: "#e2b5b5", lineHeight: 1.15 }}>500 palavras.</span><span style={{ marginTop: 24, fontSize: 38 }}>Eu achei melhor fazer um site.</span></div>
      <div style={{ display: "flex", fontSize: 18, letterSpacing: 3 }}>DE CAUÊ, ESPECIALMENTE PARA VOCÊ.</div>
    </div>,
    size,
  );
}
