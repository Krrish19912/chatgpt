import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowDownRight, ArrowUpRight, Check, Code2, ExternalLink,
  Layers3, Menu, Moon, Sun, X
} from "lucide-react";
import * as THREE from "three";

const focusAreas = [
  {
    number: "01",
    title: "Frontend development",
    description: "Thoughtful React components, responsive layouts, and interfaces that hold together from phone to desktop.",
    icon: Code2,
    tools: "REACT · JAVASCRIPT · CSS"
  },
  {
    number: "02",
    title: "Interaction & motion",
    description: "Small transitions and clear feedback that help a product feel considered, not distracting.",
    icon: Layers3,
    tools: "MOTION · INTERACTION DESIGN"
  },
  {
    number: "03",
    title: "Creative technology",
    description: "Exploring what happens when regular interfaces meet a little geometry, depth, or real-time rendering.",
    icon: Code2,
    tools: "THREE.JS · WEBGL"
  }
];

function Sculpture({ dark, reducedMotion }) {
  const core = useRef();
  const ring = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (core.current) {
      core.current.rotation.y += delta * 0.13;
      core.current.rotation.x = THREE.MathUtils.damp(core.current.rotation.x, state.pointer.y * 0.16, 2.6, delta);
      core.current.rotation.z = THREE.MathUtils.damp(core.current.rotation.z, -state.pointer.x * 0.11, 2.6, delta);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.07;
  });

  return (
    <group>
      <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={reducedMotion ? 0 : 0.08} floatIntensity={reducedMotion ? 0 : 0.16}>
        <group ref={core} scale={1.02}>
          <mesh>
            <icosahedronGeometry args={[1, 5]} />
            <meshPhysicalMaterial
              color={dark ? "#5bbdcc" : "#b5d9df"}
              roughness={0.28}
              metalness={0.12}
              clearcoat={0.65}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh scale={1.012}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color={dark ? "#c3f4f7" : "#367f91"} wireframe transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>
      <mesh ref={ring} rotation={[1.08, 0.2, -0.28]} scale={[1.49, 1.49, 1.49]}>
        <torusGeometry args={[1, 0.006, 8, 160]} />
        <meshBasicMaterial color={dark ? "#72dce7" : "#1b7e92"} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[0.35, -0.64, 0.17]} scale={[1.72, 1.72, 1.72]}>
        <torusGeometry args={[1, 0.003, 8, 160]} />
        <meshBasicMaterial color={dark ? "#abdbe4" : "#8ab6c1"} transparent opacity={0.6} />
      </mesh>
      <Sparkles count={18} scale={3.6} size={1.35} speed={reducedMotion ? 0 : 0.12} color={dark ? "#c7f4f7" : "#4b91a2"} opacity={0.6} />
    </group>
  );
}

function HeroScene({ dark }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="hero-scene" aria-label="Interactive geometric study">
      <div className="scene-kicker"><span>STUDY Nº 01</span><span>INTERACTIVE FORM</span></div>
      <div className="scene-glow" />
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 4, 4]} intensity={2.5} color="#fff7e9" />
        <pointLight position={[-3, -2, 2]} intensity={dark ? 7 : 8} color="#43bccb" />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Sculpture dark={dark} reducedMotion={Boolean(reducedMotion)} />
        </Suspense>
      </Canvas>
      <div className="scene-caption"><span>THREE.JS / REACT THREE FIBER</span><span>MOVE TO EXPLORE ↗</span></div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

