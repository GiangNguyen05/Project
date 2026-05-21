function PlaylistSection() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 2 : isTablet ? 3 : 4;
  return (
    <section
      style={{
        padding: isMobile ? "44px 0" : "60px 0",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 40px",
        }}
      >
        <SectionHeader
          tag="🎧 Dành cho bạn"
          title="Playlist Nổi Bật"
          onMore={() => {}}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols},1fr)`,
            gap: isMobile ? 12 : 20,
          }}
        >
          {PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.3s,box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0,245,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={pl.img}
                  alt={pl.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#00F5FF,#0060ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 24px rgba(0,245,255,0.5)",
                    }}
                  >
                    <svg width="18" height="18" fill="#000" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </div>
              <div style={{ padding: isMobile ? "10px 12px" : "14px 16px" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: isMobile ? 13 : 15,
                    marginBottom: 3,
                  }}
                >
                  {pl.name}
                </div>
                <div style={{ fontSize: 12, color: "#444" }}>{pl.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
