import React from "react";

const CreateUser = () => {
  return (
    <div className="flex items-center justify-center  h-screen w-full ">
      <div className=" w-[80%] sm:w-[400px] text-black">
        <form autocomplete="off">
          <div className="mb-6 ">
            <label for="email" className="block mb-2 text-sm font-medium ">
              Your Name
            </label>
            <input
              autocomplete="off"
              type="text"
              id="name"
              className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Eg. Sagar "
              required
            />
          </div>
          <div className="mb-6 ">
            <label for="email" className="block mb-2 text-sm font-medium ">
              Your Email
            </label>
            <input
              autocomplete="off"
              type="email"
              id="email"
              className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-medium ">
              Your password
            </label>
            <input
              autocomplete="off"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label for="remember" className="ml-2 text-sm font-medium  ">
              Remember me
            </label>
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

export default CreateUser;
