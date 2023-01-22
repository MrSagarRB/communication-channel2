import React, { useContext } from "react";
import { ContextProvider } from "../Context";

const ContactCard = ({ props }) => {
  let { onlineUser } = useContext(ContextProvider);

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
            src={props.pic}
            alt=""
          />

          {onlineUser.includes(props._id) ? (
            <span
              className={`bottom-0 left-7 absolute bg-green-400   w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
            ></span>
          ) : null}
        </div>
        <div>
          <p className="capitalize  ">{props?.userName}</p>
          {/* <p>{getChatName()}</p> */}
          <p className="overflow-hidden w-[170px] text-[#9c9a9a] truncate ...">
            <div>
              {onlineUser.includes(props._id) ? (
                <p className="animate-pulse"> Online</p>
              ) : (
                " Last Seen 10:15"
              )}
            </div>
            {/* <p>{console.log(props._id)} </p> */}
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
