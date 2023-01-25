import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import io from "socket.io-client";
const socket = io.connect("http://192.168.1.101:3005");
socket.emit("test_socket", () => {
  console.log("connected");
});

export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();
  let [loggedUser, setLoggedUser] = useState();
  let [onlineUser, setOnlineUsers] = useState([]);
  let [visible, setVisible] = useState(false);
  let [constctsContainer, setConstctsContainer] = useState(false);
  // tested
  let [chats, setAllChats] = useState();

  // Variables
  const cookies = new Cookies();

  // Function
  const api_baseUrl = () => {
    if (window.location.origin == "http://192.168.1.101:3000") {
      return "http://192.168.1.101:3005/api";
    } else {
      return "/api";
    }
  };

  let logOut = () => {
    console.log("logout");
    cookies.remove("token");
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
      .get(`${api_baseUrl()}/getAllUsers`)
      .then((result) => setAllUsers(result.data));
  };

  let getAllOnlineUsers = async () => {
    await axios
      .get(`${api_baseUrl()}/getOnlineUsers`)
      .then((result) => setOnlineUsers(result.data));
  };

  let getAllChats = async () => {
    await axios
      .get(`${api_baseUrl()}/getAllChats`)
      .then((result) => setAllChats(result.data));
  };

  useEffect(() => {
    getAllOnlineUsers();
    getAllUser();
    getAllChats();
  }, []);

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
        constctsContainer,
        setConstctsContainer,
        api_baseUrl,
        chats,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
