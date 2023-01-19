import axios from "axios";
import React, { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ContextProvider } from "../Context";
import { api_baseUrl } from "../utils";
import ContactCard from "./ContactCard";
import { Modal, Button, Image, Text, Link } from "@nextui-org/react";

const ContactContainer = ({ constctsContainer, setConstctsContainer }) => {
  let { allUser, loggedUser, setActiveChat, visible, closeHandler, handler } =
    useContext(ContextProvider);

  let [inputCheck, setInputCheck] = useState([loggedUser._id]);
  let [inputGroupName, setInputGroupName] = useState();

  let handelCreateChat = async (item) => {
    axios
      .post(`${api_baseUrl}/findChatByID`, {
        users: [item._id, loggedUser._id],
      })
      .then((result) => {
        if (result.data[0] === undefined) {
          axios
            .post(`${api_baseUrl}/createNewChat`, {
              users: [item._id, loggedUser._id],
              members: [item.userName, loggedUser.userName],
              groupChat: false,
            })
            .then(() => {
              alert("Chat Created");
              setConstctsContainer(false);
            });
        } else {
          setConstctsContainer(false);
        }
      });
  };

  let handelCreateGroupChat = async () => {
    axios
      .post(`${api_baseUrl}/createNewChat`, {
        groupChat: true,
        users: inputCheck,
        admin: loggedUser._id,
        groupName: inputGroupName,
      })
      .then(() => {
        alert("Group Created");
        setConstctsContainer(false);
        closeHandler();
      });
  };

  let filterUser = allUser?.filter((item) => item._id !== loggedUser._id);
  console.log(inputGroupName);
  return (
    <div className="h-full w-full border-r border-[#EEEEEE] shadow-sm bg-[#EEEEEE] ">
      <Modal noPadding open={visible} onClose={closeHandler}>
        <div className="h-[500px] p-[20px] flex flex-col">
          <div class="mb-6">
            <label for="email" class="block mb-2  font-medium text-xl">
              Create Group
            </label>
            <input
              onChange={(e) => setInputGroupName(e.target.value)}
              type="text"
              id="groupName"
              class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Group name"
            />
          </div>
          <div className=" h-[300px] flex flex-col px-[20px] overflow-y-scroll">
            {allUser.map((item, ind) => {
              return (
                <div class="flex items-center mb-4">
                  <input
                    id={ind}
                    type="checkbox"
                    value={item._id}
                    onClick={(e) => {
                      setInputCheck([...inputCheck, e.target.value]);
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for={ind}
                    class="ml-2 text-sm font-medium text-gray-900 "
                  >
                    {item.userName}
                  </label>
                </div>
              );
            })}
          </div>

          <button
            disabled={!inputGroupName}
            onClick={() => handelCreateGroupChat()}
            type="submit"
            class="text-white mt-[20px] w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Group
          </button>
        </div>
      </Modal>
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
        <p className="text-[14px] mt-[11px]  w-[110px]" onClick={handler}>
          Create <span className="text-[#2D9CDB] cursor-pointer"> Group</span>
        </p>
      </div>
      <div className=" h-[600px]  flex flex-col duration-1000  ">
        {filterUser?.map((item) => {
          return (
            <div className="" onClick={() => handelCreateChat(item)}>
              <ContactCard props={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactContainer;
