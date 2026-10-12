import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  ScanFace,
  Sparkles,
  X
} from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";

const projects = [
  {
    id: "skin-lesion",
    number: "01",
    title: "Skin Lesion Detection",
    subtitle: "A computer-vision experiment for image-based screening.",
    category: "Machine learning",
    kind: "COMPUTER VISION",
    date: "JAN — APR 2025",
    variant: "vision",
    metric: "90%",
    description: "A convolutional neural network that classifies lesion images and flags potentially malignant cases, paired with a straightforward web interface.",
    problem: "Make image-based model predictions easier to explore through a simple, accessible interface.",
    approach: "Built a CNN with TensorFlow and Keras, applied data augmentation and regularization to address overfitting, and created an HTML/CSS interface for prediction flow.",
    stack: ["Python", "TensorFlow", "Keras", "CNN", "HTML / CSS"],
    note: "The accuracy figure reflects the result stated in the project summary; a dataset split and evaluation protocol were not included in the source details."
  },
  {
    id: "rawgraph",
    number: "02",
    title: "Rawgraph 2.0",
    subtitle: "An interactive analytics workspace for exploring data.",
    category: "Analytics",
    kind: "DATA VISUALIZATION",
    date: "JAN — APR 2026",
    variant: "analytics",
    description: "A React and D3.js analytics platform concept focused on making large datasets easier to inspect through clear visual exploration and dynamic filtering.",
    problem: "Dense views can make useful patterns difficult to spot, especially when exploring large datasets.",
    approach: "Created an interactive platform concept using React and D3.js, with dynamic filters designed to reduce visual clutter and help people focus on relevant slices of data.",
    stack: ["React", "D3.js", "JavaScript", "Data visualization"],
    note: "The visual preview on this page is an illustration of the project direction, not a screenshot of a deployed product."
  }
];

const skillGroups = [
  {
    id: "01",
    title: "Data analysis",
    description: "Turn raw tables into clearer questions and usable findings.",
    icon: Database,
    tools: ["Python", "SQL · basic", "Pandas", "NumPy", "EDA", "Data cleaning", "Feature engineering"]
  },
  {
    id: "02",
    title: "Machine learning",
    description: "Build, train and refine models with a focus on evaluation.",
    icon: BrainCircuit,
    tools: ["Scikit-learn", "TensorFlow", "Keras", "CNNs", "Data augmentation", "PyTorch · basic"]
  },
  {
    id: "03",
    title: "Visualization & web",
    description: "Make insights easier to read through interfaces and charts.",
    icon: BarChart3,
    tools: ["Matplotlib", "Seaborn", "React", "D3.js", "JavaScript", "HTML", "CSS"]
  },
  {
    id: "04",
    title: "Tools & teamwork",
    description: "Work across code, communication and practical delivery.",
    icon: Code2,
    tools: ["Git", "GitHub", "Problem solving", "Technical communication", "Project management", "Research"]
  }
];

