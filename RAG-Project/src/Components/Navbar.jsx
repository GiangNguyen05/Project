import picFlag from "../assets/flag.png";

export default function Navbar({ readyCount, histOpen, onToggleHist }) {
  return (
    <nav className="nav">
      <div className="brand">
        <img src={picFlag} alt="Flag" className="brand-logo" />G RAG
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          className={`htoggle${histOpen ? " on" : ""}`}
          onClick={onToggleHist}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Lịch sử
        </button>
        <span className="badge">{readyCount} tài liệu</span>
      </div>
    </nav>
  );
}
