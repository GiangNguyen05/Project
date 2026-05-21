import CV from "../data/cv";

/**
 * AvatarPhoto — circular avatar, absolute positioned in Hero (desktop/tablet only).
 * variant "hero": large, top-right area of Hero section.
 */
const AvatarPhoto = ({ loaded = true }) => (
  <div style={{
    position: "absolute",
    top: "50%",
    right: 72,
    transform: "translateY(-50%)",
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.9s ease 0.5s",
    zIndex: 1,
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  }}>
    {/* Outer glow ring */}
    <div style={{
      position: "relative",
      width: 240,
      height: 240,
    }}>
      {/* Accent ring 1 */}
      <div style={{
        position: "absolute",
        inset: -10,
        borderRadius: "50%",
        border: "1px solid rgba(232,255,71,0.15)",
      }} />
      {/* Accent ring 2 */}
      <div style={{
        position: "absolute",
        inset: -20,
        borderRadius: "50%",
        border: "1px solid rgba(232,255,71,0.07)",
      }} />

      {/* Circle photo */}
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid rgba(232,255,71,0.35)",
        position: "relative",
      }}>
        <img
          src={CV.avatar}
          alt={CV.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            filter: "grayscale(15%)",
          }}
        />
        {/* Bottom fade overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.45))",
          borderRadius: "50%",
        }} />
      </div>

      {/* Yellow status dot */}
      <div style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: "#E8FF47",
        border: "2px solid #080808",
        boxShadow: "0 0 8px rgba(232,255,71,0.6)",
      }} />
    </div>

    {/* Name label */}
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 9,
      letterSpacing: 3,
      color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase",
    }}>
      Nguyen Van Giang
    </span>
  </div>
);

export default AvatarPhoto;
