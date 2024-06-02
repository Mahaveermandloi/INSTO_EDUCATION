import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(120); // 5 minutes in seconds

  const location = useLocation();
  const navigate = useNavigate();
  const { token, email } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        navigate("/login");
      }
    }, 1000); // Update time every second

    return () => clearTimeout(timer);
  }, [timeRemaining, navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/verify-token",
          { token, email }
        );

        if (response.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyToken();
  }, [token, email, navigate]);

  const handleChangePassword = async () => {
    // Check if password is alphanumeric
    const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!alphanumericRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include both letters and numbers.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/update-new-password",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Failed to change password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(
        "Error changing password: " +
          (error.response?.data?.message || error.message),
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 p-4  lg:py-12">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <center>
        <img className="w-52 lg:w-56 lg:my-10" src={logo} alt="logo" />
      </center>
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-md rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p className="text-gray-800">Change Password</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                <div className="h-16">
                  <input
                    className=" text-black hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-normal rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                    border
                    border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                <div className="h-16">
                  <input
                    className="text-black hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                    border
                    border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>

                <div>
                  <button
                    className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => navigate("/login")}
                  >
                    Go back to Login
                  </button>
                </div>

                <div className="text-red-500 font-bold text-2xl text-center">
                  Time Remaining: {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
