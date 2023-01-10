import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api_baseUrl } from "./utils";
import axios from "axios";
export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");
  let [activeChat, setActiveChat] = useState();
  let [allUser, setAllUsers] = useState();

  let getAllUser = async () => {
    await axios
      .get(`${api_baseUrl}/getAllUser`)
      .then((result) => setAllUsers(result.data));
  };

  // const { isLoading, error, data } = useQuery("allUser", () =>
  //   fetch(`${api_baseUrl}/getAllUser`).then((res) => res.json())
  // );

  // let messages = data?.filter((item) => {
  //   return item._id === activeChat;
  // });

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <ContextProvider.Provider
      value={{ user, activeChat, setActiveChat, allUser }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
