import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api_baseUrl } from "./utils";
import axios from "axios";
import Cookies from "universal-cookie";
import io from "socket.io-client";
const socket = io.connect("http://192.168.1.101:3005");

socket.emit("connection");

export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();
  let [loggedUser, setLoggedUser] = useState();
  let [onlineUser, setOnlineUsers] = useState([]);
  let [visible, setVisible] = useState(false);
  let [constctsContainer, setConstctsContainer] = useState(false);

  // Variables
  const cookies = new Cookies();

  // Function
  let logOut = () => {
    console.log("logout");
    cookies.remove("token");
    socket.emit("user_offline", loggedUser._id);
    window.location.reload();
  };

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  // Api

  let getAllUser = async () => {
    await axios
      .get(`${api_baseUrl}/getAllUser`)
      .then((result) => setAllUsers(result.data));
  };

  let getAllOnlineUse = async () => {
    await axios
      .get(`${api_baseUrl}/getOnlineUsers`)
      .then((result) => setOnlineUsers(result.data));
  };

  useEffect(() => {
    getAllOnlineUse();
    getAllUser();
  }, [socket]);

  return (
    <ContextProvider.Provider
      value={{
        user,
        activeChat,
        setActiveChat,
        allUser,
        setLoggedUser,
        loggedUser,
        handler,
        visible,
        closeHandler,
        logOut,
        getAllUser,
        onlineUser,
        socket,
        constctsContainer,
        setConstctsContainer,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
