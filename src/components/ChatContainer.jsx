import React, { useContext } from "react";
import { ContextProvider } from "../Context";

const ChatContainer = () => {
  let { activeChat, setActiveChat } = useContext(ContextProvider);

  console.log(activeChat);
  return (
    <div className=" flex flex-col gap-[15px]  h-full">
      {activeChat === undefined ? (
        <div className=" h-full w-full flex items-center justify-center">
          <div className="h-[400px] w-[400px] overflow-hidden ">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49bcfd78364175.5ca3009cb692f.gif" />{" "}
          </div>
        </div>
      ) : (
        <div className="flex gap-[10px] ">
          <img
            width="100"
            height="100"
            className="w-10 h-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1654345503171-211d64f7749b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
          />

          <div className="bg-[#F4F4F7] py-[10px] px-[20px] rounded-b-[16px] rounded-tr-[16px] max-w-[70%]">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className="text-[#868383]">15:42</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
