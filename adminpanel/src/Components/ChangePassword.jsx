import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error when user types
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.newPassword)) {
      setError("Password must be at least 8 characters long and include both letters and numbers.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/update-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(formData.oldPassword);
      alert(formData.newPassword);

      alert("Password Changed Successfully");
      navigate("/profile");
      console.log("Password changed successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Old Password is incorrect");
      } else {
        console.error("Error changing password:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Change Password</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Enter your old password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
