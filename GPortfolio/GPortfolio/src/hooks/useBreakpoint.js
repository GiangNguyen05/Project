import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [bp, setBp] = useState("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 600 ? "mobile" : w < 900 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
};

export default useBreakpoint;
