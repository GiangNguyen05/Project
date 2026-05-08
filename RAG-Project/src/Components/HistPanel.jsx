function formatDate(ts) {
  const d = new Date(ts);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) +
    " " +
    d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function HistPanel({ open, sessions, curId, onNew, onLoad, onDelete }) {
  return (
    <div className={`hist-panel${open ? " on" : ""}`}>
      <div className="hist-head">
        <span className="hist-title">Lịch sử</span>
        <button className="new-btn" onClick={onNew}>
          + Mới
        </button>
      </div>

      <div className="hlist">
        {sessions.length === 0 ? (
          <div className="hempty">
            Chưa có lịch sử.
            <br />
            Bắt đầu chat để lưu.
          </div>
        ) : (
          sessions.map((s) => (
            <div
              key={s.id}
              className={`hitem${s.id === curId ? " on" : ""}`}
              onClick={() => onLoad(s.id)}
            >
              <div className="hitem-title" title={s.title}>
                {s.title}
              </div>
              <div className="hitem-meta">
                {formatDate(s.updatedAt)} ·{" "}
                {s.msgs.filter((m) => m.role === "user").length} câu
              </div>
              <button
                className="hdel"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(s.id);
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
