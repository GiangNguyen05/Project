import { NAV_LINKS } from "../constants/data.js";
import { Logo, BtnPrimary } from "./UI.jsx";
import { useState } from "react";
import useResponsive from "../hooks/useResponsive.js";
import useScrolled from "../hooks/useScrolled.js";
export default function Navbar({ activeNav, onNav }) {
  const scrolled = useScrolled(60);
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;
  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isMobile ? "0 20px" : "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: solid ? "rgba(8,8,8,0.97)" : "transparent",
          borderBottom: solid ? "1px solid rgba(255,255,255,0.06)" : "none",
          backdropFilter: solid ? "blur(20px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Logo />

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map(({ label, key }) => (
              <span
                key={key}
                onClick={() => onNav(key)}
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s",
                  color: activeNav === key ? "#00F5FF" : "#999",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
        {!isMobile && (
          <BtnPrimary style={{ padding: "8px 20px", fontSize: 13 }}>
            Bắt Đầu
          </BtnPrimary>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  borderRadius: 2,
                  background: open && i === 1 ? "transparent" : "#fff",
                  transition: "all 0.25s ease",
                  transform: open
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "none"
                    : "none",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && open && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(8,8,8,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: 20,
          }}
        >
          {NAV_LINKS.map(({ label, key }) => (
            <div
              key={key}
              onClick={() => {
                onNav(key);
                setOpen(false);
              }}
              style={{
                padding: "14px 0",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                color: activeNav === key ? "#00F5FF" : "#ccc",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {label}
            </div>
          ))}
          <BtnPrimary
            style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
          >
            Bắt Đầu
          </BtnPrimary>
        </div>
      )}
    </>
  );
}
