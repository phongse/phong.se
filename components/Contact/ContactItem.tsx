import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  href: string;
  icon: IconDefinition;
};

const ContactItem = (props: Props) => {
  return (
    <li className="pb-1">
      <a
        href={props.href}
        className="text-gray-600 hover:text-gray-800 transition-all"
      >
        <FontAwesomeIcon icon={props.icon} fixedWidth />
        {props.text}
      </a>
    </li>
  );
};

export default ContactItem;
