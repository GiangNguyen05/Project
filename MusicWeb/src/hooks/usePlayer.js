import { useState, useEffect, useRef } from "react";
import { SONGS } from "../constants/data.js";
export default function usePlayer() {
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);
  const ref = useRef(null);
  useEffect(() => {
    clearInterval(ref.current);
    if (playing) {
      ref.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 0.2;
        });
      }, 100);
    }
    return () => clearInterval(ref.current);
  }, [playing]);
  const play = (s) => {
    setCurrentSong(s);
    setPlaying(true);
    setProgress(0);
  };
  const toggle = () => setPlaying((p) => !p);
  const seekFromEvent = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setProgress(
      Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
    );
  };
  return { currentSong, playing, progress, play, toggle, seekFromEvent };
}
