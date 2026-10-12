import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Code2, Layers3,
  Mail, Menu, MousePointer2, MoveUpRight, Sparkles as SparklesIcon, Terminal, X
} from "lucide-react";
import * as THREE from "three";

const projects = [
  {
    n: "01",
    title: "NATIVE",
    subtitle: "An AI playground with a pulse.",
    type: "CREATIVE AI / INTERFACE CONCEPT",
    description: "What if working with AI felt less like filling out a form and more like stepping into a thought?",
    tags: ["React", "AI UX", "Motion"],
    art: "native"
  },
  {
    n: "02",
    title: "MUSE",
    subtitle: "Commerce, with all five senses.",
    type: "DIGITAL COMMERCE / 3D CONCEPT",
    description: "A tactile product universe built to make the space between looking and wanting feel smaller.",
    tags: ["Three.js", "WebGL", "Art direction"],
    art: "muse"
  },
  {
    n: "03",
    title: "TYPED",
    subtitle: "A little less noise. A lot more flow.",
    type: "PRODUCTIVITY / SAAS CONCEPT",
    description: "A focused writing space exploring how small motion and clear hierarchy can help ideas find their shape.",
    tags: ["React", "Design systems", "Interaction"],
    art: "typed"
  }
];

const services = [
  { number: "01", title: "Creative development", detail: "Making ambitious visual ideas work on real screens.", icon: Code2 },
  { number: "02", title: "3D + interaction", detail: "Giving the browser a sense of depth, touch, and play.", icon: Layers3 },
  { number: "03", title: "Interface systems", detail: "The tiny details that make a whole product feel intentional.", icon: Terminal }
];

function Sculpture({ reducedMotion, playMode }) {
  const core = useRef();
  const orbit = useRef();
  const outerOrbit = useRef();
  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (core.current) {
      core.current.rotation.y += delta * 0.2;
      core.current.rotation.x = THREE.MathUtils.damp(core.current.rotation.x, state.pointer.y * 0.23, 3, delta);
      core.current.rotation.z = THREE.MathUtils.damp(core.current.rotation.z, -state.pointer.x * 0.18, 3, delta);
    }
    if (orbit.current) orbit.current.rotation.z += delta * 0.21;
    if (outerOrbit.current) outerOrbit.current.rotation.x -= delta * 0.08;
  });
  return (
    <group>
      <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={reducedMotion ? 0 : 0.24} floatIntensity={reducedMotion ? 0 : 0.55}>
        <group ref={core} scale={1.13}>
          <mesh>
            <icosahedronGeometry args={[1, 6]} />
            <MeshDistortMaterial
              color={playMode ? "#c9ff3d" : "#ff5538"}
              roughness={0.16}
              metalness={0.34}
              distort={0.38}
              speed={reducedMotion ? 0 : 2.5}
            />
          </mesh>
          <mesh scale={1.045}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#fff5e7" wireframe transparent opacity={0.36} />
          </mesh>
          <mesh scale={0.68} rotation={[0.2, 0.4, 0.2]}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={playMode ? "#ff5538" : "#c9ff3d"} wireframe transparent opacity={0.48} />
          </mesh>
        </group>
      </Float>
      <mesh ref={orbit} rotation={[1.16, 0.3, -0.35]} scale={[1.58, 1.58, 1.58]}>
        <torusGeometry args={[1, 0.012, 10, 160]} />
        <meshBasicMaterial color={playMode ? "#ff5538" : "#c9ff3d"} />
      </mesh>
      <mesh ref={outerOrbit} rotation={[0.45, -0.65, 0.18]} scale={[1.9, 1.9, 1.9]}>
        <torusGeometry args={[1, 0.004, 8, 160]} />
        <meshBasicMaterial color="#fff5e7" transparent opacity={0.58} />
      </mesh>
      <Sparkles count={65} scale={4.3} size={3} speed={reducedMotion ? 0 : 0.38} color="#fff1c9" opacity={0.9} />
      <Stars radius={7} depth={2} count={90} factor={1.3} saturation={0} fade speed={reducedMotion ? 0 : 0.15} />
    </group>
  );
}

