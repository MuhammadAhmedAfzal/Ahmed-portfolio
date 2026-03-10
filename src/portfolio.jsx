import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Services", "Contact"];

const SKILLS = {
  Frontend: ["React", "Angular", "HTML", "CSS", "JavaScript"],
  Backend: ["Node.js", "Express.js", "Python"],
  Database: ["MongoDB", "MySQL"],
  AWS: ["Cognito", "IAM", "SNS", "SQS", "S3", "CloudWatch", "Lambda"],
  Testing: ["Jest", "Chai", "React Testing Library", "Angular Testing Library"],
};

const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "Swipbox",
    period: "Feb 2023 – Present",
    location: "Islamabad",
    badge: "🏆 Rising Star Award",
    points: [
      "Developed scalable backend APIs using Node.js, improving system performance by 30% and reducing response time.",
      "Built responsive Angular applications, enhancing user experience and increasing client engagement.",
      "Implemented secure authentication with AWS Cognito, JWT, and IAM.",
      "Designed event-driven architecture using AWS SNS & SQS for async processing.",
      "Optimized MySQL queries and database design, reducing data retrieval time.",
      "Managed file storage with AWS S3 and deployed cloud-native solutions.",
    ],
  },
  {
    role: "Web Developer",
    company: "Smart IT Solutions",
    period: "Jan 2022 – Nov 2022",
    location: "Sialkot",
    badge: null,
    points: [
      "Developed and maintained full-stack web applications with RESTful APIs.",
      "Implemented database design, query optimization, and backend business logic.",
      "Performed unit and integration testing to ensure code quality.",
      "Managed CI/CD pipelines and deployed applications to production.",
      "Monitored production systems, resolved bugs, and optimized performance.",
    ],
  },
];

