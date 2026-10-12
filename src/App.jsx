import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Code2, ExternalLink,
  Layers3, Mail, Menu, Moon, Sun, Terminal, X
} from "lucide-react";
import * as THREE from "three";

const projects = [
  {
    number: "01",
    title: "Northstar",
    type: "DASHBOARD · PRODUCT CONCEPT",
    description: "A clear, considered analytics workspace that turns a busy data view into a useful daily tool.",
    tags: ["React", "Data visualization", "UI design"],
    preview: "northstar"
  },
  {
    number: "02",
    title: "Forma",
    type: "COMMERCE · INTERACTION CONCEPT",
    description: "A quiet product storefront exploring generous space, tactile details, and simple decisions.",
    tags: ["E-commerce", "Three.js", "Motion"],
    preview: "forma"
  },
  {
    number: "03",
    title: "Fieldnotes",
    type: "CREATIVE TOOL · INTERFACE CONCEPT",
    description: "A focused writing space designed to keep the work in front and the interface out of the way.",
    tags: ["React", "Design systems", "Accessibility"],
    preview: "fieldnotes"
  }
];

const capabilities = [
  { number: "01", title: "Frontend engineering", description: "Responsive, maintainable interfaces with attention to detail.", icon: Code2 },
  { number: "02", title: "Creative interaction", description: "Motion and 3D used with intention, never just for decoration.", icon: Layers3 },
  { number: "03", title: "UI systems", description: "Consistent components and thoughtful states that make products feel complete.", icon: Braces }
];

function HeroObject({ dark }) {
  const sculpture = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame((state, delta) => {
    if (!sculpture.current) return;
    sculpture.current.rotation.y += delta * 0.12;
    sculpture.current.rotation.x = THREE.MathUtils.damp(
      sculpture.current.rotation.x,
      state.pointer.y * 0.12,
      2.5,
      delta
    );
    sculpture.current.rotation.z = THREE.MathUtils.damp(
      sculpture.current.rotation.z,
      -state.pointer.x * 0.08,
      2.5,
      delta
    );
    if (ringA.current) ringA.current.rotation.z += delta * 0.08;
    if (ringB.current) ringB.current.rotation.y -= delta * 0.05;
  });

  return (
    <group>
      <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.2}>
        <group ref={sculpture} scale={1.04}>
          <mesh>
            <icosahedronGeometry args={[1, 5]} />
            <meshPhysicalMaterial
              color={dark ? "#a9c9c5" : "#dcebe7"}
              roughness={0.23}
              metalness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.14}
            />
          </mesh>
          <mesh scale={1.012}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color={dark ? "#d3e7df" : "#4b736e"} wireframe transparent opacity={0.22} />
          </mesh>
        </group>
      </Float>
      <mesh ref={ringA} rotation={[1.05, 0.22, -0.35]} scale={[1.52, 1.52, 1.52]}>
        <torusGeometry args={[1, 0.006, 8, 180]} />
        <meshBasicMaterial color={dark ? "#a6c7c1" : "#537d76"} transparent opacity={0.82} />
      </mesh>
      <mesh ref={ringB} rotation={[0.45, -0.6, 0.18]} scale={[1.78, 1.78, 1.78]}>
        <torusGeometry args={[1, 0.003, 8, 180]} />
        <meshBasicMaterial color={dark ? "#b9c9c2" : "#8e9e97"} transparent opacity={0.68} />
      </mesh>
      <Sparkles count={24} scale={3.8} size={1.6} speed={0.14} color={dark ? "#d5e5dc" : "#617d75"} opacity={0.65} />
    </group>
  );
}

function HeroScene({ dark }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="hero-scene" aria-label="Interactive 3D geometric sculpture">
      <div className="scene-glow" />
      <div className="scene-topline"><span>FORM STUDY No. 01</span><span>INTERACTIVE OBJECT</span></div>
      <Canvas
        camera={{ position: [0, 0, 4.35], fov: 42 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 4, 4]} intensity={2.6} color="#fff8e9" />
        <pointLight position={[-3, -2, 2]} intensity={dark ? 7 : 9} color="#8dbdb2" />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          {reducedMotion
            ? <HeroObjectStatic dark={dark} />
            : <HeroObject dark={dark} />}
        </Suspense>
      </Canvas>
      <div className="scene-bottomline"><span>DRAG WITH YOUR CURSOR</span><span>01 — 03</span></div>
    </div>
  );
}

