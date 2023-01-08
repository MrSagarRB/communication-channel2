import React, { createContext, useState } from "react";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  let [user, setUser] = useState({
    _id: "63bac2e30dda230da91e26f5",
  });

  let [activeChat, setActiveChat] = useState();

  return (
    <ContextProvider.Provider value={{ user, activeChat, setActiveChat }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
