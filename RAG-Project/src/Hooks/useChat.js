import { useState, useCallback } from "react";
import { retrieve } from "../utils/rag";

const SYSTEM_PROMPT = `Bạn là AI assistant về RAG (Retrieval-Augmented Generation).
Trả lời dựa trên CONTEXT bên dưới. Nếu không có thông tin liên quan, nói rõ, không bịa đặt.
Trả lời bằng tiếng Việt, ngắn gọn, chính xác. Trích dẫn nguồn bằng [số].`;

export function useChat(docs, ensureSession, saveToSession, toast) {
  const [messages, setMessages] = useState([]);   // display messages
  const [apiMsgs, setApiMsgs] = useState([]);     // raw messages sent to API
  const [loading, setLoading] = useState(false);

  const resetMessages = useCallback(() => {
    setMessages([]);
    setApiMsgs([]);
  }, []);

  const loadMessages = useCallback((sess) => {
    if (!sess || !sess.msgs.length) {
      setMessages([]);
      setApiMsgs([]);
      return;
    }
    setApiMsgs([...sess.msgs]);
    const display = sess.msgs.map((m) =>
      m.role === "user"
        ? { ...m, display: m.content.replace(/CONTEXT:[\s\S]*?CÂU HỎI:\s*/, "").trim() }
        : m
    );
    setMessages(display);
  }, []);

  const sendMessage = useCallback(
    async (query) => {
      const readyDocs = docs.filter((d) => d.status === "ready");
      if (!readyDocs.length) {
        toast("Chưa có tài liệu! Hãy upload trước.", "err");
        return;
      }
      if (loading) return;

      const sessId = ensureSession();

      // Add user message to display immediately
      setMessages((prev) => [
        ...prev,
        { role: "user", display: query, content: query, sources: [] },
      ]);
      setLoading(true);

      // Build context from retrieved chunks
      const chunks = retrieve(docs, query, 5);
      const ctx = chunks.length
        ? chunks.map((c, i) => `[${i + 1}] (${c.src})\n${c.text}`).join("\n\n")
        : "";
      const sources = [...new Set(chunks.map((c) => c.src))];

      const userContent = ctx
        ? `CONTEXT:\n${ctx}\n\nCÂU HỎI: ${query}`
        : `Không có tài liệu liên quan.\n\nCÂU HỎI: ${query}`;

      const newApiMsgs = [...apiMsgs, { role: "user", content: userContent }];
      setApiMsgs(newApiMsgs);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: newApiMsgs,
          }),
        });
        const data = await res.json();
        const answer =
          data.content?.map((b) => b.text || "").join("") || "Không có phản hồi.";

        const finalApiMsgs = [
          ...newApiMsgs,
          { role: "assistant", content: answer, sources },
        ];
        setApiMsgs(finalApiMsgs);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer, display: answer, sources },
        ]);
        saveToSession(sessId, finalApiMsgs);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Lỗi kết nối API: " + err.message,
            display: "Lỗi kết nối API: " + err.message,
            sources: [],
          },
        ]);
        setApiMsgs(newApiMsgs.slice(0, -1));
      }

      setLoading(false);
    },
    [docs, loading, apiMsgs, ensureSession, saveToSession, toast]
  );

  return { messages, loading, sendMessage, resetMessages, loadMessages };
}
