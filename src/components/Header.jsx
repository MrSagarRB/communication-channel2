import React, { useContext } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ContextProvider } from "../Context";
import { useQuery } from "react-query";
// import { userId } from "../utils";
const Header = () => {
  let { activeChat, setActiveChat, allUser, loggedUser } =
    useContext(ContextProvider);
  const { isLoading, error, data } = useQuery("allChats");

  let getChatName = () => {
    if (activeChat) {
      let currntChat = data.filter((item) => item._id == activeChat);

      if (currntChat[0].groupChat) {
        return currntChat[0]?.groupName;
      } else {
        let reciverId = currntChat[0].users.filter(
          (item) => item !== loggedUser._id
        );

        let chatName = allUser.filter((item) => item._id == reciverId[0]);
        return chatName[0].userName;
      }
    }
  };

  return (
    <div
      className={` h-full w-full border-b border-[#EEEEEE] px-[10px] flex  items-center justify-between shadow-sm`}
    >
      <div className="flex items-center space-x-4">
        <img
          width="100"
          height="100"
          className="w-10 h-10 rounded-full object-cover"
          src="https://i.pravatar.cc/300"
          alt=""
        />
        <div className="font-medium ">
          <p className="">
            {/* {activeChat === undefined ? "Sagar Borude" : activeChat} */}
            {getChatName()}
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
