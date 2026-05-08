// ── SESSION STORAGE (localStorage) ──

const LS_KEY = "rag_sessions_v3";

export const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

export function getSessions() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function putSessions(sessions) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Storage full:", e);
  }
}

export function createSession() {
  return {
    id: genId(),
    title: "Cuộc hội thoại mới",
    msgs: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function updateSessionTitle(msgs) {
  const first = msgs.find((m) => m.role === "user");
  if (!first) return "Cuộc hội thoại mới";
  const raw = first.content
    .replace(/CONTEXT:[\s\S]*?CÂU HỎI:\s*/, "")
    .trim();
  return raw.slice(0, 38) + (raw.length > 38 ? "…" : "");
}
