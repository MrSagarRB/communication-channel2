import React, { useContext } from "react";
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

const queryClient = new QueryClient();
const App = () => {
  let { loggedUser } = useContext(ContextProvider);

  return (
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
  );
};

export default App;
