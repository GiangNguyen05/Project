import useBreakpoint from "../hooks/useBreakpoint";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import SectionHeading from "../components/SectionHeading";
import CV from "../data/cv";

/* ── CTA Button (filled) ── */
const FilledButton = ({ href, label, isMobile }) => (
  <a
    href={href}
    style={{
      fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2,
      color: "#080808", background: "#E8FF47",
      padding: isMobile ? "14px 28px" : "16px 36px",
      textDecoration: "none", textTransform: "uppercase",
      borderRadius: 2, transition: "opacity 0.2s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
  >
    {label}
  </a>
);

/* ── CTA Button (outlined) ── */
const OutlineButton = ({ href, label, isMobile }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2,
      color: "#fff", background: "transparent",
      padding: isMobile ? "14px 28px" : "16px 36px",
      textDecoration: "none", textTransform: "uppercase",
      borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "#E8FF47";
      e.currentTarget.style.color       = "#E8FF47";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
      e.currentTarget.style.color       = "#fff";
    }}
  >
    {label}
  </a>
);

/* ── Footer bar ── */
const Footer = ({ isMobile }) => (
  <div style={{
    marginTop: 64, paddingTop: 28,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? 8 : 0,
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: 2, color: "rgba(255,255,255,0.25)",
    textTransform: "uppercase",
  }}>
    <span>© 2025 Nguyen Van Giang</span>
    <span>Frontend Developer — Da Nang, VN</span>
  </div>
);

/* ── Contact section ── */
const Contact = () => {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const py = isMobile ? 80 : 120;

  return (
    <section
      id="contact"
      style={{
        padding: `${py}px ${px}px ${isMobile ? 60 : 80}px`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="( 04 — Contact )" />
          <SectionHeading
            lines={[
              { text: "LET'S" },
              { text: "WORK",    accent: true },
              { text: "TOGETHER" },
            ]}
            mobileSize="clamp(44px,13vw,80px)"
            tabletSize="clamp(56px,10vw,100px)"
            desktopSize="clamp(56px,9vw,120px)"
            marginBottom={0}
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <FilledButton
              href={`mailto:${CV.email}`}
              label="Send Email"
              isMobile={isMobile}
            />
            <OutlineButton
              href={`https://${CV.github}`}
              label="GitHub ↗"
              isMobile={isMobile}
            />
          </div>
        </FadeIn>
      </div>

      <Footer isMobile={isMobile} />
    </section>
  );
};

export default Contact;