const experience = [
  {
    period: "JAN — APR 2026",
    year: "2026",
    role: "Data Analytics Intern",
    company: "MBH Pvt. Limited",
    location: "Karjan, Gujarat",
    kind: "ANALYTICS · FRONTEND",
    bullets: [
      "Developed a React-based analytics dashboard to make stakeholder reporting clearer and support faster decisions.",
      "Optimized frontend state management for smoother loading and real-time reporting.",
      "Gathered requirements across teams and built reusable analytical tools."
    ],
    tools: ["React", "JavaScript", "Analytics dashboards"]
  },
  {
    period: "APR — JUN 2023",
    year: "2023",
    role: "Data Science Intern",
    company: "Tata",
    location: "Remote",
    kind: "DATA SCIENCE · EDA",
    bullets: [
      "Automated data-cleaning tasks using Pandas and NumPy.",
      "Used Matplotlib and Seaborn for exploratory analysis, anomaly discovery and correlation checks.",
      "Engineered features to support machine-learning model performance."
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"]
  }
];

const certifications = [
  { name: "Zero to Python Hero", issuer: "LetsUpgrade × NSDC", date: "JUL 2025" },
  { name: "Artificial Intelligence Essentials", issuer: "MindLuster", date: "APR 2025" },
  { name: "Python for AI", issuer: "MindLuster", date: "APR 2025" },
  { name: "NSE Data in Python", issuer: "MindLuster", date: "APR 2025" },
  { name: "MySQL Temp Tables for Beginners", issuer: "MindLuster", date: "APR 2025" }
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ number, children }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow-number">{number}</span>
      <span className="eyebrow-line" />
      <span>{children}</span>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Work", "#work"], ["Capabilities", "#capabilities"], ["Experience", "#experience"], ["About", "#about"]];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Krrish, back to top" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">K<span>.</span></span>
        <span className="brand-copy">
          <strong>KRRISH</strong>
          <small>DATA · ML · ANALYTICS</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen(value => !value)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Abstract data visualization artwork">
      <div className="visual-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="hero-visual-label">
        <span><i className="signal-dot" /> PERSONAL DATA LAB</span>
        <span>KK / 026</span>
      </div>
      <div className="visual-core">
        <div className="core-halo" />
        <svg className="signal-graph" viewBox="0 0 440 270" role="img" aria-label="Abstract line plot">
          <defs>
            <linearGradient id="signalStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8da6ff" />
              <stop offset="58%" stopColor="#d3ff47" />
              <stop offset="100%" stopColor="#d3ff47" />
            </linearGradient>
            <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d3ff47" stopOpacity=".22" />
              <stop offset="100%" stopColor="#d3ff47" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 82, 124, 166, 208].map(y => <line key={y} x1="18" y1={y} x2="422" y2={y} className="graph-grid-line" />)}
          {[45, 118, 191, 264, 337, 410].map(x => <line key={x} x1={x} y1="22" x2={x} y2="218" className="graph-grid-line graph-grid-vertical" />)}
          <path d="M18 191 C38 183 40 136 66 149 S98 192 119 145 S149 99 172 126 S208 178 225 114 S263 70 287 107 S317 159 338 91 S380 65 422 31 L422 220 L18 220 Z" fill="url(#signalFill)" />
          <path d="M18 191 C38 183 40 136 66 149 S98 192 119 145 S149 99 172 126 S208 178 225 114 S263 70 287 107 S317 159 338 91 S380 65 422 31" className="graph-signal" stroke="url(#signalStroke)" />
          {[[119,145],[225,114],[338,91],[422,31]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r={i === 3 ? 4.5 : 3} className="graph-point" />)}
        </svg>
        <div className="graph-caption"><span>FIND THE SIGNAL</span><span>LESS NOISE / MORE CLARITY</span></div>
      </div>
      <div className="floating-metric metric-top">
        <span className="metric-label"><ScanFace size={14} /> COMPUTER VISION</span>
        <strong>90<span>%</span></strong>
        <small>reported CNN accuracy</small>
      </div>
      <div className="floating-metric metric-bottom">
        <span className="metric-label"><BarChart3 size={14} /> BUILD / EXPLORE / REFINE</span>
        <div className="mini-bars" aria-hidden="true">
          {[24, 36, 28, 51, 43, 65, 57, 83, 70, 96, 76, 89].map((height, index) => (
            <i key={index} style={{ "--bar-height": height + "%", "--bar-index": index }} />
          ))}
        </div>
        <small>ANALYSIS → VISUAL STORY</small>
      </div>
      <div className="hero-visual-footer"><span>PYTHON</span><i /><span>ML SYSTEMS</span><i /><span>DATA VISUALIZATION</span></div>
      <span className="hero-coordinate coordinate-one">22° 03' N</span>
      <span className="hero-coordinate coordinate-two">72° 55' E</span>
    </div>
  );
}

