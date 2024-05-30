// import React, { useState } from "react";
// import axios from "axios";
// import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
// import { useNavigate } from "react-router-dom";

// const ForgetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("http://localhost:8000/check-user", { email });

//       if (response.status === 200) {
//         // Handle successful response
//         console.log("Success:", response.data);
//         alert("Email sent successfully");
//         navigate("/otppage")
//       } else {
//         // Handle errors
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       // Re-enable the button after 10 seconds
//       setTimeout(() => setIsSubmitting(false), 1000);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-100">
//       <img src={logo} alt="Logo" />
//       <div className="w-full max-w-xs">
//         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'cursor-not-allowed' : ''}`}
//               type="submit"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;

import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8000/check-user", {
        email,
      });
      if (response.status === 200) {
        const email = response.data.data.email;
        alert("OTP sent successfully on email");
        // Navigate to OTP page with email and otp as parameters
        navigate(`/otppage/${email}`);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("No user with this email");
      }
      console.error("Error:", error);
    } finally {
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="Logo" />
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
