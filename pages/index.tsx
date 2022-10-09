import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Projects from "../components/Projects/Projects";
import styles from "../styles/Home.module.css";

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
