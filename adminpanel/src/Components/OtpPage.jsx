import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const [otpInput, setOtpInput] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:8000/verify-otp", {
        getOtp: otpInput,
      });

      if (response.status === 200) {
        alert("OTP verified successfully");
        // Redirect or navigate to another page upon successful verification
        navigate("/success");

        // Example: Redirect to a success page
      }
    } catch (error) {
      console.log(error);
      // Handle error, show error message, etc.
    }
  };

  // const resendEmail = async () => {

  // };

  const handleInputChange = (e) => {
    setOtpInput(e.target.value);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email} </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                  <div className="h-16 ">
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
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      onClick={handleVerify}
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
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
