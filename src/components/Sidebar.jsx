import React, { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import UserContainer from "./UserContainer";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { api_baseUrl } from "../utils";
import { ContextProvider } from "../Context";
import Loader from "./Loader";

const Sidebar = () => {
  const { isLoading, error, data } = useQuery("allChats", () =>
    fetch(`${api_baseUrl}/getAllChats`).then((res) => res.json())
  );
  const { user, activeChat, setActiveChat } = useContext(ContextProvider);

  // console.log(isLoading);

  return (
    <div className="h-full w-full border-r border-[#EEEEEE] shadow-sm">
      <div className="w-full  px-[25px] py-[27px] ">
        <p className="text-[23px] font-[700]"> Messages</p>
        <div className="bg-[#EEEEEE] h-[36px] mt-[18px] flex items-center gap-[10px] overflow-hidden border rounded-[12px] pl-[12px] ">
          <BiSearch className="text-[#676767] text-[18px]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none h-full w-full bg-transparent"
          />
        </div>
        <p className="text-[14px] mt-[11px]">
          Sort by <span className="text-[#2D9CDB]"> Newest</span>
        </p>
      </div>

      <div className=" h-[600px] w-[337px] flex flex-col duration-1000">
        {isLoading ? (
          <div className="h-full w-full flex  justify-center  ">
            <div className="h-[200px] w-[200px]  overflow-hidden">
              <img src="https://flevix.com/wp-content/uploads/2020/01/Preloader.gif" />
            </div>
          </div>
        ) : (
          data?.map((item, ind) => {
            return (
              <div key={ind} onClick={() => setActiveChat(item._id)}>
                <UserContainer props={item} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
