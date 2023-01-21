import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api_baseUrl } from "./utils";
import axios from "axios";
import Cookies from "universal-cookie";
export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();
  let [loggedUser, setLoggedUser] = useState();
  const cookies = new Cookies();

  let getAllUser = async () => {
    await axios
      .get(`${api_baseUrl}/getAllUser`)
      .then((result) => setAllUsers(result.data));
  };

  // Modal
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  let logOut = () => {
    console.log("logout");
    cookies.remove("token");

    window.location.reload();
  };

  console.log(loggedUser);
  useEffect(() => {
    getAllUser();
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
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
