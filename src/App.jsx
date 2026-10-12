import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars, Environment } from "@react-three/drei";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Code2, Command,
  Github, Globe2, Layers3, Linkedin, Mail, Menu, MousePointer2, Sparkles as SparklesIcon, X
} from "lucide-react";
import * as THREE from "three";

const projects = [
  {
    number: "01",
    title: "AURA / Intelligence",
    type: "AI PRODUCT · INTERFACE DESIGN",
    description: "A calmer, more human way to work with artificial intelligence. A conversational workspace concept.",
    tags: ["React", "AI UX", "Motion"],
    className: "aura",
    link: "https://github.com/Krrish19912"
  },
  {
    number: "02",
    title: "NOVA / Commerce",
    type: "DIGITAL COMMERCE · 3D",
    description: "A product playground that turns browsing into an interactive, tactile experience.",
    tags: ["Three.js", "WebGL", "E-commerce"],
    className: "nova",
    link: "https://github.com/Krrish19912"
  },
  {
    number: "03",
    title: "ORBIT / Analytics",
    type: "DATA VISUALIZATION · SAAS",
    description: "A high-signal command center that makes complex product data feel beautifully obvious.",
    tags: ["React", "Data viz", "Design systems"],
    className: "orbit",
    link: "https://github.com/Krrish19912"
  }
];

const capabilities = [
  { n: "01", title: "Creative development", text: "Turning bold concepts into thoughtful, production-minded interfaces.", icon: Code2 },
  { n: "02", title: "3D & interaction", text: "Adding depth, personality, and a little bit of magic to the browser.", icon: Layers3 },
  { n: "03", title: "Interface systems", text: "Designing coherent visual languages that feel as good as they work.", icon: Command }
];

function Sculpture({ reducedMotion }) {
  const group = useRef();
  const ring = useRef();
  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.22, 3, delta);
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -state.pointer.x * 0.12, 3, delta);
    }
    if (ring.current) ring.current.rotation.z -= delta * 0.12;
  });
  return (
    <group>
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={reducedMotion ? 0 : 0.14} floatIntensity={reducedMotion ? 0 : 0.34}>
        <group ref={group} scale={1.03}>
          <mesh>
            <icosahedronGeometry args={[1.04, 3]} />
            <MeshDistortMaterial color="#d9ff43" roughness={0.16} metalness={0.68} distort={0.24} speed={reducedMotion ? 0 : 1.8} envMapIntensity={1.4} />
          </mesh>
          <mesh scale={1.055}>
            <icosahedronGeometry args={[1.04, 2]} />
            <meshBasicMaterial color="#e7ff8e" wireframe transparent opacity={0.14} />
          </mesh>
          <mesh scale={0.78} rotation={[0.4, 0.2, 0]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
          </mesh>
        </group>
      </Float>
      <mesh ref={ring} rotation={[1.12, 0.25, -0.34]} scale={[1.56, 1.56, 1.56]}>
        <torusGeometry args={[1, 0.006, 8, 160]} />
        <meshBasicMaterial color="#d9ff43" transparent opacity={0.76} />
      </mesh>
      <mesh rotation={[0.5, -0.5, 0.3]} scale={[1.8, 1.8, 1.8]}>
        <torusGeometry args={[1, 0.002, 8, 160]} />
        <meshBasicMaterial color="#72767b" transparent opacity={0.65} />
      </mesh>
      <Sparkles count={44} scale={4.4} size={2.1} speed={reducedMotion ? 0 : 0.23} color="#e8ff97" opacity={0.76} />
    </group>
  );
}

