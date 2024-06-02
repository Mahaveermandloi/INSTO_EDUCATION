import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
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
import OtpPage from "./Components/OtpPage";
import Image from "./Components/Resources/Image";
import Video from "./Components/Resources/Video";
import Pdf from "./Components/Resources/Pdf";

const App = () => {
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
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otppage/:email" element={<OtpPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="">
                <Header />
                <SideBar />
                <main className="p-5 ml-auto w-full">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/banner" element={<Banner />} />
                    <Route path="/school" element={<School />} />
                    <Route path="/newsnblogs" element={<NewsnBlogs />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/content" element={<Content />} />

                    <Route path="/image" element={<Image />} />
                    <Route path="video" element={<Video />} />
                    <Route path="pdf" element={<Pdf />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
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
