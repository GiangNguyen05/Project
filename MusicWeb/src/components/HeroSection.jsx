import { STATS, SONGS } from "../constants/data.js";
import { BtnGhost, BtnPrimary, IconPause, IconPlay } from "./UI.jsx";
import useResponsive from "../hooks/useResponsive.js";
export default function HeroSection({ player }) {
  const { isMobile, isTablet } = useResponsive();
  const stacked = isMobile || isTablet;
  const { currentSong, playing, progress, toggle, play, seekFromEvent } =
    player;
  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: 64,
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse 80% 60% at 60% 40%,rgba(0,245,255,0.08) 0%,transparent 70%),
                  radial-gradient(ellipse 50% 50% at 20% 80%,rgba(0,128,255,0.06) 0%,transparent 60%),#080808`,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),
                       radial-gradient(ellipse 80% 60% at 60% 40%,rgba(0,245,255,0.08) 0%,transparent 70%),
                       radial-gradient(ellipse 50% 50% at 20% 80%,rgba(0,128,255,0.06) 0%,transparent 60%)`,
        backgroundSize: "32px 32px,auto,auto",
      }}
    >
      {/* Orbs */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "6%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,245,255,0.07),transparent 70%)",
          animation: "float 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "3%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,128,255,0.05),transparent 70%)",
          animation: "float 8s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "56px 20px" : "80px 40px",
          display: "flex",
          flexDirection: stacked ? "column" : "row",
          alignItems: "center",
          gap: stacked ? 44 : 80,
          width: "100%",
        }}
      >
        {/* Copy */}
        <div style={{ flex: 1, animation: "fadeUp 0.8s ease both" }}>
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginBottom: 20,
              background: "rgba(0,245,255,0.1)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.3)",
            }}
          >
            🎵 Nền tảng âm nhạc Việt Nam #1
          </span>

          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: isMobile
                ? "clamp(36px,10vw,52px)"
                : "clamp(48px,5.5vw,76px)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              marginBottom: 22,
            }}
          >
            Nghe nhạc không giới hạn
          </h1>

          <p
            style={{
              fontSize: isMobile ? 15 : 17,
              color: "#777",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 440,
            }}
          >
            Hàng triệu bài hát, playlist cá nhân hoá, và trải nghiệm âm nhạc
            đỉnh cao — tất cả trong một ứng dụng.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <BtnPrimary onClick={toggle}>
              {playing ? <IconPause color="#000" /> : <IconPlay color="#000" />}
              {playing ? "Tạm Dừng" : "Phát Ngay"}
            </BtnPrimary>
            <BtnGhost>Khám Phá</BtnGhost>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? 20 : 32,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: isMobile ? 22 : 26,
                    fontWeight: 900,
                    color: "#00F5FF",
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 12, color: "#444", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player card */}
        <div
          style={{
            flex: stacked ? "none" : "0 0 350px",
            width: stacked ? "100%" : 350,
            maxWidth: 400,
            animation: "fadeUp 1s ease 0.2s both",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,245,255,0.15)",
              borderRadius: 24,
              padding: 24,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Cover */}
            <div style={{ position: "relative", marginBottom: 18 }}>
              <img
                src="https://picsum.photos/seed/featured/400/300"
                alt="featured"
                style={{
                  width: "100%",
                  height: 190,
                  objectFit: "cover",
                  borderRadius: 14,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 14,
                  background:
                    "linear-gradient(to top,rgba(0,0,0,0.85),transparent)",
                }}
              />
              <div style={{ position: "absolute", bottom: 14, left: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>
                  {currentSong.title}
                </div>
                <div style={{ fontSize: 12, color: "#aaa" }}>
                  {currentSong.artist}
                </div>
              </div>
              <button
                onClick={toggle}
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "none",
                  background: "linear-gradient(135deg,#00F5FF,#0060ff)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              >
                {playing ? <IconPause /> : <IconPlay />}
              </button>
            </div>

            {/* Progress */}
            <div
              onClick={seekFromEvent}
              style={{
                height: 4,
                background: "#1a1a1a",
                borderRadius: 4,
                marginBottom: 6,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: "linear-gradient(90deg,#00F5FF,#0060ff)",
                  transition: "width 0.1s linear",
                  boxShadow: "0 0 8px rgba(0,245,255,0.5)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "#444",
                marginBottom: 16,
              }}
            >
              <span>1:23</span>
              <span>{currentSong.duration}</span>
            </div>

            {/* Queue */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#444",
                  marginBottom: 10,
                  fontWeight: 700,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                }}
              >
                Tiếp theo
              </div>
              {SONGS.slice(1, 3).map((s) => (
                <div
                  key={s.id}
                  onClick={() => play(s)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 0",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={s.cover}
                    alt={s.title}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#555" }}>
                      {s.artist}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#444", flexShrink: 0 }}>
                    {s.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
