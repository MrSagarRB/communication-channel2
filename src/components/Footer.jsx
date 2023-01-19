import React, { useContext, useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { CiPaperplane } from "react-icons/ci";
import { api_baseUrl } from "../utils";
import axios from "axios";
import { ContextProvider } from "../Context";
// import { userId } from "../utils";

const Footer = () => {
  let [newMessage, setNewMessage] = useState();
  let { activeChat, setActiveChat } = useContext(ContextProvider);
  let { loggedUser } = useContext(ContextProvider);

  let handelSendMessage = (e) => {
    e.preventDefault();
    axios
      .post(`${api_baseUrl}/sendMessage`, {
        id: activeChat,
        message: newMessage,
        senderID: loggedUser._id,
      })
      .then(() => {
        document.getElementById("msg").value = "";
        // alert("Sent");
      });

    console.log(activeChat);
    console.log(newMessage);
    console.log(loggedUser._id);
  };

  useEffect((

    
  ) => {}, [handelSendMessage]);
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
        <form onSubmit={(e) => handelSendMessage(e)}>
          <input
            type="text"
            id="msg"
            placeholder="Type your message here.."
            className="h-full w-full outline-none px-[10px] bg-transparent rounded-[12px]"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </form>
      </div>

      <button
        disabled={!activeChat}
        onClick={() => handelSendMessage()}
        className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2"
      >
        <CiPaperplane className="text-[30px]" />
      </button>
    </div>
  );
};

export default Footer;
