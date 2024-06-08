
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Gallery from "./Components/Gallery";
import Banner from "./Components/Banner";
import School from "./Components/School/SchoolRequests";
import NewsandUpdates from "./Components/NewsandUpdates";
import Testimonials from "./Components/Testimonials";
import UploadStudent from "./Components/Student/UploadStudent";
import StudentList from "./Components/Student/StudentList";
import UploadSchool from "./Components/School/UploadSchool";
import Profile from "./Components/Profile";
import SideBar from "./Components/SideBar";
import UpdateProfile from "./Components/UpdateProfile";
import ChangePassword from "./Components/ChangePassword";
import ForgetPassword from "./Components/ForgetPassword";
import OtpPage from "./Components/OtpPage";
import Image from "./Components/Resources/Image";
import Video from "./Components/Resources/Video";
import Pdf from "./Components/Resources/Pdf";
import UpdatePassword from "./Components/UpdatePassword";
import CreateBlog from "./Components/CreateBlog";
import Blog from "./Components/Blog";
import StudentRequests from "./Components/Student/StudentRequests";
import UpdateBlog from "./Components/UpdateBlog";
import SchoolList from "./Components/School/SchoolList";
import SchoolRequests from "./Components/School/SchoolRequests";

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
                    <Route
                      path="/newsandupdates"
                      element={<NewsandUpdates />}
                    />

                    <Route
                      path="/studentrequest"
                      element={<StudentRequests />}
                    />
                    <Route path="/uploadstudent" element={<UploadStudent />} />
                    <Route path="/studentlist" element={<StudentList />} />

                    <Route
                      path="/schoolrequests"
                      element={<SchoolRequests />}
                    />
                    <Route path="/uploadschool" element={<UploadSchool />} />
                    <Route path="/schoollist" element={<SchoolList />} />

                 


                 
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/createblog" element={<CreateBlog />} />
                    <Route path="/createblog" element={<CreateBlog />} />
                    <Route path="/updateblog/:id" element={<UpdateBlog />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/image" element={<Image />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/pdf" element={<Pdf />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route
                      path="/updatepassword"
                      element={<UpdatePassword />}
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
