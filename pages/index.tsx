import type { NextPage } from "next";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Projects from "../components/Projects/Projects";

const Home: NextPage = () => {
  return (
    <>
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