function HeroScene({ playMode }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="hero-visual">
      <div className="visual-sun" />
      <Canvas
        camera={{ position: [0, 0, 4.7], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}
        aria-label="Interactive 3D coral sculpture"
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={3.1} color="#fff3db" />
        <pointLight position={[-3, -2, 2]} intensity={20} color={playMode ? "#ff5538" : "#6945ff"} />
        <pointLight position={[2, -1, 3]} intensity={10} color="#d2ff45" />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Sculpture reducedMotion={Boolean(reducedMotion)} playMode={playMode} />
        </Suspense>
      </Canvas>
      <div className="visual-sticker sticker-top"><Asterisk size={17} /> BUILT TO FEEL</div>
      <div className="visual-sticker sticker-bottom"><span>3D</span><div>NOT A TEMPLATE<br />NOT EVEN CLOSE.</div></div>
      <div className="visual-index">FIG. 001 / DIGITAL MATTER</div>
      <div className="visual-cross cross-a" />
      <div className="visual-cross cross-b" />
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, ...props }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reducedMotion ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function ProjectArtwork({ art }) {
  if (art === "native") {
    return (
      <div className="art-stage art-native">
        <div className="stage-meta"><span>NATIVE® — CREATIVE INTELLIGENCE</span><span>FIG. 01</span></div>
        <div className="native-copy">THINK<br /><i>WEIRDER.</i></div>
        <div className="native-disc"><div className="native-disc-inner" /><div className="native-disc-core" /></div>
        <div className="native-orbit native-orbit-one" /><div className="native-orbit native-orbit-two" />
        <div className="native-caption">A NEW KIND OF<br />CONVERSATION ↗</div>
        <div className="native-star">✳</div>
      </div>
    );
  }
  if (art === "muse") {
    return (
      <div className="art-stage art-muse">
        <div className="stage-meta"><span>MUSE® — OBJECTS & OTHER THINGS</span><span>FIG. 02</span></div>
        <div className="muse-title">FEEL<br /><span>THE</span><br /><i>FUTURE.</i></div>
        <div className="muse-object"><div className="muse-object-cap" /><div className="muse-object-body"><span>M / 02</span></div><div className="muse-object-foot" /></div>
        <div className="muse-swoosh" />
        <div className="muse-bottom"><span>OBJECT STUDY — 002</span><span>TOUCH TO EXPLORE ↗</span></div>
        <div className="muse-cross">+</div>
      </div>
    );
  }
  return (
    <div className="art-stage art-typed">
      <div className="stage-meta"><span>TYPED® — SPACE FOR THOUGHT</span><span>FIG. 03</span></div>
      <div className="typed-orbit typed-orbit-one" /><div className="typed-orbit typed-orbit-two" />
      <div className="typed-window window-back"><span>Untitled / Draft 08</span><div /><div /><div /></div>
      <div className="typed-window window-front">
        <div className="typed-window-head"><span className="typed-mini-mark">t.</span><span>MONDAY, 09:41 AM</span><span>•••</span></div>
        <div className="typed-page-title">The art of<br /><i>starting</i> messy.</div>
        <div className="typed-lines"><i /><i /><i /><i /></div>
        <div className="typed-highlight">GOOD IDEAS<br />NEED ROOM.</div>
      </div>
      <div className="typed-spark">✳</div>
      <div className="typed-bottom-label">LESS NOISE. MORE SIGNAL.</div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className={"project-card project-" + project.art} delay={index * 0.07}>
      <a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer" className="project-link" aria-label={"Explore more work on GitHub: " + project.title}>
        <ProjectArtwork art={project.art} />
        <div className="project-info">
          <div>
            <span className="project-type">{project.type}</span>
            <h3>{project.title}<span className="project-index">/{project.n}</span></h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <span className="project-go"><ArrowUpRight size={24} /></span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </a>
    </Reveal>
  );
}

function Header({ playMode, setPlayMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Work", "#work"], ["About", "#about"], ["What I do", "#services"]];
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Krrish home"><span className="brand-symbol">K<span>!</span></span><span className="brand-word">KRR/ISH<small>CREATIVE DEVELOPER</small></span></a>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        {links.map(([label, href], i) => <a key={label} href={href} onClick={() => setMenuOpen(false)}><span className="nav-num">0{i + 1}</span>{label}</a>)}
        <button className="mode-switch" onClick={() => setPlayMode(!playMode)} aria-pressed={playMode}><span className={playMode ? "mode-light mode-active" : "mode-light"} /> PLAY MODE: {playMode ? "ON" : "OFF"}</button>
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>LET'S TALK <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  );
}

function App() {
  const [playMode, setPlayMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const starRotate = useTransform(progress, [0, 1], [-25, 335]);
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
      <div className={playMode ? "app-shell play-mode" : "app-shell"} id="top">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <div className="paper-grain" />
        <Header playMode={playMode} setPlayMode={setPlayMode} />
        <main>
          <section className="hero section-shell" id="home">
            <div className="hero-topline"><span><i className="live-dot" /> INDEPENDENT CREATIVE DEVELOPER</span><span>INDIA ↗ INTERNET</span><span>AVAILABLE FOR SELECT WORK — 2026</span></div>
            <div className="hero-layout">
              <div className="hero-copy">
                <motion.div className="hero-kicker" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>DESIGN × CODE × A LITTLE CHAOS</motion.div>
                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
                  MAKE<br /><span className="headline-outline">IT</span> <span className="headline-accent">MATTER<span className="headline-period">.</span></span>
                </motion.h1>
                <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.6 }}>
                  I build expressive digital experiences for people who are bored of the ordinary. Part engineer, part pixel obsessive, fully curious.
                </motion.p>
                <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46, duration: 0.6 }}>
                  <a className="button button-primary" href="#work">SEE WHAT I MAKE <ArrowDownRight size={18} /></a>
                  <a className="button button-text" href="#about">WHO'S KRRISH? <ArrowRight size={16} /></a>
                </motion.div>
                <div className="hero-signoff"><span>SCROLL A LITTLE. STAY A WHILE.</span><motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}><ArrowDownRight size={19} /></motion.span></div>
              </div>
              <motion.div className="hero-art-wrap" initial={{ opacity: 0, scale: 0.92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                <HeroScene playMode={playMode} />
              </motion.div>
              <motion.div className="hero-side-note" style={{ rotate: starRotate }}>GOOD TASTE IS A STARTING POINT ✳ NOT THE FINISH LINE ✳</motion.div>
            </div>
            <div className="hero-bottomline"><span>01 / A DIFFERENT KIND OF PORTFOLIO</span><span>BUILT IN THE BROWSER, NOT A BOX.</span><span>SCROLL TO EXPLORE ↓</span></div>
          </section>

          <div className="marquee-strip" aria-label="Creative code, digital craft, things that move">
            <div className="marquee-track"><span>MAKE SOMETHING WEIRD</span><Asterisk /><span>BREAK THE GRID</span><Asterisk /><span>OBSESS OVER THE DETAILS</span><Asterisk /><span>MAKE SOMETHING WEIRD</span><Asterisk /><span>BREAK THE GRID</span><Asterisk /><span>OBSESS OVER THE DETAILS</span><Asterisk /></div>
          </div>

          <section className="work-section section-shell section-space" id="work">
            <Reveal className="section-intro">
              <div><span className="section-label"><span>01</span> / SELECTED PLAYGROUND</span><h2>LESS TALK.<br /><i>MORE</i> <span>WOW.</span></h2></div>
              <div className="intro-aside"><span className="aside-asterisk">✳</span><p>Not a wall of thumbnails. Three visual directions built around one idea: digital things should feel like something.</p><span className="small-note">SELF-INITIATED CONCEPTS — SWAP IN REAL PROJECTS</span></div>
            </Reveal>
            <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.n} project={project} index={index} />)}</div>
            <Reveal className="work-footer"><span>CURIOUS WHAT ELSE I'M MAKING?</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">FOLLOW THE EXPERIMENTS <MoveUpRight size={18} /></a></Reveal>
          </section>

          <section className="about-section" id="about">
            <div className="about-inner section-shell">
              <Reveal className="about-top"><span className="section-label"><span>02</span> / THE HUMAN BEHIND THE PIXELS</span><span>NO BORING BY DEFAULT.</span></Reveal>
              <Reveal className="about-headline"><h2>I LIKE MY<br />INTERNET <span>ALIVE.</span></h2><motion.span className="about-star" style={{ rotate: starRotate }}>✳</motion.span></Reveal>
              <div className="about-bottom">
                <Reveal className="about-manifesto"><span className="manifesto-mark">“</span><p>The internet doesn't need more websites that look like websites. It needs tiny worlds, unexpected moments, and interfaces that make you feel something.</p></Reveal>
                <Reveal className="about-bio"><p>I'm Krrish — a developer exploring the overlap between design, code, and playful technology. I care about the first impression, the tiny interaction, the 200 milliseconds that make a button feel alive.</p><p>I’m here for ambitious ideas, expressive visuals, and the fun part where a design that “probably won't work” suddenly does.</p><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer" className="text-link">MORE ON GITHUB <ArrowUpRight size={15} /></a></Reveal>
              </div>
            </div>
          </section>

          <section className="services-section section-shell section-space" id="services">
            <Reveal className="section-intro service-intro">
              <div><span className="section-label"><span>03</span> / THINGS I DO WELL</span><h2>THE GOOD<br /><i>STUFF.</i></h2></div>
              <p>Ideas are cheap. Making them work, feel good, and load fast? That's where things get interesting.</p>
            </Reveal>
            <div className="services-list">{services.map(({ number, title, detail, icon: Icon }, index) => <Reveal key={number} delay={index * 0.07} className="service-row"><span className="service-number">{number}</span><span className="service-icon"><Icon size={23} strokeWidth={1.6} /></span><div className="service-copy"><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight className="service-arrow" size={23} /></Reveal>)}</div>
            <Reveal className="tech-stack"><span className="section-label"><span>+</span> TOOLS IN THE TOYBOX</span><div className="tech-list"><span>REACT</span><span>THREE.JS</span><span>JAVASCRIPT</span><span>MOTION</span><span>CSS</span><span>FIGMA</span><span>CREATIVE CODING</span></div></Reveal>
          </section>

          <section className="contact-section" id="contact">
            <div className="contact-inner section-shell">
              <Reveal className="contact-top"><span className="section-label"><span>04</span> / THE NEXT PART IS YOURS</span><span>GOOD IDEAS WELCOME.</span></Reveal>
              <Reveal className="contact-headline"><h2>GOT A<br /><i>WEIRD</i> IDEA<span>?</span></h2><motion.div className="contact-stamp" animate={{ rotate: [0, 12, -7, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}><SparklesIcon size={30} /><span>LET'S MAKE<br />A LITTLE<br />MAGIC</span></motion.div></Reveal>
              <div className="contact-bottom">
                <Reveal><p>Bring me the half-formed idea, the impossible brief, or the thing you can't stop thinking about. Let's see where it goes.</p><button className="button button-primary contact-button" onClick={copyEmail}><Mail size={17} /> {copied ? "EMAIL COPIED!" : "COPY MY EMAIL"} <ArrowUpRight size={17} /></button><span className="email-address">{email}</span></Reveal>
                <Reveal className="contact-social"><span className="section-label">ELSEWHERE ON THE INTERNET</span><a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={15} /></a><a href="mailto:hello@krrish.dev">EMAIL <ArrowUpRight size={15} /></a></Reveal>
              </div>
            </div>
            <div className="contact-marquee"><div className="contact-marquee-track"><span>MAKE IT MATTER</span><Asterisk /><span>MAKE IT MATTER</span><Asterisk /><span>MAKE IT MATTER</span><Asterisk /><span>MAKE IT MATTER</span><Asterisk /></div></div>
          </section>
        </main>
        <footer className="site-footer section-shell"><a className="footer-brand" href="#top"><span className="brand-symbol">K<span>!</span></span><span>BACK TO THE TOP ↑</span></a><span>© {new Date().getFullYear()} KRR/ISH — BUILT WITH CURIOSITY.</span><span>NO PIXELS WERE BORED IN THE MAKING.</span></footer>
      </div>
    </MotionConfig>
  );
}

export default App;
