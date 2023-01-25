import React from "react";
import Ellipsis from "../assets/Ellipsis.svg";
import loaderScreen from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className="wrapper ">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Loader;
