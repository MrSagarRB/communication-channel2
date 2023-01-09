import React, { useContext } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ContextProvider } from "../Context";
const Header = () => {
  let { activeChat, setActiveChat } = useContext(ContextProvider);
  return (
    <div className="h-full w-full border-b border-[#EEEEEE] px-[10px] flex  items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          width="100"
          height="100"
          className="w-10 h-10 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1654345503171-211d64f7749b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
        <div className="font-medium ">
          <p className="">
            {activeChat === undefined ? "Sagar Borude" : activeChat}
          </p>
          <div className="text-sm  text-[#27AE60] ">Online</div>
        </div>
      </div>
      <div className="flex text-[30px] gap-[20px]  ">
        <HiOutlineVideoCamera className="text-[#27AE60]" />
        <AiOutlineInfoCircle className="text-[#868383]" />
      </div>
    </div>
  );
};

export default Header;
