import useBreakpoint from "../hooks/useBreakpoint";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import SectionHeading from "../components/SectionHeading";
import CV from "../data/cv";

/* ── Single skill category card ── */
const SkillCard = ({ category, items, isMobile }) => (
  <div
    style={{
      padding: isMobile ? "20px 16px" : "32px 28px",
      border: "1px solid rgba(255,255,255,0.06)",
      height: "100%",
      transition: "border-color 0.3s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(232,255,71,0.3)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
  >
    <div style={{
      fontFamily: "'DM Mono', monospace", fontSize: 9,
      letterSpacing: 3, color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase", marginBottom: 16,
    }}>
      {category}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map((skill) => (
        <span key={skill} style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: isMobile ? 10 : 12,
          color: "#fff",
          padding: isMobile ? "4px 8px" : "6px 12px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
        }}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

/* ── Skills section ── */
const Skills = () => {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const py = isMobile ? 80 : 120;

  return (
    <section
      id="skills"
      style={{
        padding: `${py}px ${px}px`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="( 02 — Skills )" />
          <SectionHeading
            lines={[{ text: "TECH" }, { text: "STACK", accent: true }]}
            marginBottom={48}
          />
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 2,
        }}>
          {Object.entries(CV.skills).map(([cat, items], i) => (
            <FadeIn key={cat} delay={i * 0.08}>
              <SkillCard category={cat} items={items} isMobile={isMobile} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
