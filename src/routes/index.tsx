import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Megaphone, Share2, MonitorSmartphone, Cpu, Compass, Puzzle,
  ArrowRight, Instagram, MessageCircle, Mail, Menu, X, User,
} from "lucide-react";
import logo from "@/assets/redwave-logo.jpeg.asset.json";
import { WaveBackground } from "@/components/site/WaveBackground";
import { ContactForm } from "@/components/site/ContactForm";
import { site, whatsappLink, navLinks } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RedeWave — Marketing digital, tecnologia e soluções inovadoras" },
      { name: "description", content: "Agência de marketing de influência, redes sociais, sites e automação. Sua visão. Nossa tecnologia." },
      { property: "og:title", content: "RedeWave — Marketing digital e tecnologia" },
      { property: "og:description", content: "Transformamos ideias em soluções digitais para empresas e criadores de conteúdo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Megaphone, title: "Marketing de Influência", text: "Conectamos marcas e criadores de conteúdo para desenvolver campanhas estratégicas, ampliar o alcance e gerar resultados." },
  { icon: Share2, title: "Gestão de Redes Sociais", text: "Desenvolvemos estratégias de conteúdo para fortalecer marcas, aumentar o engajamento e construir uma presença digital profissional." },
  { icon: MonitorSmartphone, title: "Desenvolvimento de Sites", text: "Criamos sites institucionais e páginas comerciais modernas, rápidas, responsivas e desenvolvidas para transformar visitantes em clientes." },
  { icon: Cpu, title: "Tecnologia e Automação", text: "Utilizamos tecnologia para otimizar processos, automatizar tarefas e desenvolver soluções digitais que tornam os negócios mais eficientes." },
  { icon: Compass, title: "Estratégia Digital", text: "Planejamos ações personalizadas para posicionar empresas no ambiente digital, fortalecer sua identidade e alcançar seus objetivos." },
  { icon: Puzzle, title: "Soluções Personalizadas", text: "Analisamos as necessidades de cada cliente para encontrar soluções criativas e tecnológicas adequadas ao seu negócio." },
];

const principles = [
  "Tecnologia aplicada a resultados reais.",
  "Estratégias personalizadas para cada negócio.",
  "Criatividade aliada à inovação.",
  "Comunicação transparente e atendimento próximo.",
  "Soluções desenvolvidas para acompanhar o crescimento dos clientes.",
];

