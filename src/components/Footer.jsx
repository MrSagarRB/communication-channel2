import React from "react";
import { ImAttachment } from "react-icons/im";
import { CiPaperplane } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="px-[10px] py-[10px] flex items-center gap-[15px] border border-[#EEEEEE] h-[60px]  w-full   bg-[#fff]  ">
      <label
        htmlFor="file"
        className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2"
      >
        <ImAttachment className="text-[20px]" />
      </label>
      <input type="file" className="hidden" id="file" />

      <div className="bg-[#FAFAFA] w-[90%]  h-full">
        <input
          type="text"
          placeholder="Type your message here.."
          className="h-full w-full outline-none px-[10px] bg-transparent rounded-[12px]"
        />
      </div>

      <button className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2">
        <CiPaperplane className="text-[30px]" />
      </button>
    </div>
  );
};

export default Footer;