function ProjectArtwork({ variant }) {
  if (variant === "vision") {
    return (
      <div className="project-art art-vision" aria-hidden="true">
        <div className="art-topline"><span>VISION / 01</span><span>CONCEPT VISUAL</span></div>
        <div className="lesion-frame">
          <div className="lesion-rings"><i /><i /><i /></div>
          <div className="lesion-shape" />
          <div className="lesion-crosshair crosshair-a" />
          <div className="lesion-crosshair crosshair-b" />
          <span className="scan-tag">CNN / IMAGE CLASSIFICATION</span>
        </div>
        <div className="art-bottomline"><span>FEATURE EXTRACTION</span><span>90% ACCURACY*</span></div>
      </div>
    );
  }

  return (
    <div className="project-art art-analytics" aria-hidden="true">
      <div className="art-topline"><span>ANALYTICS / 02</span><span>CONCEPT VISUAL</span></div>
      <div className="analytics-surface">
        <div className="analytics-side"><i /><i /><i /><i /></div>
        <div className="analytics-main">
          <div className="analytics-toolbar"><span /><span /><span /></div>
          <div className="analytics-charts">
            <div className="analytics-card analytics-line">
              <span className="chart-label">VISUAL EXPLORATION</span>
              <svg viewBox="0 0 240 100">
                {[20, 45, 70].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} className="chart-grid" />)}
                <path d="M2 82 C25 74 30 30 58 43 S88 62 112 35 S143 49 165 26 S205 44 238 12" className="analytics-line-path" />
              </svg>
            </div>
            <div className="analytics-card analytics-bars">
              <span className="chart-label">FILTERED VIEW</span>
              <div className="analytics-bar-set">{[33, 56, 41, 74, 49, 90, 65].map((height, i) => <i key={i} style={{ height: height + "%" }} />)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="art-bottomline"><span>REACT + D3.JS</span><span>EXPLORE WITH INTENT</span></div>
    </div>
  );
}