function HeroObjectStatic({ dark }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.04, 4]} />
        <meshPhysicalMaterial color={dark ? "#a9c9c5" : "#dcebe7"} roughness={0.25} metalness={0.15} clearcoat={1} />
      </mesh>
      <mesh rotation={[1.05, 0.22, -0.35]} scale={[1.52, 1.52, 1.52]}>
        <torusGeometry args={[1, 0.006, 8, 180]} />
        <meshBasicMaterial color={dark ? "#a6c7c1" : "#537d76"} />
      </mesh>
    </group>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reducedMotion ? 0 : 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectPreview({ type }) {
  if (type === "northstar") {
    return (
      <div className="preview preview-northstar">
        <div className="preview-sidebar"><span className="mini-logo">n.</span><i /><i /><i /><i /></div>
        <div className="dashboard">
          <div className="dash-head"><span>Overview</span><span className="mini-select">Last 30 days⌄</span></div>
          <div className="dash-stats">
            <div><small>Revenue</small><b>$48,290</b><em>↗ 12.8%</em></div>
            <div><small>Customers</small><b>2,841</b><em>↗ 8.4%</em></div>
            <div><small>Conversion</small><b>4.86%</b><em>↗ 2.1%</em></div>
          </div>
          <div className="dash-chart"><div className="chart-guides"><i /><i /><i /><i /></div><svg viewBox="0 0 420 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 88 C24 83 35 54 60 67 S100 83 123 50 S163 61 188 41 S227 65 253 35 S296 54 320 20 S372 46 420 8" fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/><path d="M0 88 C24 83 35 54 60 67 S100 83 123 50 S163 61 188 41 S227 65 253 35 S296 54 320 20 S372 46 420 8 L420 110 L0 110Z" fill="currentColor" opacity=".07"/></svg></div>
          <div className="dash-legend"><span><i /> Revenue</span><span>JAN 01 — JAN 30</span></div>
        </div>
      </div>
    );
  }
  if (type === "forma") {
    return (
      <div className="preview preview-forma">
        <div className="forma-top"><span>FORMA / STUDIO</span><span>OBJECTS THAT LAST</span><span>SHOP ↗</span></div>
        <div className="forma-copy"><small>THE EVERYDAY COLLECTION</small><b>Good design.<br /><i>Less noise.</i></b><span>Considered objects for slower living.</span><div className="forma-cta">EXPLORE COLLECTION <ArrowUpRight size={13} /></div></div>
        <div className="forma-object"><div className="forma-object-cap" /><div className="forma-object-neck" /><div className="forma-object-body"><span>F / 01</span></div><div className="forma-object-shadow" /></div>
        <div className="forma-index">FORM 01 — 2025</div>
      </div>
    );
  }
  return (
    <div className="preview preview-fieldnotes">
      <div className="notes-top"><span className="notes-brand">fieldnotes<span>.</span></span><span>Untitled / Draft 04</span><span>•••</span></div>
      <div className="notes-body">
        <div className="notes-date">MONDAY, 09:41 AM</div>
        <div className="notes-title">Ideas need<br /><i>room to grow.</i></div>
        <div className="notes-lines"><i /><i /><i /><i /></div>
        <div className="notes-quote">“Make space for<br />the first draft.”</div>
        <div className="notes-footer"><span>124 WORDS</span><span>ALL CHANGES SAVED ✓</span></div>
      </div>
      <div className="notes-decoration">f.</div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className="project-card" delay={index * 0.06}>
      <div className={"project-preview project-preview-" + project.preview}>
        <ProjectPreview type={project.preview} />
        <span className="preview-number">{project.number}</span>
      </div>
      <div className="project-meta">
        <div><span className="eyebrow">{project.type}</span><h3>{project.title}</h3></div>
        <span className="project-arrow"><ArrowUpRight size={19} /></span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <span className="concept-note">SELF-INITIATED CONCEPT</span>
    </Reveal>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{dark ? "LIGHT MODE" : "DARK MODE"}</span>
    </button>
  );
}

