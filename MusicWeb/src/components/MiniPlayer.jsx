function MiniPlayer({ song, playing, onToggle, progress, onSeek }) {
  const { isMobile } = useResponsive();
  const [totalMin, totalSec] = song.duration.split(":").map(Number);
  const elapsed = Math.floor((progress / 100) * (totalMin * 60 + totalSec));
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(8,8,8,0.97)",
        borderTop: "1px solid rgba(0,245,255,0.18)",
        backdropFilter: "blur(24px)",
        padding: isMobile ? "10px 16px" : "11px 32px",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 12 : 24,
      }}
    >
      {/* Cover + info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: isMobile ? 1 : "0 0 210px",
          minWidth: 0,
        }}
      >
        <img
          src={song.cover}
          alt={song.title}
          style={{
            width: 42,
            height: 42,
            borderRadius: 8,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {song.title}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>{song.artist}</div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 14 : 22,
            alignItems: "center",
          }}
        >
          {!isMobile && (
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 5,
                display: "flex",
              }}
            >
              <svg
                width="17"
                height="17"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 20L9 12l10-8v16z" />
                <line x1="5" y1="4" x2="5" y2="20" />
              </svg>
            </button>
          )}
          <button
            onClick={onToggle}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "none",
              background: "linear-gradient(135deg,#00F5FF,#0080ff)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(0,245,255,0.45)",
              flexShrink: 0,
            }}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          {!isMobile && (
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 5,
                display: "flex",
              }}
            >
              <svg
                width="17"
                height="17"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 4l10 8-10 8V4z" />
                <line x1="19" y1="4" x2="19" y2="20" />
              </svg>
            </button>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              color: "#444",
              width: 28,
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {fmt(elapsed)}
          </span>
          <div
            onClick={onSeek}
            style={{
              flex: 1,
              height: 3,
              background: "#1c1c1c",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 4,
                background: "linear-gradient(90deg,#00F5FF,#0080ff)",
                transition: "width 0.1s linear",
                boxShadow: "0 0 6px rgba(0,245,255,0.5)",
              }}
            />
          </div>
          <span
            style={{ fontSize: 10, color: "#444", width: 28, flexShrink: 0 }}
          >
            {song.duration}
          </span>
        </div>
      </div>

      {/* Volume */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flex: "0 0 140px",
          }}
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="#444"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <div
            style={{
              flex: 1,
              height: 3,
              background: "#1c1c1c",
              borderRadius: 4,
            }}
          >
            <div
              style={{
                width: "60%",
                height: "100%",
                borderRadius: 4,
                background: "#333",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
