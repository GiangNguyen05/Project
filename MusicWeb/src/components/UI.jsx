function Waveform({ active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 20 }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            background: active ? "#00F5FF" : "#333",
            height: active ? undefined : 8,
            animation: active
              ? `wave ${0.4 + i * 0.1}s ease-in-out infinite alternate`
              : "none",
            animationDelay: active ? `${i * 0.07}s` : "0s",
          }}
        />
      ))}
    </div>
  );
}
function IconPlay({ size = 16, color = "#000" }) {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
function IconPause({ size = 16, color = "#000" }) {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}
function BtnPrimary({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 28px",
        borderRadius: 32,
        border: "none",
        background: "linear-gradient(135deg,#00F5FF,#0060ff)",
        color: "#000",
        fontWeight: 800,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 0 28px rgba(0,245,255,0.35)",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
function BtnGhost({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 28px",
        borderRadius: 32,
        border: "1.5px solid rgba(255,255,255,0.15)",
        background: "transparent",
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
function SectionHeader({ tag, title, onMore }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 32,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.5px",
            background: "rgba(0,245,255,0.1)",
            color: "#00F5FF",
            border: "1px solid rgba(0,245,255,0.3)",
            marginBottom: 10,
          }}
        >
          {tag}
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(26px,4vw,38px)",
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          {title}
        </h2>
      </div>
      {onMore && (
        <span
          onClick={onMore}
          style={{
            color: "#00F5FF",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Xem tất cả →
        </span>
      )}
    </div>
  );
}
function Logo({ size = "md" }) {
  const d = size === "sm" ? { icon: 28, text: 16 } : { icon: 32, text: 18 };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: d.icon,
          height: d.icon,
          borderRadius: 8,
          flexShrink: 0,
          background: "linear-gradient(135deg,#00F5FF,#0040ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(0,245,255,0.4)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      >
        <svg
          width={d.icon * 0.55}
          height={d.icon * 0.55}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 18V5l12-2v13"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="6" cy="18" r="3" fill="#000" />
          <circle cx="18" cy="16" r="3" fill="#000" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 900,
          fontSize: d.text,
          letterSpacing: "-0.5px",
        }}
      >
        Music<span style={{ color: "#00F5FF" }}>for</span>me
      </span>
    </div>
  );
}
