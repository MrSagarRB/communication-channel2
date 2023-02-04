import React, { useContext, useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { CiPaperplane } from "react-icons/ci";
import axios from "axios";
import { ContextProvider } from "../Context";

const Footer = () => {
  let [newMessage, setNewMessage] = useState();
  let { loggedUser, activeChat, api_baseUrl, socket, getAllChats } =
    useContext(ContextProvider);
  let [file, setFile] = useState();

  let handelSendMessage = (e) => {
    e.preventDefault();

    if (file) {
      handelSendFile();
    } else {
      let d = new Date();
      axios
        .post(`${api_baseUrl()}/sendMessage`, {
          id: activeChat,
          message: newMessage,
          senderID: loggedUser._id,
          time: d.getHours() + ":" + d.getMinutes(),
        })
        .then(() => {
          document.getElementById("msg").value = "";
          setNewMessage();
          getAllChats();
          socket.emit("send-message", newMessage);
        });
    }
  };

  let handelFile = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    document.getElementById("msg").value = e.target.files[0].name;
  };

  let handelSendFile = () => {
    console.log("call");
    let formData = new FormData();
    formData.append("avatar", file);
    axios.post(`${api_baseUrl()}/uploadFile`, formData).then((result) => {
      setFile();
      console.log(result);
    });
  };

  let filePreviewFile = (file) => {
    if (file) {
      console.log(URL.createObjectURL(file));

      switch (file.type) {
        case "application/pdf":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png";

        case "image/png":
          return URL.createObjectURL(file);

        case "image/jpeg":
          return URL.createObjectURL(file);

        default:
          <h1>File</h1>;
      }
    }
  };

  // useEffect(() => {}, []);
  return (
    <form
      onSubmit={(e) => handelSendMessage(e)}
      autocomplete="off"
      className="h-full"
    >
      <div className="px-[10px] py-[10px] flex items-center gap-[15px] border border-[#EEEEEE] h-[100%]  w-full   bg-[#fff] relative ">
        <div
          className={`${
            !file && "hidden"
          }  h-[200px] w-[200px]  absolute -top-[210px]  rounded-md px-[10px]`}
        >
          <div className="h-[150px] overflow-hidden">
            <img
              src={filePreviewFile(file)}
              // src="http://192.168.200.63:3000/6399c04c-e4bf-4cee-a0fa-13afe37629e1"
              alt={file?.name}
              className="object-contain w-full h-full"
            />
          </div>
          <p className="text-center w-[190px] mt-[5px] truncate ... ">
            {" "}
            {file?.name}{" "}
          </p>
        </div>
        <label
          htmlFor="file"
          className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2"
        >
          <ImAttachment className="text-[20px]" />
        </label>
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => handelFile(e)}
        />

        <div className="bg-[#FAFAFA] w-[90%]  h-full">
          <input
            required
            autocomplete="off"
            type="text"
            id="msg"
            placeholder="Type your message here.."
            className="h-full w-full outline-none px-[10px] bg-transparent rounded-[12px]"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </div>

        <button
          disabled={!activeChat}
          type="submit"
          value="submit"
          className="hover:bg-[#FAFAFA] duration-300 cursor-pointer rounded-full p-2"
        >
          <CiPaperplane className="text-[30px]" />
        </button>
      </div>
    </form>
  );
};

export default Footer;
