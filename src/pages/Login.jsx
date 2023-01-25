import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_baseUrl } from "../utils";
import { ContextProvider } from "../Context";
import Cookies from "universal-cookie";

const Login = () => {
  let [userDetails, setUserDetails] = useState();
  let { setLoggedUser } = useContext(ContextProvider);
  const cookies = new Cookies();
  const navigate = useNavigate();

  // let checkToken = () => {
  //   let stroredToken = cookies.get("token");
  //   if (stroredToken) {
  //     axios.post(`/api/getUserByID`, { token: stroredToken }).then((result) => {
  //       setLoggedUser(result.data[0]);
  //     });
  //   } else {
  //     console.log("no");
  //   }
  
  let handelInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  let handelLogin = (e) => {
    e.preventDefault();
    axios.post(`/api/login`, userDetails).then((result) => {
      console.log(result.data);
      if (result.data[0] === undefined) {
        alert("Wrong Email");
      } else {
        setLoggedUser(result.data[0]);
        cookies.set("token", result.data[0]._id);
        alert("Logged in ");
        navigate("/home");
      }
    });
  };

  return (
    <div className="flex items-center justify-center  h-screen w-full ">
      <div className=" w-[80%] sm:w-[400px] text-black">
        <form onSubmit={(e) => handelLogin(e)} autocomplete="off">
          <div className="mb-6 ">
            <label for="email" className="block mb-2 text-sm font-medium ">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              onChange={(e) => handelInputChange(e)}
              autocomplete="off"
              required
            />
          </div>
          <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-medium ">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handelInputChange(e)}
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <label for="remember" className="ml-2 text-sm font-medium  ">
              No Account?
            </label>
            <Link
              to="/create-account"
              for="remember"
              className="ml-2 text-sm font-medium  text-blue-500"
            >
              Create Account
            </Link>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
