import React, { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

import { Link } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

   
    handleResize();

    
    window.addEventListener("resize", handleResize);

    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="border-b-8 sticky top-0 z-50 bg-white border-gray-200 lg:justify-between p-5 lg:items-center lg:flex flex justify-around items-center h-16">
        <div className="lg:hidden">
          <GiHamburgerMenu size={40} onClick={toggleSidebar} />
        </div>

        <div className="p-5">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div>
          <Link to="/profile">
            <FaUserTie size={40} className="" />
          </Link>
        </div>
      </header>


      <div className="flex justify-center">
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>


      
    </>
  );
};

export default Header;
