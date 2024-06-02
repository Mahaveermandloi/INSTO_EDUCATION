import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain alphanumeric characters only.",
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

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;

        localStorage.setItem("accessToken", accessToken);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Redirect to /dashboard and prevent going back to /login
        setTimeout(() => {
          window.location.href = "/dashboard";
          window.history.replaceState({}, document.title, "/dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User doesnot exists", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      if (error.response.status === 401) {
        toast.error("Invalid Password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };


  
  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain alphanumeric characters only
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
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
      <section className="bg-gray-100 ">
      
      
        <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-52 lg:w-72 mr-2" src={logo} alt="logo" />
          </a>


          <div className="w-full bg-gray-200  rounded-lg  shadow border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">


            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#ed1450] md:text-2xl ">
                Login to Dashboard
              </h1>
              {/* // ed1450
  // fafafa 
  313866
  */}

              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  text-gray-800"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white  bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login In
                </button>
                <p className="text-md  text-gray-900 font-semibold "> 
                  <Link to="/forgetpassword">Forget Password ?</Link>
                </p>
              </form>


              
            </div>
          </div>
        </div>



      </section>
    </>
  );
};

export default Login;
