import { useState, useEffect } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import AvatarPhoto from "../components/AvatarPhoto";
import CV from "../data/cv";

/* ── Decorative vertical grid lines ── */
const GridLines = ({ count }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        left: `${(i + 1) * (100 / (count + 1))}%`,
        top: 0, bottom: 0,
        width: 1,
        background: "rgba(255,255,255,0.04)",
      }} />
    ))}
  </div>
);

/* ── Animated scroll indicator ── */
const ScrollHint = ({ visible }) => (
  <div style={{
    position: "absolute", bottom: 28, left: "50%",
    transform: "translateX(-50%)",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    opacity: visible ? 0.45 : 0,
    transition: "opacity 1s 1.2s",
  }}>
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 9,
      letterSpacing: 3, color: "#fff", textTransform: "uppercase",
    }}>
      scroll
    </span>
    <div style={{
      width: 1, height: 40,
      background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
      animation: "pulse 2s infinite",
    }} />
  </div>
);

/* ── Hero ── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: `0 ${px}px ${isMobile ? 56 : 72}px`,
      position: "relative", overflow: "hidden",
    }}>
      <GridLines count={isMobile ? 3 : 5} />

      {/* Avatar — desktop & tablet only */}
      {!isMobile && <AvatarPhoto loaded={loaded} />}

      {/* Ghost year */}
      <div style={{
        position: "absolute", top: "22%",
        right: isMobile ? 12 : isTablet ? 24 : 48,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(60px, 14vw, 160px)",
        color: "rgba(255,255,255,0.03)",
        lineHeight: 1, userSelect: "none",
      }}>
        2000
      </div>

      {/* Tag pill */}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s 0.2s", marginBottom: isMobile ? 16 : 24 }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: isMobile ? 9 : 11, letterSpacing: 2,
          color: "#E8FF47", textTransform: "uppercase",
          border: "1px solid rgba(232,255,71,0.4)",
          padding: isMobile ? "4px 10px" : "5px 12px",
          borderRadius: 2,
        }}>
          {isMobile ? "( FE Dev — Da Nang )" : "( Frontend Developer — Da Nang, VN )"}
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: isMobile
          ? "clamp(52px, 16vw, 80px)"
          : isTablet
          ? "clamp(64px, 11vw, 110px)"
          : "clamp(72px, 10vw, 140px)",
        lineHeight: 0.9, letterSpacing: 2,
        margin: "0 0 28px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(60px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}>
        <span style={{ color: "#fff",    display: "block" }}>NGUYEN</span>
        <span style={{ color: "#E8FF47", display: "block" }}>VAN GIANG</span>
      </h1>

      {/* Objective + CTA circle */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 24 : 32,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.7s 0.7s",
      }}>
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: isMobile ? 12 : 13,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 480, lineHeight: 1.8, margin: 0,
        }}>
          {CV.objective}
        </p>

        <a
          href={`mailto:${CV.email}`}
          data-hover
          style={{
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: isMobile ? 96 : 120, height: isMobile ? 96 : 120,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            fontFamily: "'DM Mono', monospace",
            fontSize: isMobile ? 9 : 10, letterSpacing: 2,
            color: "#fff", textDecoration: "none",
            textTransform: "uppercase", textAlign: "center", lineHeight: 1.4,
            marginLeft: isMobile ? 0 : "auto",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background   = "#E8FF47";
            e.currentTarget.style.color        = "#080808";
            e.currentTarget.style.borderColor  = "#E8FF47";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background   = "transparent";
            e.currentTarget.style.color        = "#fff";
            e.currentTarget.style.borderColor  = "rgba(255,255,255,0.15)";
          }}
        >
          Get In<br />Touch
        </a>
      </div>

      {!isMobile && <ScrollHint visible={loaded} />}
    </section>
  );
};

export default Hero;
