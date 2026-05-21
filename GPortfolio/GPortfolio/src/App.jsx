import useBreakpoint from "./hooks/useBreakpoint";

// Global
import GlobalStyles from "./components/GlobalStyles";
import Cursor      from "./components/Cursor";

// Sections
import Nav      from "./sections/Nav";
import Hero     from "./sections/Hero";
import About    from "./sections/About";
import Skills   from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact  from "./sections/Contact";

const App = () => {
  const bp = useBreakpoint();

  return (
    <>
      <GlobalStyles />
      {bp === "desktop" && <Cursor />}

      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default App;
