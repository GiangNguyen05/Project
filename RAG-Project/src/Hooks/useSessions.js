import { useState, useCallback } from "react";
import {
  getSessions,
  putSessions,
  createSession,
  updateSessionTitle,
} from "../utils/storage";

export function useSessions() {
  const [sessions, setSessions] = useState(() => getSessions());
  const [curSessId, setCurSessId] = useState(null);

  const persist = useCallback((updated) => {
    setSessions(updated);
    putSessions(updated);
  }, []);

  /** Create a brand new empty session */
  const newSession = useCallback(() => {
    const sess = createSession();
    persist([sess, ...getSessions()]);
    setCurSessId(sess.id);
    return sess;
  }, [persist]);

  /** Load an existing session and return its messages */
  const loadSession = useCallback(
    (id) => {
      const sess = sessions.find((s) => s.id === id);
      if (!sess) return null;
      setCurSessId(id);
      return sess;
    },
    [sessions]
  );

  /** Delete a session by id */
  const deleteSession = useCallback(
    (id) => {
      persist(getSessions().filter((s) => s.id !== id));
      if (curSessId === id) setCurSessId(null);
    },
    [persist, curSessId]
  );

  /** Save updated API messages into the current session */
  const saveToSession = useCallback(
    (id, apiMsgs) => {
      const title = updateSessionTitle(apiMsgs);
      const updated = getSessions().map((s) =>
        s.id === id
          ? { ...s, msgs: apiMsgs, updatedAt: Date.now(), title }
          : s
      );
      persist(updated);
    },
    [persist]
  );

  /** Ensure a session exists — create one if curSessId is null */
  const ensureSession = useCallback(() => {
    if (curSessId) return curSessId;
    const sess = createSession();
    persist([sess, ...getSessions()]);
    setCurSessId(sess.id);
    return sess.id;
  }, [curSessId, persist]);

  return {
    sessions,
    curSessId,
    setCurSessId,
    newSession,
    loadSession,
    deleteSession,
    saveToSession,
    ensureSession,
  };
}
