import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaSchool,
  FaNewspaper,
  FaQuoteLeft,
  FaUserGraduate,
  FaFlag,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = () => {
    toggleSidebar();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed flex flex-col  top-22 left-0 h-[calc(100vh-4rem)] lg:w-1/6 z-50 bg-gray-800 text-white p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        <nav>
          <ul>
            <Link to="/dashboard">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
           
              >
                <FaHome className="mr-2" />
                Dashboard
              </li>
            </Link>
            <Link to="/gallery">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
           
              >
                <FaImages className="mr-2" />
                Gallery
              </li>
            </Link>
            <Link to="/banner">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
         
              >
                <FaFlag className="mr-2" />
                Banner
              </li>
            </Link>
            <li
              className="mb-4 flex justify-between items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                <FaFlag className="mr-2" />
                Content
              </div>
              <FaChevronDown size={20} />
            </li>
            <ul
              className={`ml-6 space-y-2 transition-all duration-500 ${
                isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <Link to="/image">
                <li className="flex items-center cursor-pointer text-2xl hover:bg-gray-700 p-2 rounded">
                  Image
                  
                </li>
              </Link>
              <Link to="/video">
                <li className="flex items-center cursor-pointer text-2xl hover:bg-gray-700 p-2 rounded">
                  Video
                </li>
              </Link>
              <Link to="/pdf">
                <li className="flex items-center cursor-pointer text-2xl hover:bg-gray-700 p-2 rounded">
                  PDF
                </li>
              </Link>
            </ul>
            <Link to="/school">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
              
              >
                <FaSchool className="mr-2" />
                School
              </li>
            </Link>
            <Link to="/newsnblogs">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
             
              >
                <FaNewspaper className="mr-2" />
                News & Blogs
              </li>
            </Link>
            <Link to="/testimonials">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
            
              >
                <FaQuoteLeft className="mr-2" />
                Testimonials
              </li>
            </Link>
            <Link to="/student">
              <li
                className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded"
            
              >
                <FaUserGraduate className="mr-2" />
                Student List
              </li>
            </Link>
          </ul>

        </nav>
      
      
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.reload(); //
          }}
        >
          <li className="mb-4 flex items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
            <FaSignOutAlt className="mr-2" />
            Logout
          </li>
        </Link>



      </div>
    </>
  );
};

export default SideBar;
