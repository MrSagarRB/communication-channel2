import React, { createContext, useState } from "react";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState("");

  

  let [activeChat, setActiveChat] = useState();

  return (
    <ContextProvider.Provider value={{ user, activeChat, setActiveChat }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
