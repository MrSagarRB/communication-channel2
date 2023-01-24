import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import UserContainer from "./UserContainer";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { api_baseUrl, userId } from "../utils";
import { ContextProvider } from "../Context";
import Loader from "./Loader";
import LoggedUserCard from "./LoggedUserCard";
import axios from "axios";

const Sidebar = () => {
  let [data, setData] = useState();

  const { isLoading, error, refetch } = useQuery("allChats", () =>
    fetch(`${api_baseUrl}/getAllChats`).then((res) => res.json())
  );

  let getAllMsg = async () => {
    await axios
      .get(`${api_baseUrl}/getAllChats`)
      .then((result) => setData(result.data));
  };

  const { user, activeChat, setActiveChat, loggedUser, socket } =
    useContext(ContextProvider);

  useEffect(() => {
    socket.on("receive_msg", (msgData) => {
      console.log(msgData);
    });
    getAllMsg();
  }, [data]);

  return (
    <div className="h-full w-full border-r border-[#EEEEEE] shadow-sm">
      <div className="w-full  px-[25px] py-[27px]  ">
        {/* <p className="text-[23px] font-[700]"> Messages</p> */}

        <LoggedUserCard />

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

      <div className=" h-[600px] w-[337px] flex flex-col duration-1000 overflow-y-scroll">
        {data?.map((item, ind) => {
          return item?.users?.filter((user) => user === loggedUser._id)
            ?.length ? (
            <div key={ind} onClick={() => setActiveChat(item._id)}>
              <UserContainer props={item} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
