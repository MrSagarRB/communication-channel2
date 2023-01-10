import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Context, { ContextProvider } from "./Context";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <Context>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create-account" element={<CreateUser />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </Context>
    </div>
  );
};

export default App;
