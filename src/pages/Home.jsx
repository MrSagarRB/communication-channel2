import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ContextProvider } from "../Context";

const Home = () => {
  let { user } = useContext(ContextProvider);
  return (
    <div className=" flex h-screen">
      <div className=" w-[337px] h-full hidden sm:inline-block">
        <Sidebar />{" "}
      </div>
      <div className=" w-full relative">
        <div className=" h-[10%] sticky top-0">
          <Header />
        </div>

        <div className="   px-[20px] py-[20px] h-[82%] overflow-y-scroll bg-[#FAFAFA]   ">
          <ChatContainer />
        </div>

        <div className="h-[8%] ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