function ProjectCard({ project, expanded, onToggle }) {
  return (
    <motion.article layout className={"project-card project-" + project.variant} whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
      <ProjectArtwork variant={project.variant} />
      <div className="project-body">
        <div className="project-meta">
          <span className="project-type"><i /> {project.kind}</span>
          <span>{project.date}</span>
        </div>
        <div className="project-title-row">
          <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
          {project.metric && <div className="project-metric"><strong>{project.metric}</strong><small>reported<br />accuracy</small></div>}
        </div>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
        <button className="case-toggle" type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={project.id + "-details"}>
          {expanded ? "Close case notes" : "Explore case notes"}
          <span className={expanded ? "toggle-icon is-open" : "toggle-icon"}><ArrowDownRight size={16} /></span>
        </button>
        {expanded && (
          <div className="case-details" id={project.id + "-details"}>
            <div><span className="case-label">THE QUESTION</span><p>{project.problem}</p></div>
            <div><span className="case-label">THE APPROACH</span><p>{project.approach}</p></div>
            <p className="case-note"><i /> {project.note}</p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  const filters = ["All", "Machine learning", "Analytics"];
  const visibleProjects = activeFilter === "All" ? projects : projects.filter(project => project.category === activeFilter);

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-shell" id="top">
        <div className="top-progress" aria-hidden="true" />
        <div className="site-wrap">
          <Header />
          <main>
            <section className="hero-section">
              <div className="hero-copy">
                <Reveal className="hero-intro"><span className="intro-square"><Sparkles size={14} /></span><span>DATA SCIENCE <i>/</i> MACHINE LEARNING</span></Reveal>
                <Reveal delay={0.06}><h1>Finding signal<br />in the <em>noise.</em></h1></Reveal>
                <Reveal delay={0.12}><p className="hero-lede">I’m Krrish — an IT graduate building at the intersection of data analysis, machine learning, and clear visual storytelling.</p></Reveal>
                <Reveal delay={0.18} className="hero-actions">
                  <a className="button button-primary" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
                  <a className="button button-secondary" href="#contact">Let’s connect <ArrowUpRight size={16} /></a>
                </Reveal>
                <Reveal delay={0.22} className="hero-facts">
                  <div><span>BASE</span><strong>Gujarat, India</strong></div>
                  <div><span>EDUCATION</span><strong>B.Tech · IT</strong></div>
                  <div><span>INTEREST</span><strong>Applied ML</strong></div>
                </Reveal>
              </div>
              <Reveal className="hero-art-wrap" delay={0.12}><HeroVisual /></Reveal>
              <div className="hero-side-note">FROM RAW DATA TO BETTER QUESTIONS <span>SCROLL TO EXPLORE ↓</span></div>
            </section>

            <section className="signal-strip" aria-label="Portfolio highlights">
              <div className="signal-strip-intro"><span className="tiny-label">AT A GLANCE</span><p>Curiosity, translated into projects.</p></div>
              <div className="signal-stat"><strong>02</strong><span>FEATURED PROJECTS</span></div>
              <div className="signal-stat"><strong>02</strong><span>DATA INTERNSHIPS</span></div>
              <div className="signal-stat"><strong>8.0<span>/10</span></strong><span>B.TECH CGPA</span></div>
              <div className="signal-mark" aria-hidden="true"><span>KK</span><i /></div>
            </section>

            <section className="section work-section" id="work">
              <Reveal className="section-heading">
                <SectionEyebrow number="01">SELECTED WORK</SectionEyebrow>
                <div className="section-heading-grid"><h2>Projects with<br /><em>a point of view.</em></h2><p>Two different ways to work with information: teaching a model to recognize patterns, and making complex data easier to explore.</p></div>
              </Reveal>
              <div className="project-toolbar">
                <div className="project-count"><span className="count-dot" /> {String(visibleProjects.length).padStart(2, "0")} PROJECTS</div>
                <div className="filter-group" role="group" aria-label="Filter projects by category">
                  {filters.map(filter => (
                    <button type="button" key={filter} className={activeFilter === filter ? "filter-chip is-active" : "filter-chip"} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>
                  ))}
                </div>
              </div>
              <div className="project-grid">
                {visibleProjects.map((project, index) => (
                  <Reveal key={project.id} delay={index * 0.07} className="project-reveal">
                    <ProjectCard project={project} expanded={expandedProject === project.id} onToggle={() => setExpandedProject(current => current === project.id ? null : project.id)} />
                  </Reveal>
                ))}
              </div>
              <div className="project-disclaimer"><span>✳</span><p>Project visuals are custom illustrations for this portfolio. Use the case notes to see the work described in the available project summary; repository and live-demo links will be added when the project source is published.</p></div>
            </section>

            <section className="capabilities-section" id="capabilities">
              <div className="section section-capabilities">
                <Reveal className="section-heading">
                  <SectionEyebrow number="02">CAPABILITIES</SectionEyebrow>
                  <div className="section-heading-grid"><h2>Useful tools.<br /><em>Clear thinking.</em></h2><p>The stack is a toolkit, not a checklist. I use programming, analysis and visualization to make a problem easier to understand and act on.</p></div>
                </Reveal>
                <div className="skills-grid">
                  {skillGroups.map((group, index) => {
                    const Icon = group.icon;
                    return (
                      <Reveal key={group.id} delay={index * 0.05} className={"skill-card skill-card-" + group.id}>
                        <div className="skill-card-top"><span>{group.id} / EXPERTISE</span><Icon size={20} strokeWidth={1.5} /></div>
                        <h3>{group.title}</h3><p>{group.description}</p>
                        <div className="tag-list skill-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="section experience-section" id="experience">
              <Reveal className="section-heading">
                <SectionEyebrow number="03">EXPERIENCE</SectionEyebrow>
                <div className="section-heading-grid"><h2>Learning by<br /><em>doing the work.</em></h2><p>Internship experience across analytics and data science — cleaning and exploring datasets, building helpful reporting interfaces, and working through practical requirements.</p></div>
              </Reveal>
              <div className="experience-list">
                {experience.map((item, index) => (
                  <Reveal key={item.company} delay={index * 0.08} className="experience-item">
                    <div className="experience-period"><span>{item.period}</span><i /></div>
                    <div className="experience-main">
                      <div className="experience-title-row">
                        <div><span className="experience-kind">{item.kind}</span><h3>{item.role}</h3><p className="experience-company">{item.company} <i>·</i> {item.location}</p></div>
                        <span className="experience-year">{item.year}</span>
                      </div>
                      <ul>{item.bullets.map(bullet => <li key={bullet}><Check size={14} />{bullet}</li>)}</ul>
                      <div className="tag-list experience-tags">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
                    </div>
                    <div className="experience-index">{String(index + 1).padStart(2, "0")}</div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section className="credentials-section" id="about">
              <div className="section credentials-grid">
                <Reveal className="education-panel">
                  <SectionEyebrow number="04">EDUCATION</SectionEyebrow>
                  <div className="credential-icon"><GraduationCap size={22} /></div>
                  <span className="credential-date">OCT 2022 — APR 2026</span>
                  <h2>Information<br /><em>Technology.</em></h2>
                  <p className="degree-name">Bachelor of Technology (B.Tech)</p>
                  <p className="university-name">Kiran Pallavi Global University · Gujarat</p>
                  <div className="gpa-row"><span>ACADEMIC RESULT</span><strong>8.0 <small>/ 10 CGPA</small></strong></div>
                </Reveal>
                <Reveal className="certifications-panel" delay={0.08}>
                  <SectionEyebrow number="05">CERTIFICATIONS</SectionEyebrow>
                  <h2>Keep learning.<br /><em>Keep building.</em></h2>
                  <div className="certification-list">
                    {certifications.map((cert, index) => (
                      <div className="certification-row" key={cert.name}>
                        <span className="cert-number">{String(index + 1).padStart(2, "0")}</span>
                        <div><strong>{cert.name}</strong><small>{cert.issuer}</small></div>
                        <span className="cert-date">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>

            <section className="contact-section" id="contact">
              <div className="section contact-inner">
                <Reveal className="contact-copy">
                  <SectionEyebrow number="06">GET IN TOUCH</SectionEyebrow>
                  <div className="contact-headline">Have a question<br />worth <em>exploring?</em></div>
                  <p>I’m interested in thoughtful teams, data-driven problems and opportunities to keep growing in analytics and machine learning.</p>
                  <a className="button button-primary" href="mailto:kaptankrrish102030@gmail.com"><Mail size={16} /> Send me an email <ArrowUpRight size={15} /></a>
                </Reveal>
                <Reveal className="contact-card" delay={0.12}>
                  <span className="tiny-label">FIND ME ELSEWHERE</span>
                  <a href="https://github.com/Krrish19912" target="_blank" rel="noreferrer">
                    <span className="contact-link-icon"><Github size={18} /></span>
                    <span className="contact-link-copy"><strong>GitHub</strong><small>Code, experiments and projects</small></span>
                    <ExternalLink size={16} className="contact-link-arrow" />
                  </a>
                  <a href="https://linkedin.com/in/kaptankrrish" target="_blank" rel="noreferrer">
                    <span className="contact-link-icon"><Linkedin size={18} /></span>
                    <span className="contact-link-copy"><strong>LinkedIn</strong><small>Connect professionally</small></span>
                    <ExternalLink size={16} className="contact-link-arrow" />
                  </a>
                  <a href="mailto:kaptankrrish102030@gmail.com">
                    <span className="contact-link-icon"><Mail size={18} /></span>
                    <span className="contact-link-copy"><strong>Email</strong><small>kaptankrrish102030@gmail.com</small></span>
                    <ArrowUpRight size={17} className="contact-link-arrow" />
                  </a>
                </Reveal>
              </div>
            </section>
          </main>
          <footer className="site-footer">
            <a className="footer-brand" href="#top"><span className="brand-mark">K<span>.</span></span><span>KRRISH / PORTFOLIO</span></a>
            <span className="footer-note">BUILT AROUND CURIOSITY & CLARITY</span>
            <a className="footer-top" href="#top">BACK TO TOP <ArrowUpRight size={13} /></a>
            <span className="footer-year">© {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
