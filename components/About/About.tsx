import React from "react";
import Image from "next/future/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import {
  Git,
  Rust,
  Python,
  ReactJs,
  Nextdotjs,
  Javascript,
  Typescript,
  Linux,
  Nodedotjs,
  Docker,
  Kubernetes,
  Lua,
  C,
  Latex,
  Mongodb,
  Flask,
  Pandas,
  Markdown,
  Visualstudiocode,
  Fastapi,
  Tailwindcss,
  Bootstrap,
} from "@icons-pack/react-simple-icons";

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <div id="about" className="flex flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col basis-3/4 pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black">
            Phong Tran
          </h1>
          <h2 className="text-gray-700 mb-4">Software engineer</h2>
          <p className="leading-normal">
            I am a full-stack developer based in Sweden. Former developer for
            the Danish Energy Agency. Work experience within Flask, FastAPI,
            MongoDB, Docker, and Kubernetes. Now looking for new opportunities
            in Sweden or remote. Reach out to me for any inquiries.
          </p>
          <div className="flex items-start space-x-3 pt-5 pb-5">
            <a href="https://github.com/phongse">
              <FontAwesomeIcon
                icon={faGithub}
                size="2xl"
                className="text-gray-600 hover:text-gray-800 transition-all"
              />
            </a>
            <a href="https://linkedin.com/in/phongse">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2xl"
                className="text-gray-600 hover:text-gray-800 transition-all"
              />
            </a>
            <a href="mailto:phong.1e63x@slmail.me">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="2xl"
                className="text-gray-600 hover:text-gray-800 transition-all"
              />
            </a>
          </div>
        </div>
        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Phong Tran avatar"
            height={176}
            width={176}
            src="/img/avatar.svg"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
      </div>
      <div id="technologies" className="mt-10">
        <h4 className="leading-normal  mb-6 ">
          Technologies that I use or previously worked with
        </h4>
        <div className="flex gap-4 pl-10 pr-10 flex-wrap justify-center text-gray-800 text-4xl">
          <Python title="Python" size={32} />
          <Javascript title="Javascript" size={32} />
          <Typescript title="Typescript" size={32} />
          <Rust title="Rust" size={32} />
          <Lua title="Lua" size={32} />
          <C title="C" size={32} />
          <Flask title="Flask" size={32} />
          <ReactJs title="React.js" size={32} />
          <Nextdotjs title="Next.js" size={32} />
          <Fastapi title="FastAPI" size={32} />
          <Nodedotjs title="Node.js" size={32} />
          <Pandas title="Pandas" size={32} />
          <Git title="Git" size={32} />
          <Linux title="Linux" size={32} />
          <Docker title="Docker" size={32} />
          <Kubernetes title="Kubernetes" size={32} />
          <Mongodb title="MongoDB" size={32} />
          <Latex title="LaTeX" size={32} />
          <Markdown title="Markdown" size={32} />
          <Tailwindcss title="Tailwind CSS" size={32} />
          <Bootstrap title="Bootstrap" size={32} />
          <Visualstudiocode title="Visual Studio Code" size={32} />
        </div>
      </div>
    </>
  );
};

export default About;
