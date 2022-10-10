import React from "react";
import NavbarLink from "./NavbarLink";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div className="flex flex-row items-center space-x-8">
        <NavbarLink href="/" text="Home" />
        <NavbarLink href="/blog" text="Blog" />
      </div>
    </>
  );
};

export default Navbar;
