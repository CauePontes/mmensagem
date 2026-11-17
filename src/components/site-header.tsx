"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Asterisk } from "lucide-react";

const links = [
  { id: "candidatura", number: "01", label: "A candidatura" },
  { id: "redacao", number: "02", label: "As 500 palavras" },
  { id: "avaliacao", number: "03", label: "O veredito" },
];

export function SiteHeader() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
    );
    ["inicio", ...links.map((link) => link.id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner page-width">
        <a href="#inicio" className="wordmark" aria-label="Entre nós, voltar ao início">
          <Asterisk aria-hidden="true" size={23} strokeWidth={1.4} />
          <span>entre nós<span className="wordmark-dot">.</span></span>
        </a>
        <nav aria-label="Seções da candidatura" className="desktop-nav">
          {links.map((link) => (
            <a href={`#${link.id}`} key={link.id} aria-current={active === link.id ? "location" : undefined}>
              <span>{link.number}</span> {link.label}
            </a>
          ))}
        </nav>
        <a href="#avaliacao" className="header-application">
          <span>INSCRIÇÃO</span> #0001 <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
