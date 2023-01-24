import React, { useContext, useEffect, useRef, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import ContactContainer from "../components/ContactContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ContextProvider } from "../Context";
import { AiOutlinePlus } from "react-icons/ai";
// import io from "socket.io-client";

const Home = () => {
  let { user, activeChat, allUser, loggedUser, socket } =
    useContext(ContextProvider);
  let [constctsContainer, setConstctsContainer] = useState(false);

  // const socket = io.connect("ws://localhost:3005");

  useEffect(() => {
    socket.emit("user_online", loggedUser._id);
    socket.on("receive_msg", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="flex h-screen ">
      <div className=" w-[337px] h-full hidden sm:inline-block  relative">
        <div
          className={`transition-all duration-500 overflow-hidden ${
            !constctsContainer ? " w-0" : "w-full"
          } h-full  absolute z-20 `}
        >
          <ContactContainer
            constctsContainer={constctsContainer}
            setConstctsContainer={setConstctsContainer}
          />
        </div>

        <div
          onClick={() => setConstctsContainer(!constctsContainer)}
          className=" absolute z-30 bottom-[20px] right-[20px] cursor-pointer flex flex-col justify-center "
        >
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <AiOutlinePlus className="text-[24px]" />
          </button>
        </div>
        <Sidebar />
      </div>
      <div className="w-full relative h-screen ">
        <div
          className={`${
            activeChat ? "" : "hidden"
          }  duration-500 h-[10%] sticky top-0`}
        >
          <Header />
        </div>

        <div
          className={`duration-500 ${
            activeChat ? "h-[82%]" : "h-full"
          }  px-[20px] py-[20px]  overflow-y-scroll bg-[#FAFAFA]`}
        >
          <ChatContainer />
        </div>

        <div className={`h-[8%] ${activeChat ? "" : "hidden"} `}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