function Header({ dark, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Work", "#work"], ["About", "#about"], ["Capabilities", "#capabilities"]];
  return (
    <header className="site-header section-shell">
      <a className="brand" href="#top" aria-label="Krrish home"><span className="brand-mark">K<span>.</span></span><span className="brand-copy">KRRISH<small>DEVELOPER / DESIGNER</small></span></a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <ThemeToggle dark={dark} onToggle={onThemeToggle} />
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>LET'S TALK <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = window.localStorage.getItem("krrish-theme");
      if (saved === "light") return false;
      if (saved === "dark") return true;
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    } catch {
      return false;
    }
  });
  const [menuEmailCopied, setMenuEmailCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const email = "hello@krrish.dev";

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#111817" : "#f6f7f4");
    try { window.localStorage.setItem("krrish-theme", theme); } catch { /* Storage may be unavailable. */ }
  }, [dark]);

  const toggleTheme = () => setDark(value => !value);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setMenuEmailCopied(true);
      window.setTimeout(() => setMenuEmailCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + email;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell" data-theme={dark ? "dark" : "light"} id="top">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <Header dark={dark} onThemeToggle={toggleTheme} />
        <main>
          <section className="hero section-shell" id="home">
            <div className="hero-copy">
              <div className="availability"><span /> OPEN TO INTERESTING PROJECTS <span className="availability-year">· 2026</span></div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                Building digital<br /><span>experiences with</span><br /><em>purpose.</em>
              </motion.h1>
              <motion.p className="hero-description" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.55 }}>
                I'm Krrish — a developer who cares about the details. I build thoughtful web experiences where clear design, useful technology, and subtle motion meet.
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.55 }}>
                <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={16} /></a>
                <a className="button button-secondary" href="#contact">Get in touch <ArrowRight size={16} /></a>
              </motion.div>
              <div className="hero-quickfacts"><span><i /> FRONTEND DEVELOPMENT</span><span><i /> CREATIVE TECHNOLOGY</span></div>
            </div>
            <Reveal className="hero-art">
              <HeroScene dark={dark} />
              <div className="hero-art-caption"><span>Procedural 3D / 001</span><span>Move cursor to interact</span></div>
            </Reveal>
            <div className="hero-bottom"><span>DESIGN-MINDED DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span></div>
          </section>

          <section className="trust-strip">
            <div className="section-shell trust-inner"><span>WORKING WITH</span><i /> <span>REACT</span><i /> <span>JAVASCRIPT</span><i /> <span>THREE.JS</span><i /> <span>MOTION</span><i /> <span>CSS</span></div>
          </section>

          <section className="work-section section-shell section-spacing" id="work">
            <Reveal className="section-heading">
              <div><span className="section-index">01 / SELECTED WORK</span><h2>A few things<br /><em>in progress.</em></h2></div>
              <p>A small selection of interface and interaction concepts. Each one is an opportunity to explore how thoughtful design can make software feel simpler and more human.</p>
            </Reveal>
            <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
            <Reveal className="work-link"><span>MORE CODE & EXPERIMENTS ON GITHUB</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">Visit my GitHub <ExternalLink size={15} /></a></Reveal>
          </section>

          <section className="about-section" id="about">
            <div className="section-shell about-inner">
              <Reveal className="about-label"><span className="section-index">02 / A LITTLE ABOUT ME</span><span className="about-note">CURIOUS BY DEFAULT.</span></Reveal>
              <Reveal className="about-heading"><h2>Good software is<br />clear. Great software<br /><em>feels effortless.</em></h2><span className="about-monogram">K<span>.</span></span></Reveal>
              <div className="about-content">
                <Reveal><p className="about-lede">I’m interested in the space where engineering meets experience — the tiny choices that make a product easier to understand, more enjoyable to use, and more memorable.</p></Reveal>
                <Reveal className="about-body"><p>My approach is simple: understand the problem, take care of the fundamentals, then add the details that make the work feel considered. Not every interaction needs to be loud. It just needs to be right.</p><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer" className="text-link">Explore my code <ArrowUpRight size={15} /></a></Reveal>
              </div>
            </div>
          </section>

          <section className="capabilities-section section-shell section-spacing" id="capabilities">
            <Reveal className="section-heading capabilities-heading">
              <div><span className="section-index">03 / WHAT I DO</span><h2>Thoughtful by<br /><em>design.</em></h2></div>
              <p>Good work balances craft with practicality: fast, responsive, accessible, and just distinctive enough to stay with you.</p>
            </Reveal>
            <div className="capabilities-list">{capabilities.map(({ number, title, description, icon: Icon }, index) => <Reveal key={number} delay={index * 0.05} className="capability-row"><span className="capability-number">{number}</span><span className="capability-icon"><Icon size={21} strokeWidth={1.6} /></span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight className="capability-arrow" size={19} /></Reveal>)}</div>
            <Reveal className="stack-row"><span className="section-index">TOOLS I USE</span><div className="stack-tags"><span>React</span><span>JavaScript</span><span>Three.js</span><span>Motion</span><span>CSS</span><span>Git</span><span>Figma</span></div></Reveal>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-shell contact-inner">
              <Reveal className="contact-heading"><span className="section-index">04 / CONTACT</span><h2>Have a good<br /><em>project in mind?</em></h2><p>Tell me a little about what you're building. I'd love to hear about it.</p><button className="button button-primary" type="button" onClick={copyEmail}><Mail size={16} /> {menuEmailCopied ? "Email copied" : "Copy email address"} <ArrowUpRight size={15} /></button><span className="contact-email">{email}</span></Reveal>
              <div className="contact-side"><div className="contact-orbit"><div className="contact-orbit-core"><ArrowUpRight size={29} /></div></div><span>GOOD THINGS START WITH A CONVERSATION.</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a><a href={"mailto:" + email}>Email <ArrowUpRight size={14} /></a></div>
            </div>
          </section>
        </main>
        <footer className="site-footer section-shell"><a className="footer-brand" href="#top"><span className="brand-mark">K<span>.</span></span><span>KRRISH / DEVELOPER</span></a><span>© {new Date().getFullYear()} KRRISH. BUILT WITH CARE.</span><a href="#top" className="back-to-top">BACK TO TOP ↑</a></footer>
      </div>
    </MotionConfig>
  );
}

export default App;
