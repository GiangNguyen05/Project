import { SONGS } from "../constants/data.js";
import { SectionHeader, Waveform } from "./UI.jsx";
import useResponsive from "../hooks/useResponsive.js";
export default function TopCharts({ player }) {
  const { isMobile } = useResponsive();
  const { currentSong, playing, play } = player;
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "56px 20px" : "80px 40px",
      }}
    >
      <SectionHeader
        tag="🔥 Hot nhất tuần"
        title="Bảng Xếp Hạng"
        onMore={() => {}}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 10,
        }}
      >
        {SONGS.map((song, idx) => {
          const active = currentSong.id === song.id;
          return (
            <div
              key={song.id}
              onClick={() => play(song)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 12 : 14,
                padding: "13px 14px",
                borderRadius: 14,
                cursor: "pointer",
                transition: "background 0.2s",
                background: active ? "rgba(0,245,255,0.06)" : "transparent",
                border: active
                  ? "1px solid rgba(0,245,255,0.15)"
                  : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.background = "rgba(0,245,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 20,
                  fontWeight: 900,
                  color: idx < 3 ? "#00F5FF" : "#252525",
                  width: 26,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </span>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={song.cover}
                  alt={song.title}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 10,
                    background: "rgba(0,0,0,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="#00F5FF"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {song.title}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>{song.artist}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{ fontSize: 11, color: "#3a3a3a", marginBottom: 4 }}
                >
                  {song.plays}
                </div>
                {active ? (
                  <Waveform active={playing} />
                ) : (
                  <div style={{ fontSize: 11, color: "#2e2e2e" }}>
                    {song.duration}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
