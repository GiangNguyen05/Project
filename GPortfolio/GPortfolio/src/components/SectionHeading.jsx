import useBreakpoint from "../hooks/useBreakpoint";

/**
 * Large Bebas Neue heading used in every section.
 * Pass `lines` as an array of { text, accent } objects.
 *
 * Example:
 *   <SectionHeading lines={[
 *     { text: "BUILDING" },
 *     { text: "INTERFACES", accent: true },
 *     { text: "THAT MATTER" },
 *   ]} />
 */
const SectionHeading = ({ lines = [], mobileSize, tabletSize, desktopSize, marginBottom = 48 }) => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet  = bp === "tablet";

  const fontSize = isMobile
    ? (mobileSize  ?? "clamp(38px,10vw,60px)")
    : isTablet
    ? (tabletSize  ?? "clamp(44px,8vw,80px)")
    : (desktopSize ?? "clamp(44px,6vw,80px)");

  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize,
      color: "#fff",
      margin: `16px 0 ${marginBottom}px`,
      lineHeight: 0.95,
      letterSpacing: 2,
    }}>
      {lines.map((line, i) => (
        <span key={i} style={{ color: line.accent ? "#E8FF47" : "#fff", display: "block" }}>
          {line.text}
        </span>
      ))}
    </h2>
  );
};

export default SectionHeading;
