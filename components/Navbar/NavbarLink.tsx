import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  text: string;
};

const NavbarLink = (props: Props) => {
  return (
    <Link href={props.href}>
      <a className="font-semibold text-gray-600 hover:text-gray-800 transition-all">
        {props.text}
      </a>
    </Link>
  );
};

export default NavbarLink;
