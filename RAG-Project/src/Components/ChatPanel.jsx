import { useState, useRef, useEffect } from "react";

function TypingIndicator() {
  return (
    <div className="mwrap assistant">
      <div className="mlabel">AI Agent</div>
      <div className="typing">
        <div className="tdot" />
        <div className="tdot" />
        <div className="tdot" />
      </div>
    </div>
  );
}

function Message({ msg }) {
  return (
    <div className={`mwrap ${msg.role}`}>
      <div className="mlabel">
        {msg.role === "user" ? "Bạn" : "AI Agent Reply"}
      </div>
      <div className="mbubble">{msg.display || msg.content}</div>
      {msg.sources?.length > 0 && (
        <div className="src-row">
          {msg.sources.map((s) => (
            <span key={s} className="src-chip">
              📄 {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChatPanel({ messages, loading, onSend }) {
  const [input, setInput] = useState("");
  const msgsRef = useRef();
  const textareaRef = useRef();

  // auto-scroll on new messages
  useEffect(() => {
    if (msgsRef.current)
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    onSend(q);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
  };

  return (
    <div className="chat-panel">
      <div className="chat-head">
        <div style={{ flex: 1 }}>
          <h2>AI CHAT</h2>
          <p>Tìm kiếm & trả lời từ tài liệu của bạn</p>
        </div>
        <span className="mbadge">Claude Sonnet</span>
      </div>

      <div className="chat-msgs" ref={msgsRef}>
        {messages.length === 0 && (
          <div className="welcome">
            <div className="w-icon">🔍</div>
            <h3>Hỏi về tài liệu của bạn</h3>
            <p>
              Tải file lên rồi đặt câu hỏi — AI sẽ tìm kiếm và trả lời chính
              xác.
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
      </div>

      <div className="input-area">
        <div className="input-wrap">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            rows={1}
            placeholder="Đặt câu hỏi về tài liệu..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-btn"
            disabled={loading || !input.trim()}
            onClick={handleSend}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div className="input-hint">Enter gửi · Shift+Enter xuống dòng</div>
      </div>
    </div>
  );
}
