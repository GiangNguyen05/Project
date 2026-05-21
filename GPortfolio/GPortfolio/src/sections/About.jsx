import useBreakpoint from "../hooks/useBreakpoint";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import SectionHeading from "../components/SectionHeading";
import CV from "../data/cv";

/* ── Contact info row ── */
const InfoRow = ({ label, value, href, isMobile }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
    flexWrap: isMobile ? "wrap" : "nowrap", gap: 8,
  }}>
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 10,
      letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
    }}>
      {label}
    </span>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" style={{
        fontFamily: "'DM Mono', monospace", fontSize: isMobile ? 11 : 13,
        color: "#E8FF47", textDecoration: "none", wordBreak: "break-all",
      }}>
        {value}
      </a>
    ) : (
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: isMobile ? 11 : 13,
        color: "rgba(255,255,255,0.7)",
      }}>
        {value}
      </span>
    )}
  </div>
);

/* ── Education card ── */
const EducationCard = ({ data, isMobile }) => (
  <div style={{ marginTop: 28, padding: "20px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 16 : 18, color: "#fff", letterSpacing: 1 }}>
        {data.degree}
      </span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#E8FF47" }}>
        {data.period}
      </span>
    </div>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
      {data.school}
    </div>
    {data.highlights.map((h, i) => (
      <div key={i} style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11,
        color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
        paddingLeft: 12, borderLeft: "2px solid rgba(232,255,71,0.3)", marginBottom: 4,
      }}>
        — {h}
      </div>
    ))}
  </div>
);

/* ── About section ── */
const About = () => {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const py = isMobile ? 80 : 120;

  const contactRows = [
    { label: "Email",    value: CV.email,    href: `mailto:${CV.email}` },
    { label: "Phone",    value: CV.phone },
    { label: "Location", value: CV.location },
    { label: "GitHub",   value: CV.github,   href: `https://${CV.github}` },
  ];

  return (
    <section id="about" style={{ padding: `${py}px ${px}px`, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : isTablet ? 48 : 80,
          alignItems: "start",
        }}>
          {/* Left col */}
          <FadeIn>
            <SectionLabel text="( 01 — About )" />
            <SectionHeading
              lines={[
                { text: "BUILDING" },
                { text: "INTERFACES", accent: true },
                { text: "THAT MATTER" },
              ]}
              marginBottom={24}
            />
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 13,
              color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 440,
            }}>
              {CV.objective}
            </p>
          </FadeIn>

          {/* Right col */}
          <FadeIn delay={isMobile ? 0 : 0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {contactRows.map((row) => (
                <InfoRow key={row.label} {...row} isMobile={isMobile} />
              ))}
              <EducationCard data={CV.education} isMobile={isMobile} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
