import React from "react";
import { RiCheckDoubleLine } from "react-icons/ri";

const ContactCard = ({ props }) => {
  return (
    <div
      className={`px-[20px]  
    } flex items-center justify-between text-[14px] py-[10px] cursor-pointer duration-300 hover:bg-[#fff]  `}
    >
      <div className="flex gap-[10px] items-center">
        <div className="relative  h-10 w-10">
          <img
            width="100"
            height="100"
            className="w-10 h-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1652018145149-b61a9566b245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
            alt=""
          />
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div>
          <p>{props?.userName}</p>
          {/* <p>{getChatName()}</p> */}
          <p className="overflow-hidden w-[170px] text-[#9c9a9a] truncate ...">
            <p>ONLINE</p>
          </p>
        </div>
      </div>
      <div className="flex flex-col  items-end">
        {/* <p className="">16:12</p>
        <RiCheckDoubleLine className=" " /> */}
      </div>
    </div>
  );
};

export default ContactCard;
