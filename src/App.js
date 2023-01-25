import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { ContextProvider } from "./Context";
import { Cookies } from "react-cookie";
import Loader from "./components/Loader";
import axios from "axios";
import { api_baseUrl } from "./utils";

const queryClient = new QueryClient();
const App = () => {
  let { loggedUser, setLoggedUser } = useContext(ContextProvider);
  let [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  console.log(loggedUser);

  let checkToken = () => {
    let stroredToken = cookies.get("token");
    if (stroredToken) {
      axios
        .post(`${api_baseUrl}/getUserByID`, { token: stroredToken })
        .then((result) => {
          setLoggedUser(result.data[0]);
        });
    } else {
      console.log("no");
    }
  };

  useEffect(() => {
    checkToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return !isLoading ? (
    <div className="">
      <QueryClientProvider client={queryClient}>
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
                loggedUser === undefined ? (
                  <Navigate replace to="/" />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/create-account" element={<CreateUser />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  ) : (
    <Loader />
  );
};

export default App;
