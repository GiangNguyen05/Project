import { ARTISTS } from "../constants/data.js";
import { SectionHeader } from "./UI.jsx";
import useResponsive from "../hooks/useResponsive.js";
export default function ArtistSection() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 2 : isTablet ? 3 : 5;
  const visible = isMobile ? 4 : ARTISTS.length;
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "56px 20px" : "80px 40px",
      }}
    >
      <SectionHeader
        tag="⭐ Được yêu thích nhất"
        title="Nghệ Sĩ Nổi Bật"
        onMore={() => {}}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols},1fr)`,
          gap: isMobile ? 12 : 20,
        }}
      >
        {ARTISTS.slice(0, visible).map((a) => (
          <div
            key={a.id}
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: isMobile ? "18px 10px" : "22px 16px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "transform 0.3s,box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 20px 60px rgba(0,245,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? 68 : 84,
                height: isMobile ? 68 : 84,
                margin: "0 auto 12px",
              }}
            >
              <img
                src={a.img}
                alt={a.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2.5px solid rgba(0,245,255,0.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(0,245,255,0.1)",
                }}
              />
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: isMobile ? 12 : 14,
                marginBottom: 6,
              }}
            >
              {a.name}
            </div>
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                background: "rgba(0,245,255,0.1)",
                color: "#00F5FF",
                border: "1px solid rgba(0,245,255,0.25)",
                marginBottom: 8,
              }}
            >
              {a.genre}
            </span>
            <div style={{ fontSize: 11, color: "#444" }}>
              {a.followers} người theo dõi
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
