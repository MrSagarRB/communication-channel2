import axios from "axios";
import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { ContextProvider } from "../Context";
import { api_baseUrl } from "../utils";
import ContactCard from "./ContactCard";
import { userId } from "../utils";

const ContactContainer = () => {
  let { allUser } = useContext(ContextProvider);
  console.log(allUser);

  let handelCreateChat = async (item) => {
    await axios
      .post(`${api_baseUrl}/createNewChat`, {
        users: [item._id, userId],
      })
      .then(() => alert("Chat Created"));
    console.log(item._id);
  };

  let filterUser = allUser?.filter((item) => item._id !== userId);

  return (
    <div className="h-full w-full border-r border-[#EEEEEE] shadow-sm bg-[#EEEEEE] ">
      <div className="w-full  px-[25px] py-[27px] ">
        <p className="text-[23px] font-[700]"> Conatcts</p>
        <div className="bg-[#fff] h-[36px] mt-[18px] flex items-center gap-[10px] overflow-hidden border rounded-[12px] pl-[12px] ">
          <BiSearch className="text-[#676767] text-[18px]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none h-full w-full bg-transparent"
          />
        </div>
        <p className="text-[14px] mt-[11px]  w-[110px]">
          Sort by <span className="text-[#2D9CDB]"> Newest</span>
        </p>
      </div>
      <div className=" h-[600px]  flex flex-col duration-1000 ">
        {filterUser?.map((item) => {
          return (
            <div onClick={() => handelCreateChat(item)}>
              <ContactCard props={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactContainer;
