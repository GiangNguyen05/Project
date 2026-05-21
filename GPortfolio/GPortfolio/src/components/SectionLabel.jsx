/* Small mono label used at the top of every section, e.g. "( 01 — About )" */
const SectionLabel = ({ text }) => (
  <span style={{
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: 4,
    color: "#E8FF47",
    textTransform: "uppercase",
    display: "block",
  }}>
    {text}
  </span>
);

export default SectionLabel;