function HeroScene() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="scene-wrap" aria-label="Interactive 3D abstract sculpture">
      <div className="scene-backdrop" />
      <div className="scene-hud scene-hud-top"><span className="hud-dot" /> LIVE RENDER <span className="hud-divider">/</span> WEBGL</div>
      <div className="scene-hud scene-hud-bottom"><span>OBJ_001</span><span>ROTATE TO EXPLORE <MousePointer2 size={12} /></span></div>
      <div className="scene-crosshair crosshair-one" />
      <div className="scene-crosshair crosshair-two" />
      <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 4]} intensity={2.8} color="#f5ffce" />
        <pointLight position={[-3, -2, 1]} intensity={17} color="#7386ff" />
        <pointLight position={[2, -1, 3]} intensity={7} color="#d9ff43" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Sculpture reducedMotion={Boolean(reducedMotion)} />
          <Stars radius={9} depth={2} count={170} factor={1.8} saturation={0} fade speed={reducedMotion ? 0 : 0.08} />
        </Suspense>
      </Canvas>
      <div className="scene-caption"><span>FORM STUDY / 2025</span><span>001 — 003</span></div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({ kind }) {
  if (kind === "aura") {
    return (
      <div className="project-visual aura-visual">
        <div className="aura-orb aura-orb-one" /><div className="aura-orb aura-orb-two" />
        <div className="aura-window">
          <div className="window-dots"><i /><i /><i /><span> aura.space</span></div>
          <div className="aura-greet">Good morning, K.</div>
          <div className="aura-question">What are we <em>imagining</em> today?</div>
          <div className="aura-input">Ask anything<span>↗</span></div>
          <div className="aura-chips"><span>✳ Brainstorm</span><span>⌘ Write</span><span>◉ Explore</span></div>
        </div>
        <span className="visual-index">A / 001</span>
      </div>
    );
  }
  if (kind === "nova") {
    return (
      <div className="project-visual nova-visual">
        <div className="nova-grid" />
        <div className="nova-label">OBJECTS FOR EVERY DAY</div>
        <div className="nova-bigtype">LESS,<br /><i>BUT BETTER.</i></div>
        <div className="nova-product"><div className="nova-product-top" /><div className="nova-product-body" /><div className="nova-product-base" /></div>
        <div className="nova-bottom"><span>01 / STUDIO SERIES</span><span>DISCOVER ↗</span></div>
        <div className="nova-ring" />
      </div>
    );
  }
  return (
    <div className="project-visual orbit-visual">
      <div className="orbit-top"><span>ORBIT / OVERVIEW</span><span className="orbit-live">● ALL SYSTEMS NORMAL</span></div>
      <div className="orbit-headline">Your universe,<br /><span>in focus.</span></div>
      <div className="orbit-stats">
        <div><small>ACTIVE USERS</small><strong>24.8<span>k</span></strong><i>↗ 18.6%</i></div>
        <div><small>CONVERSION</small><strong>8.42<span>%</span></strong><i>↗ 4.2%</i></div>
      </div>
      <div className="orbit-chart"><div className="chart-grid" />{[28,42,35,56,49,63,46,76,59,88,70,96,75,108,92,122,104,130].map((h, i) => <span key={i} style={{ height: h + "px", opacity: 0.34 + i * 0.035 }} />)}</div>
      <div className="orbit-footer"><span>LAST 30 DAYS</span><span>VIEW REPORT ↗</span></div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className={"project-card " + project.className} delay={index * 0.08}>
      <a className="project-link" href={project.link} target="_blank" rel="noreferrer" aria-label={"View " + project.title + " on GitHub"}>
        <ProjectVisual kind={project.className} />
        <div className="project-meta">
          <div><span className="eyebrow">PROJECT / {project.number}</span><h3>{project.title}</h3></div>
          <span className="project-arrow"><ArrowUpRight size={20} /></span>
        </div>
        <div className="project-type">{project.type}</div>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </a>
    </Reveal>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Work", "#work"], ["About", "#about"], ["Process", "#process"]];
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Krrish home"><span className="brand-mark">K.</span><span className="brand-name">KR<span>R</span>ISH<small>CREATIVE DEVELOPER</small></span></a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  );
}

function App() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 });
  const rotate = useTransform(progress, [0, 1], [0, 360]);
  const [copied, setCopied] = useState(false);
  const email = "hello@krrish.dev";
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + email;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell" ref={pageRef} id="top">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <Header />
      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="availability-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="availability-year">— 2026</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
              I BUILD<br />DIGITAL <span className="outline-word">WORLDS<span className="title-star">✳</span></span><span className="hero-period">.</span>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.34 }}>
              Creative developer at the intersection of <span>design, code & motion.</span> I turn ambitious ideas into digital experiences that feel a little like the future.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.48 }}>
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href="#about">Get to know me <ArrowRight size={16} /></a>
            </motion.div>
            <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <span><span className="footnote-line" /> SCROLL TO EXPLORE</span><span className="hero-coordinates">DESIGNING FROM EVERYWHERE</span>
            </motion.div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <HeroScene />
            <motion.div className="floating-note note-top" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}>
              <span className="note-icon"><Asterisk size={17} /></span><div><small>CRAFTED WITH</small><strong>Curiosity + code</strong></div>
            </motion.div>
            <motion.div className="floating-note note-bottom" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}>
              <span className="note-3d">3D</span><div><small>THE WEB IS A</small><strong>Creative canvas.</strong></div>
            </motion.div>
            <motion.div className="vertical-label" style={{ rotate }}>MADE OF IMAGINATION · BUILT WITH INTENTION · </motion.div>
          </motion.div>
          <div className="hero-index"><span>001</span><span className="index-line" /><span>004</span></div>
        </section>

        <div className="ticker" aria-label="Creative developer, interactive experiences, digital craft">
          <div className="ticker-track"><span>CREATIVE DEVELOPMENT</span><Asterisk /><span>INTERACTIVE EXPERIENCES</span><Asterisk /><span>DIGITAL CRAFT</span><Asterisk /><span>CREATIVE DEVELOPMENT</span><Asterisk /><span>INTERACTIVE EXPERIENCES</span><Asterisk /><span>DIGITAL CRAFT</span><Asterisk /></div>
        </div>

        <section className="work-section section-shell section-spacing" id="work">
          <Reveal className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-mark">✳</span> SELECTED WORK / 2024—26</span><h2>Curiosity,<br /><span>made visible.</span></h2></div>
            <p>A collection of experiments and ideas where thoughtful design meets playful engineering. Each one starts with a question.</p>
          </Reveal>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
          <Reveal className="all-work-link"><span>MORE EXPERIMENTS ARE ALWAYS IN PROGRESS</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={17} /></a></Reveal>
        </section>

        <section className="manifesto-section" id="about">
          <div className="manifesto-inner section-shell">
            <Reveal className="manifesto-intro"><span className="eyebrow"><span className="eyebrow-mark">✳</span> A LITTLE ABOUT ME</span><span className="manifesto-side-note">NOT JUST PIXELS.<br />NOT JUST CODE.</span></Reveal>
            <Reveal className="manifesto-statement"><h2>The internet is more than a place to <span className="muted-word">visit.</span> It’s a place to <span className="highlight-word">feel something.</span></h2></Reveal>
            <div className="manifesto-bottom">
              <Reveal><div className="profile-symbol"><span>K</span><Asterisk className="profile-spark" size={24} /><div className="profile-ring" /></div></Reveal>
              <Reveal className="manifesto-bio"><p>I’m Krrish — a developer with a designer’s eye and an experimenter’s mindset. I love building the kind of digital things that make people stop scrolling, lean in, and explore.</p><p>My sweet spot is the in-between: where a strong idea meets precise code, where interfaces become experiences, and where a little weirdness makes the work memorable.</p><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer" className="text-link">A little more about what I build <ArrowUpRight size={15} /></a></Reveal>
            </div>
          </div>
        </section>

        <section className="capabilities-section section-shell section-spacing" id="capabilities">
          <Reveal className="section-heading compact-heading">
            <div><span className="eyebrow"><span className="eyebrow-mark">✳</span> WHAT I BRING</span><h2>Built for the<br /><span>in-between.</span></h2></div>
            <p>Equal parts systems thinking and creative instinct. I like the technical challenge and the tiny details that make an experience click.</p>
          </Reveal>
          <div className="capabilities-list">{capabilities.map(({ n, title, text, icon: Icon }, index) => <Reveal key={n} delay={index * 0.07} className="capability-row"><span className="capability-number">{n}</span><div className="capability-icon"><Icon size={22} strokeWidth={1.5} /></div><div className="capability-copy"><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="capability-arrow" size={20} /></Reveal>)}</div>
          <Reveal className="toolbelt"><span className="eyebrow">CURRENT TOOLBELT</span><div className="tool-pills"><span>React</span><span>Three.js</span><span>JavaScript</span><span>Motion</span><span>CSS</span><span>Figma</span><span>Creative coding</span></div></Reveal>
        </section>

        <section className="process-section" id="process">
          <div className="section-shell process-inner">
            <Reveal className="process-heading"><span className="eyebrow"><span className="eyebrow-mark">✳</span> HOW I THINK</span><h2>Good work has<br /><span>a point of view.</span></h2><p>From first spark to final interaction, every detail should have a reason to exist.</p></Reveal>
            <div className="process-steps">
              {[["01", "Find the signal", "Start with the why. Get curious, ask better questions, find the idea worth amplifying."], ["02", "Make it tangible", "Prototype early. Build the weird version. Learn what the idea feels like, not just how it looks."], ["03", "Sweat the details", "Tune every transition, state, and little interaction until the whole thing feels inevitable."]].map(([n, title, copy], i) => <Reveal key={n} delay={i * 0.08} className="process-step"><span className="process-number">{n}</span><div className="process-rule" /><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <Reveal className="contact-top"><span className="eyebrow"><span className="eyebrow-mark">✳</span> HAVE A GOOD ONE IN MIND?</span><span className="contact-coordinate">LET’S MAKE IT REAL — ↘</span></Reveal>
          <Reveal className="contact-main"><h2>LET’S MAKE<br /><span>SOMETHING</span><br />MATTER<span className="contact-dot">.</span></h2><div className="contact-orbit"><div className="contact-orbit-ring ring-a" /><div className="contact-orbit-ring ring-b" /><div className="contact-orbit-core"><ArrowUpRight size={33} /></div></div></Reveal>
          <div className="contact-bottom">
            <Reveal><p>Have a project, a wild idea, or just want to talk about the future of the web? My inbox is open.</p><button className="button button-primary contact-button" onClick={copyEmail}><Mail size={17} /> {copied ? "Email copied!" : "Copy my email"} <ArrowUpRight size={16} /></button><span className="email-address">{email}</span></Reveal>
            <Reveal className="social-block"><span className="eyebrow">FIND ME ELSEWHERE</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href="mailto:hello@krrish.dev"><Globe2 size={17} /> Say hello <ArrowUpRight size={14} /></a></Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell"><a href="#top" className="footer-brand"><span className="brand-mark">K.</span><span>MADE WITH INTENTION <span className="footer-heart">✳</span></span></a><span>© {new Date().getFullYear()} KRISH. BUILT ON THE INTERNET.</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>
      </div>
    </MotionConfig>
  );
}

export default App;
