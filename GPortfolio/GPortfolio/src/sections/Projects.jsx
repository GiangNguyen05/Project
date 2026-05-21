import useBreakpoint from "../hooks/useBreakpoint";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import SectionHeading from "../components/SectionHeading";
import CV from "../data/cv";

/* ── Stack tag pill ── */
const StackTag = ({ label, color }) => (
  <span style={{
    fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1,
    color,
    padding: "3px 10px",
    border: `1px solid ${color}44`,
    borderRadius: 2,
  }}>
    {label}
  </span>
);

/* ── GitHub link button ── */
const GithubLink = ({ href, color }) => (
  <a
    href={`https://${href}`}
    target="_blank"
    rel="noreferrer"
    style={{
      fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2,
      color: "rgba(255,255,255,0.4)", textDecoration: "none",
      textTransform: "uppercase",
      border: "1px solid rgba(255,255,255,0.12)",
      padding: "8px 14px", borderRadius: 2,
      transition: "all 0.2s", whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color       = color;
      e.currentTarget.style.borderColor = `${color}66`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color       = "rgba(255,255,255,0.4)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
    }}
  >
    GitHub ↗
  </a>
);

/* ── Single project row ── */
const ProjectCard = ({ project, index, isMobile, isTablet }) => {
  const { name, type, stack, desc, color, link } = project;

  return (
    <div
      style={{
        padding: isMobile ? "24px 20px" : isTablet ? "28px 24px" : "36px 32px",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}44`;
        e.currentTarget.style.background  = `${color}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background  = "transparent";
      }}
    >
      {/* Index + title row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: isMobile ? 12 : 20, marginBottom: 12 }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isMobile ? 32 : 48,
          color: "rgba(255,255,255,0.08)",
          lineHeight: 1, flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: isMobile ? 22 : 28,
              color: "#fff", margin: 0, letterSpacing: 1,
            }}>
              {name}
            </h3>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9,
              letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
            }}>
              {type}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: isMobile ? 11 : 12,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.7, margin: "0 0 14px", maxWidth: 580,
      }}>
        {desc}
      </p>

      {/* Stack tags + optional GitHub */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {stack.map((tag) => (
            <StackTag key={tag} label={tag} color={color} />
          ))}
        </div>
        {link && <GithubLink href={link} color={color} />}
      </div>
    </div>
  );
};

/* ── Projects section ── */
const Projects = () => {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const py = isMobile ? 80 : 120;

  return (
    <section id="projects" style={{ padding: `${py}px ${px}px`, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="( 03 — Work )" />
          <SectionHeading
            lines={[{ text: "SELECTED" }, { text: "PROJECTS", accent: true }]}
            marginBottom={40}
          />
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {CV.projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.1}>
              <ProjectCard
                project={project}
                index={i}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
