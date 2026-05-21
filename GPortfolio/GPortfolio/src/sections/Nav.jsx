import { useState, useEffect } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import CV from "../data/cv";

const NAV_ITEMS = ["about", "skills", "projects", "contact"];

/* ── Hamburger icon ── */
const Hamburger = ({ open, onClick }) => (
  <button
    onClick={onClick}
    aria-label={open ? "Close menu" : "Open menu"}
    style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
  >
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        display: "block",
        width: i === 1 && open ? 16 : 24,
        height: 2,
        background: open ? "#E8FF47" : "#fff",
        transition: "all 0.3s",
        transformOrigin: "left",
        transform:
          open && i === 0 ? "rotate(40deg) translateY(-1px)" :
          open && i === 2 ? "rotate(-40deg) translateY(1px)" : "none",
        opacity: open && i === 1 ? 0 : 1,
      }} />
    ))}
  </button>
);

/* ── Mobile fullscreen drawer ── */
const MobileDrawer = ({ open, onNav }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 150,
    background: "rgba(8,8,8,0.98)", backdropFilter: "blur(16px)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 8,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: "opacity 0.3s ease",
  }}>
    {NAV_ITEMS.map((item, i) => (
      <button
        key={item}
        onClick={() => onNav(item)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 52,
          letterSpacing: 4, color: "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          transition: `color 0.2s, opacity 0.35s ${i * 0.07}s, transform 0.35s ${i * 0.07}s`,
        }}
        onTouchStart={(e) => e.currentTarget.style.color = "#E8FF47"}
        onTouchEnd={(e)   => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
      >
        {item}
      </button>
    ))}
    <a
      href={`mailto:${CV.email}`}
      style={{
        marginTop: 32,
        fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2,
        color: "#E8FF47", textDecoration: "none", textTransform: "uppercase",
        opacity: open ? 1 : 0, transition: "opacity 0.3s 0.3s",
      }}
    >
      {CV.email}
    </a>
  </div>
);

/* ── Main Nav ── */
const Nav = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "16px 20px" : "20px 48px",
        background: scrolled || menuOpen ? "rgba(8,8,8,0.96)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, color: "#E8FF47" }}>
          GNG.DEV
        </span>

        {/* Desktop / Tablet links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: isTablet ? 24 : 36 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                data-hover
                onClick={() => scrollTo(item)}
                style={{
                  background: "none", border: "none",
                  cursor: bp === "desktop" ? "none" : "pointer",
                  color: "rgba(255,255,255,0.6)", fontSize: 12,
                  letterSpacing: 2, textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.color = "#E8FF47"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <Hamburger open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        )}
      </nav>

      {isMobile && <MobileDrawer open={menuOpen} onNav={scrollTo} />}
    </>
  );
};

export default Nav;
