import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ContextProvider } from "../Context";

const LoggedUserCard = () => {
  let { loggedUser } = useContext(ContextProvider);

  return (
    <div className="flex items-center  justify-between ">
      <div className="flex gap-[15px]">
        <img
          width="100"
          height="100"
          className="w-10 h-10 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1654345503171-211d64f7749b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
        <div className="font-medium ">
          <p className="">{loggedUser.userName}</p>
          <div className="text-sm  text-[#27AE60] ">Online</div>
        </div>
      </div>
      <div>
        <BsThreeDotsVertical className="text-xl" />
      </div>
    </div>
  );
};

export default LoggedUserCard;
