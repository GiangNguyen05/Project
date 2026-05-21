import { useState, useEffect } from "react";
import useBreakpoint from "../hooks/useBreakpoint";

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  const bp = useBreakpoint();

  useEffect(() => {
    if (bp !== "desktop") return;

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => { if (e.target.closest("a,button,[data-hover]")) setBig(true); };
    const onOut  = () => setBig(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout",  onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout",  onOut);
    };
  }, [bp]);

  if (bp !== "desktop") return null;

  return (
    <>
      {/* Dot */}
      <div style={{
        position: "fixed",
        top: pos.y - 6, left: pos.x - 6,
        width: 12, height: 12,
        borderRadius: "50%",
        background: "#E8FF47",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "top 0.05s, left 0.05s",
      }} />
      {/* Ring */}
      <div style={{
        position: "fixed",
        top:  pos.y - (big ? 24 : 18),
        left: pos.x - (big ? 24 : 18),
        width:  big ? 48 : 36,
        height: big ? 48 : 36,
        borderRadius: "50%",
        border: "1.5px solid rgba(232,255,71,0.5)",
        pointerEvents: "none",
        zIndex: 9998,
        transition: "all 0.15s ease",
      }} />
    </>
  );
};

export default Cursor;
