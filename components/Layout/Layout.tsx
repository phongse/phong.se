import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

type Props = { children?: ReactNode };

const Layout = (props: Props) => {
  return (
    <>
      {/* <header className="flex flex-wrap justify-start max-w-3xl mx-auto xl:items-center pt-5 pr-5 pl-5">
        <Navbar />
      </header> */}
      <main className="max-w-3xl mx-auto pt-16 pr-5 pl-5">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