const steps = [
  { n: "01", t: "Entendimento", d: "Conhecemos o negócio, os objetivos e os desafios do cliente." },
  { n: "02", t: "Estratégia", d: "Planejamos a melhor solução de acordo com as necessidades identificadas." },
  { n: "03", t: "Desenvolvimento", d: "Transformamos o planejamento em uma solução prática, funcional e profissional." },
  { n: "04", t: "Evolução", d: "Acompanhamos o projeto e identificamos oportunidades de melhoria e crescimento." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#inicio" className={`flex items-center gap-2 ${className}`} aria-label="RedeWaves, início">
      <img src={logo.url} alt="" className="h-9 w-9 rounded object-cover object-[50%_42%] scale-150" width={36} height={36} />
      <span className="font-display text-lg font-bold tracking-wide">
        <span className="text-primary">Rede</span>Waves
      </span>
    </a>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="reveal mb-14 max-w-2xl">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">{l.label}</a>
            ))}
          </nav>
          <a href="#contato" className="hidden rounded-md border border-primary/50 px-4 py-2 text-sm transition hover:bg-primary hover:text-primary-foreground md:inline-flex">
            Fale conosco
          </a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-foreground">{l.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="inicio" className="relative flex min-h-screen items-center pt-16">
          <WaveBackground />
          <div className="relative mx-auto max-w-6xl px-5 py-24">
            <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Marketing · Tecnologia · Inovação
            </p>
            <h1 className="reveal text-5xl font-extrabold leading-[1.05] sm:text-7xl lg:text-8xl">
              <span className="text-gradient-red">Rede</span>Waves
            </h1>
            <p className="reveal mt-6 max-w-3xl font-display text-xl font-medium leading-snug sm:text-2xl">
              Sua visão. Nossa tecnologia.<br />
              <span className="text-muted-foreground">Seus problemas, nossas soluções.</span>
            </p>
            <p className="reveal mt-6 max-w-xl text-muted-foreground">
              Transformamos ideias em soluções digitais, conectando tecnologia, estratégia e criatividade para impulsionar negócios.
            </p>
            <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#solucoes" className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-primary-glow hover:glow">
                Conheça nossas soluções <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#contato" className="inline-flex items-center justify-center rounded-md border border-border px-7 py-3.5 font-medium transition hover:border-primary hover:text-primary">
                Fale com a nossa equipe
              </a>
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section id="solucoes" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-28">
          <SectionHead kicker="Nossas soluções" title="O que fazemos para o seu negócio crescer no digital." />
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="reveal group relative bg-background p-8 transition hover:bg-card">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                <Icon className="mb-6 h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Diferenciais */}
        <section id="diferenciais" className="relative scroll-mt-16 overflow-hidden border-y border-border bg-card/40 py-28">
          <div aria-hidden className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_1.3fr]">
            <div className="reveal">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">Por que a RedeWaves?</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Princípios que guiam cada projeto.</h2>
            </div>
            <ol className="divide-y divide-border">
              {principles.map((p, i) => (
                <li key={p} className="reveal flex items-baseline gap-6 py-5">
                  <span className="font-display text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg sm:text-xl">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Processo */}
        <section id="processo" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-28">
          <SectionHead kicker="Como trabalhamos" title="Quatro etapas, do problema à solução." />
          <div className="relative grid gap-10 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-primary via-primary/40 to-transparent md:block" />
            {steps.map((s) => (
              <div key={s.n} className="reveal relative">
                <span className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background font-display text-xs text-primary glow">
                  {s.n}
                </span>
                <h3 className="mb-2 text-lg font-bold">{s.t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="scroll-mt-16 border-t border-border py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2">
            <div className="reveal">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">Sobre a RedeWaves</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Mais do que presença digital. <span className="text-gradient-red">Soluções que conectam ideias e resultados.</span>
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                A RedeWaves nasceu da união entre visão empreendedora, tecnologia e criatividade. Nosso propósito é ajudar empresas e criadores a explorarem novas oportunidades no ambiente digital, desenvolvendo soluções que conectam pessoas, marcas e negócios.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {["Pedro", "Osvaldo"].map((name) => (
                <figure key={name} className="reveal overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-accent to-background">
                    <User className="h-16 w-16 text-muted-foreground/40" strokeWidth={1} aria-hidden />
                  </div>
                  <figcaption className="p-5">
                    <p className="font-display font-bold">{name}</p>
                    <p className="text-xs uppercase tracking-wider text-primary">Fundador</p>
                    <p className="mt-2 text-sm text-muted-foreground">Apresentação profissional em breve.</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="relative scroll-mt-16 overflow-hidden border-t border-border py-28">
          <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="reveal">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">Contato</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">Sua próxima ideia começa aqui.</h2>
              <p className="mt-6 text-muted-foreground">
                Conte para nós o que você deseja construir. Vamos conversar sobre como a RedeWaves pode ajudar.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-3 font-medium text-background transition hover:opacity-90">
                  <MessageCircle className="h-5 w-5" /> Conversar no WhatsApp
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-medium transition hover:border-primary hover:text-primary">
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              </div>
            </div>
            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.slogan}</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Navegação</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:text-primary">{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Contato</p>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" /> {site.email}</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><MessageCircle className="h-4 w-4" /> WhatsApp</a></li>
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {year} RedeWaves. Todos os direitos reservados.
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-background shadow-lg transition hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
