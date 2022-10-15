import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectListItem from "./ProjectListItem";

type Props = {};

const Projects = (props: Props) => {
  return (
    <div id="projects" className="mt-10">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black">
        Projects
      </h3>
      <div className="flex gap-6 flex-wrap md:flex-row">
        {/* <ProjectCard
          title="libosrs"
          description="Oldschool Runescape library in Rust to retrieve player hiscores."
          image="/img/libosrs.png"
          sourceUrl="https://github.com/phongse/libosrs"
        /> */}
        <ul>
          <ProjectListItem
            title="osrs-tracker-server"
            url="https://github.com/phongse/osrs-tracker-server"
            description="Public REST API for Oldschool Runescape trackers."
          />
          <ProjectListItem
            title="libosrs"
            url="https://github.com/phongse/libosrs"
            description="Oldschool Runescape library in Rust to retrieve player hiscores."
          />
        </ul>
      </div>
    </div>
  );
};

export default Projects;
