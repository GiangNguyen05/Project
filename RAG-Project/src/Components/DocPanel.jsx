import { useState, useRef } from "react";

const PIPELINE_STEPS = [
  ["01", "Ingestion", "File → chunk 500 ký tự → TF-IDF index"],
  ["02", "Retrieval", "Query → cosine similarity → top-K chunks"],
  ["03", "Generation", "Context + Query → Claude → câu trả lời"],
];

const STACK = [
  ["Claude Sonnet", "LLM sinh trả lời"],
  ["TF-IDF", "Retrieval in-browser"],
  ["Chunking", "500 ký tự, overlap 50"],
  ["localStorage", "Lưu lịch sử chat"],
];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + "B";
  if (bytes < 1048576) return Math.round(bytes / 1024) + "KB";
  return Math.round((bytes / 1048576) * 10) / 10 + "MB";
}

export default function DocPanel({ docs, onFiles, onDelete }) {
  const [tab, setTab] = useState("docs");
  const [over, setOver] = useState(false);
  const inputRef = useRef();

  return (
    <div className="doc-panel">
      {/* tab switcher */}
      <div
        style={{
          padding: ".5rem .75rem",
          borderBottom: "1px solid var(--paper3)",
          display: "flex",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <button
          className={`ntab${tab === "docs" ? " on" : ""}`}
          onClick={() => setTab("docs")}
        >
          Tài liệu
        </button>
        <button
          className={`ntab${tab === "about" ? " on" : ""}`}
          onClick={() => setTab("about")}
        >
          Pipeline
        </button>
      </div>

      {/* ── DOCS VIEW ── */}
      {tab === "docs" && (
        <>
          <div className="panel-head">
            <h2>Kho tài liệu</h2>
            <p>Tải lên để AI tìm kiếm & trả lời</p>
          </div>

          <div
            className={`dropzone${over ? " over" : ""}`}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(false);
              onFiles(e.dataTransfer.files);
            }}
          >
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
              multiple
              accept=".txt,.md,.pdf"
              onChange={(e) => onFiles(e.target.files)}
            />
            <div className="dz-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8a8a84"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="dz-title">Kéo thả hoặc chọn file</div>
            <div className="dz-sub">.txt · .md · .pdf · max 5MB</div>
            <button
              className="dz-btn"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current.click();
              }}
            >
              Chọn file
            </button>
          </div>

          <div className="flist">
            <div className="flist-lbl">Đã nạp</div>
            {docs.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "1.25rem",
                  fontSize: "10px",
                  color: "var(--ink3)",
                }}
              >
                Chưa có tài liệu
              </div>
            )}
            {docs.map((doc, i) => (
              <div key={doc.name} className="fitem">
                <div
                  className={`ficon ${["pdf", "txt", "md"].includes(doc.ext) ? doc.ext : "other"}`}
                >
                  .{doc.ext}
                </div>
                <div className="finfo">
                  <div className="fname" title={doc.name}>
                    {doc.name}
                  </div>
                  <div className="fmeta">
                    {formatSize(doc.size)}
                    {doc.chunks?.length ? ` · ${doc.chunks.length} chunks` : ""}
                  </div>
                </div>
                <span className={`fstatus ${doc.status}`}>
                  {doc.status === "processing"
                    ? "xử lý..."
                    : doc.status === "ready"
                      ? "sẵn sàng"
                      : "lỗi"}
                </span>
                <button className="fdel" onClick={() => onDelete(i)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── ABOUT VIEW ── */}
      {tab === "about" && (
        <>
          <div className="panel-head">
            <h2>RAG Pipeline</h2>
            <p>Kiến trúc hệ thống</p>
          </div>
          <div className="about-scroll">
            <div className="ab-section">
              <h3>3 bước xử lý</h3>
              {PIPELINE_STEPS.map(([num, title, desc]) => (
                <div key={num} className="pipe-step">
                  <div className="pnum">{num}</div>
                  <div>
                    <div className="ptitle">{title}</div>
                    <div className="pdesc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-section">
              <h3>Stack</h3>
              <div className="tgrid">
                {STACK.map(([name, desc]) => (
                  <div key={name} className="tcard">
                    <div className="tname">{name}</div>
                    <div className="tdesc">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-section">
              <h3>Hướng dẫn</h3>
              <div className="pipe-step">
                <div className="pdesc" style={{ fontSize: "0.6rem" }}>
                  1. Upload file .txt / .md / .pdf
                  <br />
                  2. Chờ trạng thái "sẵn sàng"
                  <br />
                  3. Đặt câu hỏi bên phải
                  <br />
                  4. AI tìm chunks & trả lời kèm nguồn
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