function Header({ dark, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Work", "#work"], ["Approach", "#approach"], ["About", "#about"]];
  return (
    <header className="site-header section-shell">
      <a className="brand" href="#top" aria-label="Krrish, home">
        <span className="brand-mark">k.</span>
        <span className="brand-name">Krrish<small>FRONTEND DEVELOPER</small></span>
      </a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <ThemeToggle dark={dark} onToggle={onToggle} />
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Get in touch <ArrowUpRight size={14} /></a>
      </nav>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function PortfolioPreview() {
  return (
    <div className="browser-preview" aria-label="Illustration of the portfolio interface">
      <div className="browser-top"><div className="browser-dots"><i /><i /><i /></div><span>krrish.dev / work</span><span className="browser-top-right">↗</span></div>
      <div className="browser-page">
        <div className="browser-nav"><span className="browser-logo">k.</span><span>WORK&nbsp;&nbsp;&nbsp; ABOUT&nbsp;&nbsp;&nbsp; CONTACT</span></div>
        <div className="browser-heading">Building useful things<br /><em>for the web.</em></div>
        <div className="browser-rule" />
        <div className="browser-bottom"><span>REACT · CSS · THREE.JS</span><span>01 / 01</span></div>
        <div className="browser-orb"><div /></div>
      </div>
    </div>
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0c1420" : "#f4f7fa");
    try { window.localStorage.setItem("krrish-theme", theme); } catch { /* Storage can be unavailable. */ }
  }, [dark]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell" data-theme={dark ? "dark" : "light"} id="top">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <Header dark={dark} onToggle={() => setDark(value => !value)} />
        <main>
          <section className="hero section-shell" id="home">
            <div className="hero-copy">
              <div className="intro-line"><span className="status-dot" /> Independent developer <span className="intro-divider">/</span> 2026</div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Thoughtful<br />websites, built<br /><em>with care.</em>
              </motion.h1>
              <motion.p className="hero-lede" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}>
                I’m Krrish. I work with React, JavaScript and CSS to make websites that feel clear, responsive and considered — down to the small details.
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.5 }}>
                <a className="button button-primary" href="#work">See my work <ArrowDownRight size={16} /></a>
                <a className="button button-quiet" href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">GitHub profile <ExternalLink size={14} /></a>
              </motion.div>
              <div className="hero-footnote"><span>FRONTEND DEVELOPMENT</span><span>INTERFACE & INTERACTION</span></div>
            </div>
            <Reveal className="hero-art">
              <HeroScene dark={dark} />
            </Reveal>
            <div className="hero-index"><span>01</span><i /><span>04</span></div>
          </section>

          <div className="principles-bar"><div className="section-shell principles-inner"><span>Good work starts with</span><span>Clarity</span><i>·</i><span>Craft</span><i>·</i><span>Curiosity</span></div></div>

          <section className="work-section section-shell section-spacing" id="work">
            <Reveal className="section-heading">
              <div><span className="section-kicker">01 <i>/</i> SELECTED WORK</span><h2>Made with<br /><em>intention.</em></h2></div>
              <p>I’m building this portfolio as a home for my work and experiments. Here’s the site itself — a small project combining interface design, responsive React, and a little real-time 3D.</p>
            </Reveal>
            <Reveal className="featured-project">
              <a className="featured-visual" href="https://github.com/Krrish19912/chatgpt" target="_blank" rel="noreferrer" aria-label="View the portfolio source code on GitHub">
                <PortfolioPreview />
                <span className="featured-open"><ArrowUpRight size={20} /></span>
              </a>
              <div className="featured-copy">
                <div className="featured-meta"><span>PERSONAL PROJECT</span><span>REACT · VITE</span></div>
                <div className="featured-title-row"><h3>Personal portfolio</h3><span className="year-label">2026</span></div>
                <p>A responsive portfolio with a simple theme system, a custom Three.js study, and a focus on readable layouts over visual noise.</p>
                <div className="featured-foot"><span className="project-status"><i /> Ongoing</span><a href="https://github.com/Krrish19912/chatgpt" target="_blank" rel="noreferrer">View source code <ArrowUpRight size={15} /></a></div>
              </div>
            </Reveal>
            <div className="work-honesty"><span className="honesty-mark">+</span><p>I’ll add more projects here as they’re ready to share. I’d rather show fewer things with context than fill the page with placeholder case studies.</p></div>
          </section>

          <section className="approach-section" id="approach">
            <div className="section-shell approach-inner">
              <Reveal className="approach-heading">
                <span className="section-kicker">02 <i>/</i> CURRENT FOCUS</span>
                <h2>Care about<br /><em>the details.</em></h2>
                <p>The best interfaces don’t need to call attention to themselves. They make the next step feel obvious.</p>
              </Reveal>
              <div className="focus-list">
                {focusAreas.map(({ number, title, description, icon: Icon, tools }, index) => (
                  <Reveal key={number} delay={index * 0.05} className="focus-row">
                    <span className="focus-number">{number}</span>
                    <span className="focus-icon"><Icon size={19} strokeWidth={1.6} /></span>
                    <div className="focus-copy"><h3>{title}</h3><p>{description}</p><span>{tools}</span></div>
                    <ArrowUpRight className="focus-arrow" size={17} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section section-shell section-spacing" id="about">
            <Reveal className="about-top"><span className="section-kicker">03 <i>/</i> A LITTLE ABOUT ME</span><span className="about-aside">Learning by making.</span></Reveal>
            <div className="about-content">
              <Reveal className="about-statement"><h2>I like the<br />space between<br /><em>design and code.</em></h2></Reveal>
              <Reveal className="about-copy">
                <p>It’s where a layout becomes a point of view, where a component starts to feel right, and where careful engineering gives a good idea room to work.</p>
                <p>I’m interested in practical frontend development, thoughtful visual systems, and the occasional experiment that pushes the browser a little further.</p>
                <a className="text-link" href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15} /></a>
              </Reveal>
            </div>
            <div className="tool-row"><span className="section-kicker">TOOLS I’M USING</span><div className="tool-list"><span>React</span><span>JavaScript</span><span>CSS</span><span>Three.js</span><span>Motion</span><span>Git</span></div></div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-shell contact-inner">
              <div className="contact-main">
                <Reveal><span className="section-kicker">04 <i>/</i> CONTACT</span><h2>Have something<br /><em>in mind?</em></h2><p>I'm always glad to connect with people making thoughtful things for the web.</p><a className="button button-primary" href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight size={16} /></a></Reveal>
              </div>
              <Reveal className="contact-card">
                <span className="contact-card-label">ELSEWHERE</span>
                <a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer"><span><b>GitHub</b><small>Code, projects and experiments</small></span><ArrowUpRight size={18} /></a>
                <a href="https://github.com/Krrish19912/chatgpt" target="_blank" rel="noreferrer"><span><b>This portfolio</b><small>Built with React, Vite and Three.js</small></span><ArrowUpRight size={18} /></a>
              </Reveal>
            </div>
          </section>
        </main>
        <footer className="site-footer section-shell"><a href="#top" className="footer-brand"><span className="brand-mark">k.</span>Krrish</a><span>DESIGNED & BUILT WITH CARE</span><a href="#top" className="back-top">Back to top ↑</a></footer>
      </div>
    </MotionConfig>
  );
}

export default App;
