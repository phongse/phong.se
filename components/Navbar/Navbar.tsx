import React from "react";
import NavbarLink from "./NavbarLink";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div></div>
      <div className="flex flex-row items-center space-x-8">
        <NavbarLink href="#about" text="About" />
        <NavbarLink href="#projects" text="Projects" />
        <NavbarLink href="#contact" text="Contact" />
      </div>
    </>
  );
};

export default Navbar;
