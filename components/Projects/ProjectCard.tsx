import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image?: string;
  sourceUrl?: string;
};

const ProjectCard = (props: Props) => {
  const css = { maxWidth: "100%", height: "auto" };
  return (
    <div className="max-w-xs bg-white rounded-lg border border-gray-300 shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-500 transition-all">
      {props.sourceUrl && (
        <a href={props.sourceUrl}>
          <Image
            className="rounded-t-lg"
            src="/img/libosrs.png"
            alt={props.title}
            height={400}
            width={400}
          />
        </a>
      )}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {props.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{props.description}</p>
        {props.sourceUrl && (
          <div className="flex justify-end">
            <a
              href={props.sourceUrl}
              className="inline-flex items-center py-2 px-3 text-gray-600 hover:text-gray-800 transition-all"
            >
              <FontAwesomeIcon icon={faCode} fixedWidth />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