const SERVICES = [
  {
    icon: "🌐",
    title: "Full-Stack Web Applications",
    desc: "End-to-end web apps using React or Angular on the frontend, Node.js/Express on the backend — from authentication to deployment.",
    tags: ["React", "Angular", "Node.js", "REST APIs"],
  },
  {
    icon: "☁️",
    title: "Cloud-Native AWS Solutions",
    desc: "Architect and deploy scalable, highly available systems on AWS — storage, queuing, serverless functions, and user authentication.",
    tags: ["S3", "Lambda", "SNS", "SQS", "Cognito"],
  },
  {
    icon: "🔐",
    title: "Secure Authentication Systems",
    desc: "Implement robust auth flows with JWT, AWS Cognito, IAM roles, and fine-grained access control for enterprise-grade security.",
    tags: ["JWT", "AWS Cognito", "IAM", "OAuth"],
  },
  {
    icon: "⚡",
    title: "Event-Driven Microservices",
    desc: "Design loosely coupled, async architectures using message queues and pub/sub patterns that scale gracefully under load.",
    tags: ["SNS", "SQS", "Microservices", "Event-Driven"],
  },
  {
    icon: "🗄️",
    title: "Database Design & Optimization",
    desc: "Design efficient schemas, write optimized queries, and tune both SQL and NoSQL databases for performance and reliability.",
    tags: ["MySQL", "MongoDB", "Query Optimization"],
  },
  {
    icon: "🚀",
    title: "CI/CD & DevOps Pipelines",
    desc: "Set up automated testing, build, and deployment pipelines so your team ships fast with confidence and zero downtime.",
    tags: ["CI/CD", "AWS CloudWatch", "Testing", "Deployment"],
  },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const scrollY = useScrollY();
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ahmedmalikoffice44@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0f", color: "#e8e4dc", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;1,9..40,300&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 2px; }

        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }

        .hero-line {
          background: linear-gradient(90deg, #c8a96e, #e8d5b0, #c8a96e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .skill-pill {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(.16,1,.3,1);
        }
        .skill-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #c8a96e22, #c8a96e44);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(.16,1,.3,1);
        }
        .skill-pill:hover::before { transform: translateX(0); }
        .skill-pill:hover { border-color: #c8a96e !important; color: #c8a96e !important; transform: translateY(-2px); }

        .exp-card {
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
          position: relative;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, #c8a96e, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .exp-card:hover::before { opacity: 1; }
        .exp-card:hover { background: #12121a !important; }

        .nav-link {
          position: relative;
          transition: color 0.3s;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #c8a96e;
          transition: width 0.3s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link:hover, .nav-link.active { color: #c8a96e !important; }

        .glow-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
        }
        .glow-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 2s ease-out infinite;
        }

        .btn-primary {
          background: linear-gradient(135deg, #c8a96e, #a8843e);
          color: #0a0a0f;
          border: none;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s cubic-bezier(.16,1,.3,1);
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px #c8a96e44; }

        .btn-ghost {
          background: transparent;
          color: #e8e4dc;
          border: 1px solid #2a2a35;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.16,1,.3,1);
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { border-color: #c8a96e; color: #c8a96e; transform: translateY(-2px); }

        .section-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c8a96e;
          font-weight: 600;
        }

        .mesh-bg {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .hero-name { font-size: 13vw !important; }
          .hide-mobile { display: none !important; }
          .mobile-col { flex-direction: column !important; }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 5%",
        background: scrollY > 60 ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid #1e1e28" : "none",
        transition: "all 0.4s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, letterSpacing: "0.02em", color: "#c8a96e" }}>
          MA<span style={{ color: "#e8e4dc" }}>.</span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <span key={l} className={`nav-link ${activeNav === l ? "active" : ""}`}
              style={{ fontSize: 13, letterSpacing: "0.08em", color: "#9a968f", fontWeight: 500 }}
              onClick={() => { setActiveNav(l); scrollTo(l); }}>
              {l.toUpperCase()}
            </span>
          ))}
          <button className="btn-primary" onClick={copyEmail}
            style={{ padding: "10px 22px", borderRadius: 6, fontSize: 12, letterSpacing: "0.06em" }}>
            {copiedEmail ? "✓ COPIED" : "HIRE ME"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div style={{ cursor: "pointer", display: "none" }} className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ width: 24, height: 2, background: "#e8e4dc", marginBottom: 5, transition: "all 0.3s" }} />
          <div style={{ width: 16, height: 2, background: "#c8a96e" }} />
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ fontSize: 28, fontFamily: "'Instrument Serif', serif", color: "#e8e4dc", cursor: "pointer" }}
              onClick={() => { scrollTo(l); setMenuOpen(false); }}>{l}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
        {/* Mesh blobs */}
        <div className="mesh-bg" style={{ width: 600, height: 600, background: "#c8a96e", opacity: 0.04, top: -200, right: -100 }} />
        <div className="mesh-bg" style={{ width: 400, height: 400, background: "#6e8ac8", opacity: 0.05, bottom: 0, left: -100 }} />

        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 60 }}>

            <div style={{ flex: "1 1 600px" }}>
              {/* Status badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#12121a", border: "1px solid #1e1e28", borderRadius: 100, padding: "8px 16px", marginBottom: 48 }}>
                <div className="glow-dot" />
                <span style={{ fontSize: 12, letterSpacing: "0.12em", color: "#9a968f" }}>AVAILABLE FOR OPPORTUNITIES</span>
              </div>

              {/* Name */}
              <h1 className="hero-name" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(52px, 8vw, 100px)", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 32 }}>
                <span className="hero-line">Muhammad</span>
                <br />
                <span style={{ color: "#e8e4dc", fontStyle: "italic" }}>Ahmed</span>
              </h1>

              {/* Title */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 40, height: 1, background: "#c8a96e" }} />
                <span style={{ fontSize: 14, letterSpacing: "0.2em", color: "#9a968f", fontWeight: 600 }}>SOFTWARE ENGINEER</span>
                <div style={{ width: 40, height: 1, background: "#c8a96e" }} />
              </div>

              {/* Bio */}
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#9a968f", maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>
                4+ years crafting <span style={{ color: "#e8e4dc", fontStyle: "italic" }}>scalable full-stack applications</span> with MERN/MEAN stacks and cloud-native AWS solutions. Building high-performance systems that support global users.
              </p>

              {/* CTA row */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={copyEmail}
                  style={{ padding: "14px 32px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em" }}>
                  {copiedEmail ? "✓ EMAIL COPIED" : "GET IN TOUCH"}
                </button>
                <button className="btn-ghost"
                  onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ padding: "14px 32px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em" }}>
                  VIEW WORK ↓
                </button>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ flex: "0 1 280px", display: "flex", flexDirection: "column", gap: 2, animation: "float 6s ease-in-out infinite" }}>
              {[
                { n: "4+", label: "Years Experience" },
                { n: "30%", label: "API Performance Boost" },
                { n: "2", label: "Companies Worked" },
                { n: "🏆", label: "Rising Star Award" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? "#0e0e16" : "#12121a",
                  border: "1px solid #1e1e28",
                  borderRadius: i === 0 ? "12px 12px 0 0" : i === 3 ? "0 0 12px 12px" : 0,
                  padding: "28px 32px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 42, color: "#c8a96e", lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: 12, color: "#6a6860", letterSpacing: "0.1em", textAlign: "right", maxWidth: 100 }}>{s.label.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 1, height: 48, background: "linear-gradient(180deg, #c8a96e, transparent)" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a5850" }}>SCROLL</span>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "120px 5%", background: "#0c0c14", position: "relative" }}>
        <div className="mesh-bg" style={{ width: 500, height: 500, background: "#c8a96e", opacity: 0.03, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <AnimatedSection>
            <span className="section-label">EXPERTISE</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.1, margin: "16px 0 64px", letterSpacing: "-0.02em" }}>
              Technical <em>Arsenal</em>
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {Object.entries(SKILLS).map(([cat, items], ci) => (
              <AnimatedSection key={cat}>
                <div style={{
                  background: "#0e0e16",
                  border: "1px solid #1e1e28",
                  borderRadius: 12,
                  padding: "32px",
                  transition: "border-color 0.3s",
                  height: "100%",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8a96e" }} />
                    <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c8a96e", fontWeight: 600 }}>{cat.toUpperCase()}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((skill) => (
                      <span key={skill}
                        className="skill-pill"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 6,
                          border: "1px solid #2a2a35",
                          fontSize: 12,
                          color: hoveredSkill === skill ? "#c8a96e" : "#9a968f",
                          letterSpacing: "0.04em",
                          cursor: "default",
                        }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "120px 5%", background: "#0a0a0f", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <AnimatedSection>
            <span className="section-label">CAREER</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.1, margin: "16px 0 80px", letterSpacing: "-0.02em" }}>
              Work <em>Experience</em>
            </h2>
          </AnimatedSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, #c8a96e44, transparent)", display: "none" }} />

            {EXPERIENCES.map((exp, i) => (
              <AnimatedSection key={i}>
                <div className="exp-card" style={{
                  background: "#0c0c14",
                  border: "1px solid #1e1e28",
                  borderRadius: 12,
                  padding: "40px 48px",
                  marginBottom: 16,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.01em" }}>{exp.role}</h3>
                        {exp.badge && (
                          <span style={{ fontSize: 11, background: "#c8a96e18", border: "1px solid #c8a96e44", color: "#c8a96e", padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em" }}>
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, color: "#c8a96e", fontWeight: 600 }}>{exp.company}</span>
                        <span style={{ color: "#3a3830" }}>·</span>
                        <span style={{ fontSize: 13, color: "#6a6860", letterSpacing: "0.06em" }}>{exp.location}</span>
                      </div>
                    </div>
                    <div style={{ background: "#0a0a0f", border: "1px solid #1e1e28", borderRadius: 8, padding: "10px 20px", textAlign: "center" }}>
                      <span style={{ fontSize: 12, color: "#9a968f", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{exp.period}</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {exp.points.map((pt, j) => (
                      <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8a96e", marginTop: 9, flexShrink: 0 }} />
                        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#7a7870", fontWeight: 300 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education */}
          <AnimatedSection>
            <div style={{ marginTop: 16, background: "#0c0c14", border: "1px solid #1e1e28", borderRadius: 12, padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#c8a96e18", border: "1px solid #c8a96e44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  🎓
                </div>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#c8a96e", marginBottom: 4 }}>EDUCATION</p>
                  <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20 }}>Bachelor in Software Engineering</h4>
                  <p style={{ fontSize: 13, color: "#6a6860", marginTop: 2 }}>University of Lahore</p>
                </div>
              </div>
              <span style={{ fontSize: 12, color: "#9a968f", letterSpacing: "0.08em" }}>2017 – 2021</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICES / WHAT I CAN BUILD */}
      <section id="services" style={{ padding: "120px 5%", background: "#0c0c14", position: "relative", overflow: "hidden" }}>
        <div className="mesh-bg" style={{ width: 500, height: 500, background: "#6e8ac8", opacity: 0.03, top: "30%", right: -100 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <AnimatedSection>
            <span className="section-label">CAPABILITIES</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, margin: "16px 0 72px" }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                What I Can <em>Build</em><br />
                <span style={{ color: "#c8a96e" }}>For You</span>
              </h2>
              <p style={{ fontSize: 15, color: "#7a7870", maxWidth: 360, lineHeight: 1.8, fontWeight: 300 }}>
                From idea to production — here's exactly what you get when you work with me.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 2 }}>
            {SERVICES.map((s, i) => (
              <AnimatedSection key={i}>
                <div style={{
                  background: i % 2 === 0 ? "#0e0e16" : "#0a0a12",
                  border: "1px solid #1e1e28",
                  borderRadius: i === 0 ? "12px 0 0 0" : i === 1 ? "0 12px 0 0" : i === 4 ? "0 0 0 12px" : i === 5 ? "0 0 12px 0" : 0,
                  padding: "40px 36px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
                  cursor: "default",
                  minHeight: 260,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#13131e";
                    e.currentTarget.style.borderColor = "#c8a96e44";
                    e.currentTarget.querySelector(".svc-icon").style.transform = "scale(1.2) rotate(-5deg)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = i % 2 === 0 ? "#0e0e16" : "#0a0a12";
                    e.currentTarget.style.borderColor = "#1e1e28";
                    e.currentTarget.querySelector(".svc-icon").style.transform = "scale(1) rotate(0deg)";
                  }}
                >
                  {/* Number watermark */}
                  <span style={{ position: "absolute", top: 20, right: 28, fontFamily: "'Instrument Serif', serif", fontSize: 72, color: "#c8a96e08", lineHeight: 1, userSelect: "none" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="svc-icon" style={{ fontSize: 32, marginBottom: 20, display: "inline-block", transition: "transform 0.4s cubic-bezier(.16,1,.3,1)" }}>
                    {s.icon}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.3, marginBottom: 14, letterSpacing: "-0.01em" }}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "#7a7870", fontWeight: 300, marginBottom: 24 }}>
                    {s.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        color: "#c8a96e",
                        background: "#c8a96e12",
                        border: "1px solid #c8a96e30",
                        padding: "4px 10px",
                        borderRadius: 100,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <AnimatedSection>
            <div style={{ marginTop: 2, background: "linear-gradient(135deg, #c8a96e18, #c8a96e08)", border: "1px solid #c8a96e30", borderRadius: "0 0 12px 12px", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c8a96e", marginBottom: 8 }}>READY TO START?</p>
                <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, letterSpacing: "-0.01em" }}>
                  Let's turn your idea into a <em>live product</em>.
                </h4>
              </div>
              <button className="btn-primary" onClick={copyEmail}
                style={{ padding: "14px 32px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em", flexShrink: 0 }}>
                {copiedEmail ? "✓ EMAIL COPIED" : "START A PROJECT →"}
              </button>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 5%", background: "#0c0c14", position: "relative", overflow: "hidden" }}>
        <div className="mesh-bg" style={{ width: 700, height: 700, background: "#c8a96e", opacity: 0.04, bottom: -200, right: -200 }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <span className="section-label">LET'S TALK</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(40px,6vw,80px)", lineHeight: 1.05, margin: "16px 0 24px", letterSpacing: "-0.03em" }}>
              Got a project<br /><em style={{ color: "#c8a96e" }}>in mind?</em>
            </h2>
            <p style={{ fontSize: 16, color: "#7a7870", maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.8, fontWeight: 300 }}>
              I'm open to new opportunities and collaborations. Let's build something remarkable together.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={copyEmail}
                style={{ padding: "16px 36px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em" }}>
                {copiedEmail ? "✓ COPIED TO CLIPBOARD" : "📋 COPY EMAIL"}
              </button>
              <a href="https://linkedin.com/in/malikahmedafzal" target="_blank" rel="noreferrer"
                style={{ textDecoration: "none" }}>
                <button className="btn-ghost"
                  style={{ padding: "16px 36px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em" }}>
                  LINKEDIN ↗
                </button>
              </a>
              <a href="tel:+923125072625" style={{ textDecoration: "none" }}>
                <button className="btn-ghost"
                  style={{ padding: "16px 36px", borderRadius: 8, fontSize: 13, letterSpacing: "0.08em" }}>
                  📞 CALL
                </button>
              </a>
            </div>

            {/* Contact details */}
            <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
              {[
                { label: "EMAIL", value: "ahmedmalikoffice44@gmail.com" },
                { label: "PHONE", value: "+92 312 507 2625" },
                { label: "LOCATION", value: "Sialkot / Islamabad, PK" },
              ].map(c => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#c8a96e", marginBottom: 6 }}>{c.label}</p>
                  <p style={{ fontSize: 13, color: "#9a968f" }}>{c.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 5%", borderTop: "1px solid #1e1e28", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: "#c8a96e" }}>MA.</span>
        <span style={{ fontSize: 11, color: "#4a4840", letterSpacing: "0.12em" }}>
          © {new Date().getFullYear()} MUHAMMAD AHMED · ALL RIGHTS RESERVED
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["GitHub", "LinkedIn"].map(s => (
            <span key={s} style={{ fontSize: 11, color: "#6a6860", letterSpacing: "0.1em", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#c8a96e"}
              onMouseLeave={e => e.target.style.color = "#6a6860"}>
              {s}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}