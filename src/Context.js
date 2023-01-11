import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api_baseUrl } from "./utils";
import axios from "axios";
export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();
  let [loggedUser, setLoggedUser] = useState();

  let getAllUser = async () => {
    await axios
      .get(`${api_baseUrl}/getAllUser`)
      .then((result) => setAllUsers(result.data));
  };

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
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
