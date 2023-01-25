import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import UserContainer from "./UserContainer";
import { ContextProvider } from "../Context";
import LoggedUserCard from "./LoggedUserCard";

const Sidebar = () => {
  const { setActiveChat, loggedUser, chats } = useContext(ContextProvider);
  return (
    <div className="h-full w-full border-r border-[#EEEEEE] shadow-sm">
      <div className="w-full  px-[25px] py-[27px]  ">
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

      <div className="w-[337px] h-[70%] flex flex-col duration-1000 overflow-y-scroll  ">
        {chats?.map((item, ind) => {
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
