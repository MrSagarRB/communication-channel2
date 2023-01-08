import React, { useContext } from "react";
import { useQuery } from "react-query";
import { ContextProvider } from "../Context";
import { api_baseUrl } from "../utils";

const ChatContainer = () => {
  let { activeChat, setActiveChat } = useContext(ContextProvider);

  const { isLoading, error, data } = useQuery("allMessages", () =>
    fetch(`${api_baseUrl}/getAllMesaages`).then((res) => res.json())
  );

  console.log(data);
  return (
    <div className=" flex flex-col gap-[15px]  h-full">
      {activeChat === undefined ? (
        <div className=" h-full w-full flex items-center justify-center">
          <div className="h-[400px] w-[400px] overflow-hidden ">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49bcfd78364175.5ca3009cb692f.gif" />{" "}
          </div>
        </div>
      ) : (
        data?.map((item) => {
          return (
            <div className="flex flex-col sm:flex-row gap-[10px] ">
              <div className=" h-[50px] w-[50px]">
                <img
                  className="h-[50px] w-[50px] rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1654345503171-211d64f7749b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </div>

              <div className="bg-[#F4F4F7] py-[10px] px-[20px] rounded-b-[16px] rounded-tr-[16px] sm:max-w-[70%]">
                <p>{item.message}</p>
                <p className="text-[#868383]">15:42</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatContainer;
