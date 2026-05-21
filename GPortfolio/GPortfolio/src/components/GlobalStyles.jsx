import useBreakpoint from "../hooks/useBreakpoint";

const GlobalStyles = () => {
  const bp = useBreakpoint();

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');

      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      ${bp === "desktop" ? "* { cursor: none !important; }" : ""}

      body {
        background: #080808;
        color: #fff;
        overflow-x: hidden;
      }

      html {
        scroll-behavior: smooth;
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50%       { opacity: 1;   }
      }

      ::-webkit-scrollbar       { width: 4px; }
      ::-webkit-scrollbar-track { background: #080808; }
      ::-webkit-scrollbar-thumb { background: rgba(232,255,71,0.3); border-radius: 2px; }

      button { -webkit-tap-highlight-color: transparent; }
      a      { -webkit-tap-highlight-color: transparent; }
    `}</style>
  );
};

export default GlobalStyles;
