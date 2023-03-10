import React, { useContext } from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import { ContextProvider } from "../Context";

const UserContainer = ({ props }) => {
  let { activeChat, allUser, loggedUser, onlineUser } =
    useContext(ContextProvider);
  let getChatName = () => {
    if (props?.groupChat) {
      return {
        chatname: props?.groupName,
        pic: "https://cdn-icons-png.flaticon.com/512/166/166258.png",
      };
    } else {
      let senderUserId = props.users.filter((item) => item !== loggedUser._id);
      let ChatName = allUser?.filter((item) => item._id == senderUserId);
      return (
        ChatName && {
          chatname: ChatName[0]?.userName,
          pic: ChatName[0]?.pic,
        }
      );
    }
  };

  return (
    <div
      className={`px-[20px]  ${activeChat === props._id ? "bg-[#EEEEEE]" : ""} 
      } flex items-center justify-between text-[14px] py-[10px] cursor-pointer duration-300  `}
    >
      <div className="flex gap-[10px] items-center">
        <div className="relative  h-10 w-10">
          <img
            width="100"
            height="100"
            className="w-10 h-10 rounded-full object-cover"
            src={getChatName()?.pic}
            alt=""
          />
        </div>
        <div>
          <p className="capitalize">{getChatName()?.chatname}</p>
          <p className="overflow-hidden w-[170px] text-[#9c9a9a] truncate ...">
            <p>{props?.messages[props?.messages?.length - 1]?.text}</p>
          </p>
        </div>
      </div>
      <div className="flex flex-col  items-end">
        <p className="">{props?.messages[props?.messages?.length - 1]?.time}</p>
        <RiCheckDoubleLine
          className={props?.messages == "" ? "invisible" : ""}
        />
      </div>
    </div>
  );
};

export default UserContainer;
