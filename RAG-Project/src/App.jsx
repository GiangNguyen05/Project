import { useState } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import DocPanel from "./components/DocPanel";
import HistPanel from "./components/HistPanel";
import ChatPanel from "./components/ChatPanel";
import Toast from "./components/Toast";

import { useToast } from "./hooks/useToast";
import { useDocs } from "./hooks/useDocs";
import { useSessions } from "./hooks/useSessions";
import { useChat } from "./hooks/useChat";

export default function App() {
  const [histOpen, setHistOpen] = useState(false);

  // ── hooks ──
  const { toasts, toast } = useToast();

  const { docs, handleFiles, deleteDoc, readyCount } = useDocs(toast);

  const {
    sessions,
    curSessId,
    newSession,
    loadSession,
    deleteSession,
    saveToSession,
    ensureSession,
  } = useSessions();

  const { messages, loading, sendMessage, resetMessages, loadMessages } =
    useChat(docs, ensureSession, saveToSession, toast);

  // ── session actions ──
  const handleNew = () => {
    newSession();
    resetMessages();
  };

  const handleLoad = (id) => {
    const sess = loadSession(id);
    if (sess) loadMessages(sess);
  };

  const handleDelete = (id) => {
    deleteSession(id);
    if (curSessId === id) resetMessages();
    toast("Đã xóa cuộc hội thoại");
  };

  return (
    <div className="rag-root">
      <Navbar
        readyCount={readyCount}
        histOpen={histOpen}
        onToggleHist={() => setHistOpen((o) => !o)}
      />

      <div className="app">
        <DocPanel docs={docs} onFiles={handleFiles} onDelete={deleteDoc} />

        <HistPanel
          open={histOpen}
          sessions={sessions}
          curId={curSessId}
          onNew={handleNew}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />

        <ChatPanel messages={messages} loading={loading} onSend={sendMessage} />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}
