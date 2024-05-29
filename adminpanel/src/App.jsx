// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
// import Header from "./Components/Header";
// import SignUp from "./Components/SignUp";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";
// import Gallery from "./Components/Gallery";
// import Banner from "./Components/Banner";
// import School from "./Components/School";
// import NewsnBlogs from "./Components/NewsnBlogs";
// import Testimonials from "./Components/Testimonials";
// import Student from "./Components/Student";
// import Content from "./Components/Content";
// import Profile from "./Components/Profile";
// import SideBar from "./Components/SideBar";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <div className="flex">
//         <SideBar />

//         <main className=" bg-green-300 p-5 ml-auto w-full ">
//           <Routes>
//             {/* <Route path="/" element={<Login />} /> */}
//             {/* <Route path="/register" element={<SignUp />} /> */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/gallery" element={<Gallery />} />
//             <Route path="/banner" element={<Banner />} />
//             <Route path="/school" element={<School />} />
//             <Route path="/newsnblogs" element={<NewsnBlogs />} />
//             <Route path="/testimonials" element={<Testimonials />} />
//             <Route path="/student" element={<Student />} />
//             <Route path="/content" element={<Content />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </main>

//         {/* <Routes>

//           <Route path="/register" element={<Login />} />
//         </Routes> */}
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Gallery from "./Components/Gallery";
import Banner from "./Components/Banner";
import School from "./Components/School";
import NewsnBlogs from "./Components/NewsnBlogs";
import Testimonials from "./Components/Testimonials";
import Student from "./Components/Student";
import Content from "./Components/Content";
import Profile from "./Components/Profile";
import SideBar from "./Components/SideBar";
import UpdateProfile from "./Components/UpdateProfile";
import ChangePassword from "./Components/ChangePassword";
import ForgetPassword from "./Components/ForgetPassword";

const App = () => {
  // const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/register" element={<SignUp />} /> */}


        <Route path="/forgetpassword" element={<ForgetPassword/>} />

        {/* You can place your Sidebar here */}
        {/* <Header /> */}

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="">
                <Header />
                <SideBar />
                <main className="  p-5 ml-auto w-full ">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/banner" element={<Banner />} />
                    <Route path="/school" element={<School />} />
                    <Route path="/newsnblogs" element={<NewsnBlogs />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/content" element={<Content />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route
                      path="/changepassword"
                      element={<ChangePassword />}
                    />
                  </Routes>
                </main>
              </div>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
