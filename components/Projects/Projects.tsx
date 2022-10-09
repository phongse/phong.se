import React from "react";
import ProjectCard from "./ProjectCard";

type Props = {};

const Projects = (props: Props) => {
  return (
    <div id="projects" className="mt-10">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black">
        Projects
      </h3>
      <div className="flex gap-6 flex-wrap md:flex-row justify-center">
        <ProjectCard
          title="libosrs"
          description="Oldschool Runescape library in Rust to retrieve player hiscores."
          image="/img/libosrs.png"
          sourceUrl="https://github.com/phongse/libosrs"
        />
      </div>
    </div>
  );
};

export default Projects;
