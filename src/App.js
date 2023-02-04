import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { ContextProvider } from "./Context";
import { Cookies } from "react-cookie";
import Loader from "./components/Loader";
import axios from "axios";

const App = () => {
  let { loggedUser, setLoggedUser, api_baseUrl, update } =
    useContext(ContextProvider);
  let [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return !isLoading ? (
    <div className="">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loggedUser === undefined ? (
                <Login />
              ) : (
                <Navigate replace to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={
              loggedUser === undefined ? <Navigate replace to="/" /> : <Home />
            }
          />
          <Route path="/create-account" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  ) : (
    <Loader />
  );
};

export default App;
