import { Application } from "@/components/application";
import { Essay } from "@/components/essay";
import { Evaluation } from "@/components/evaluation";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <Experience>
      <a className="skip-link" href="#candidatura">Pular para a candidatura</a>
      <SiteHeader />
      <main><Hero /><Application /><Essay /><Evaluation /></main>
      <Footer />
    </Experience>
  );
}
