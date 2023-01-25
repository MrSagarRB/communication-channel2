import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextProvider } from "../Context";

const ChatContainer = () => {
  let { activeChat, chats, allUser, loggedUser, api_baseUrl } =
    useContext(ContextProvider);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let allMessages = chats?.filter((item) => {
    return item._id === activeChat;
  });

  let getSenderProfilePic = (id) => {
    let sender = allUser.filter((item) => {
      return item._id === id;
    });

    return sender[0]?.pic;
  };

  let getSenderName = (id) => {
    let sender = allUser.filter((item) => {
      return item._id === id;
    });
    return sender[0].userName;
  };

  return (
    <div className=" flex flex-col   gap-[15px]">
      {activeChat === undefined ? (
        <div className=" h-full w-full flex items-center justify-center">
          <div className="h-[400px] w-[400px] overflow-hidden  mt-[150px]">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49bcfd78364175.5ca3009cb692f.gif" />{" "}
          </div>
        </div>
      ) : (
        allMessages[0]?.messages?.map((item) => {
          return (
            <div
              className={`${
                item.senderId === loggedUser._id
                  ? ""
                  : "flex gap-[10px] relative "
              }`}
            >
              <div
                className={`${
                  item.senderId === loggedUser._id ? "hidden" : ""
                } h-[50px] w-[50px `}
              >
                <img
                  className="h-[50px] w-[50px] rounded-full object-cover"
                  src={getSenderProfilePic(item.senderId)}
                  alt=""
                />
              </div>

              <p
                className={`absolute left-[60px] text-[12px] text-[#868383] capitalize ${
                  item.senderId == loggedUser._id ? "hidden" : ""
                }`}
              >
                {getSenderName(item?.senderId)}, <span>{item?.time}</span>
              </p>
              <div
                className={`bg-[#F4F4F7] py-[10px] px-[20px] mt-[20px]  sm:max-w-[70%] ${
                  item.senderId === loggedUser._id
                    ? "float-right rounded-b-[16px] rounded-tl-[16px]"
                    : "float-left rounded-b-[16px] rounded-tr-[16px]"
                }`}
              >
                <p>{item.text}</p>

                {/* <p className="text-[#868383]">15:42</p> */}
                <div ref={messagesEndRef} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatContainer;
