import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  url: string;
  blogUrl?: boolean;
  description?: string;
};

const ProjectListItem = (props: Props) => {
  return (
    <li>
      {props.blogUrl ? (
        <Link
          href={props.url}
          className="text-gray-600 hover:text-gray-800 transition-all"
        >
          <a href={props.url}>{props.title}</a>
        </Link>
      ) : (
        <a
          href={props.url}
          className="text-gray-600 hover:text-gray-800 transition-all"
        >
          <span className="font-bold">{props.title}</span>
          {props.description && ` - ${props.description}`}
        </a>
      )}
    </li>
  );
};

export default ProjectListItem;
