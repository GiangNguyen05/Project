import useInView from "../hooks/useInView";

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
