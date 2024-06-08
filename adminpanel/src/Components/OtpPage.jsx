import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
import {URLPath} from "../URLPath";
const OtpPage = () => {
  const [otpInput, setOtpInput] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${URL}/verify-otp`, {
        getOtp: otpInput,
        email: email,
      });

      if (response.status === 200 && response.data.data.token) {
        toast.success("OTP verified successfully", {
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
          navigate("/changepassword", {
            state: { token: response.data.data.token, email: email },
          });
        }, 2000);
      } else {
        toast.error("Invalid OTP", {
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
      toast.error("Invalid OTP", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.error("Error verifying OTP:", error);
    }
  };

  const handleInputChange = (e) => {
    setOtpInput(e.target.value);
  };

  const handleResend = async () => {
    toast.info("Resending OTP...", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    try {
      await axios.post(`${URL}/check-user`, {
        email: email,
      });
      toast.success("OTP resent successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (!error.response) {
        toast.error("Network error: Please check your internet connection.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(
          "Error resending OTP: " +
            (error.response.data.message || error.message),
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
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <>
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
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <center className="m-3">
          <img className="w-52 lg:w-56" src={logo} alt="logo" />
        </center>
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-md rounded-2xl">
          <div className="mx-auto flex w-full max-w-sm flex-col space-y-3">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                  <div className="h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      value={otpInput}
                      onChange={handleInputChange}
                      placeholder="Enter OTP"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={handleVerify}
                    >
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-md font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      className="flex flex-row items-center text-gray-800"
                      onClick={handleResend}
                    >
                      Resend
                    </button>
                  </div>
                  <div>
                    <button
                      className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Go back to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
