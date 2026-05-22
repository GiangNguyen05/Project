import { Logo, BtnGhost, BtnPrimary } from "./UI.jsx";
import useResponsive from "../hooks/useResponsive.js";
export function CTABanner() {
  const { isMobile } = useResponsive();
  return (
    <section style={{ padding: isMobile ? "40px 20px" : "80px 40px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background:
            "linear-gradient(135deg,rgba(0,245,255,0.07),rgba(0,64,255,0.07))",
          border: "1px solid rgba(0,245,255,0.15)",
          borderRadius: 28,
          padding: isMobile ? "36px 24px" : "60px 72px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 32,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,245,255,0.08),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: isMobile ? 30 : 40,
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 14,
              lineHeight: 1.15,
            }}
          >
            Âm nhạc chill
          </h2>
          <p style={{ color: "#777", fontSize: 15, maxWidth: 400 }}>
            Đăng ký ngay hôm nay
          </p>
        </div>
        <div
          style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}
        >
          <BtnPrimary>Thử Ngay Miễn Phí</BtnPrimary>
          <BtnGhost>Tải App</BtnGhost>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: 36,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Logo size="sm" />
      </div>
      <p style={{ color: "#2a2a2a", fontSize: 13 }}>© 2026 MusicWeb.</p>
    </footer>
  );
}
