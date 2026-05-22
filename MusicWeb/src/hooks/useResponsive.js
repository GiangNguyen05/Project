import { useState, useEffect } from "react";

export default function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    let t;
    const h = () => {
      clearTimeout(t);
      t = setTimeout(() => setWidth(window.innerWidth), 80);
    };
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("resize", h);
      clearTimeout(t);
    };
  }, []);
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
