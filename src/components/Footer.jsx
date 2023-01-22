import React, { useContext, useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { CiPaperplane } from "react-icons/ci";
import { api_baseUrl } from "../utils";
import axios from "axios";
import { ContextProvider } from "../Context";
import { useQuery } from "react-query";
import io from "socket.io-client";

const Footer = () => {
  let [newMessage, setNewMessage] = useState();
  let { activeChat, setActiveChat } = useContext(ContextProvider);
  let { loggedUser, getAllUser } = useContext(ContextProvider);
  const { isLoading, error, data, refetch } = useQuery("allChats");

  const socket = io.connect("ws://localhost:8900");

  let handelSendMessage = (e) => {
    e.preventDefault();
    let d = new Date();
    axios
      .post(`${api_baseUrl}/sendMessage`, {
        id: activeChat,
        message: newMessage,
        senderID: loggedUser._id,
        time: d.getHours() + ":" + d.getMinutes(),
      })
      .then(() => {
        document.getElementById("msg").value = "";
        setNewMessage();
        refetch();
        socket.emit("sendMsg", newMessage);
      });
  };

  return (
    <form onSubmit={(e) => handelSendMessage(e)} autocomplete="off">
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
            required
            autocomplete="off"
            type="text"
            id="msg"
            placeholder="Type your message here.."
            className="h-full w-full outline-none px-[10px] bg-transparent rounded-[12px]"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </div>

        <button
          disabled={!activeChat}
          type="submit"
          value="submit"
          className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2"
        >
          <CiPaperplane className="text-[30px]" />
        </button>
      </div>
    </form>
  );
};

export default Footer;
