import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center test h-screen w-full">
      <Link to="/home">
        {" "}
        <p className="text-2xl text-blue-500">Login</p>
      </Link>{" "}
    </div>
  );
};

export default Login;
