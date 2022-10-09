import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

type Props = { children?: ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="bg-gray-50">
      {/* <header className="flex items-start justify-between max-w-3xl mx-auto xl:items-center pt-5 pr-5 pl-5">
        <Navbar />
      </header> */}
      <main className="bg-gray-50 max-w-3xl mx-auto pt-16 pr-5 pl-5">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
