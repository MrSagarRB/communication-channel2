import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import io from "socket.io-client";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();
  let [loggedUser, setLoggedUser] = useState();
  let [onlineUser, setOnlineUsers] = useState([]);
  let [visible, setVisible] = useState(false);
  let [constctsContainer, setConstctsContainer] = useState(false);
  let [socketConnected, setSocketConnected] = useState(null);

  let [socket, setSocket] = useState(io(`/api`));

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
      // return "http://192.168.200.63:3005/api";
    }
  };
  console.log(api_baseUrl());

  // const socket = io(`http://192.168.1.101:3005`);

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
    // checkToken();
    let myfunction = async () => {
      let stroredToken = cookies.get("token");
      if (stroredToken) {
        await axios
          .post(`${api_baseUrl()}/getUserByID`, { token: stroredToken })
          .then((result) => {
            setLoggedUser(result.data[0]);
            socket.emit("setup", result.data[0]);
            console.log(loggedUser);
          });
      } else {
        console.log("no token");
      }
    };
    myfunction();
    getAllOnlineUsers();
    getAllUser();
    getAllChats();

    // socket = io(`http://192.168.1.101:3005`);

    // socket.emit("setup", loggedUser);
    socket.on("connection", () => {
      setSocketConnected(true);
    });

    // if (!socket || socket.readyState === WebSocket.CLOSED) {
    //   setSocket(io.connect(`http://192.168.1.101:3005`));
    // }

    // const socket = io.connect(`http://192.168.1.101:3005`);
    socket.on("refect-data", () => {
      console.log("hello");
      getAllChats();
    });
  }, []);

  console.log(socket.id);

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
        socket,
        getAllChats,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
