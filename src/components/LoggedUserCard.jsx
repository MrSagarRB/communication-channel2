import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ContextProvider } from "../Context";

const LoggedUserCard = () => {
  let { loggedUser, logOut } = useContext(ContextProvider);

  return (
    <div className="flex items-center  justify-between ">
      <div className="flex gap-[15px]">
        <img
          width="100"
          height="100"
          className="w-10 h-10 rounded-full object-cover"
          src={loggedUser.pic}
          alt=""
        />
        <div className="font-medium ">
          <p className="">{loggedUser.userName}</p>
          <div className="text-sm  text-[#27AE60] ">Online</div>
        </div>
      </div>
      <div onClick={() => logOut()}>
        <BsThreeDotsVertical className="text-xl" />
      </div>
    </div>
  );
};

export default LoggedUserCard;
