import React from "react";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";

const ForgetPassword = () => {
    
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="" />
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Submit
            </button>
      
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
