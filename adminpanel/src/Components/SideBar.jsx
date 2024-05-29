// SideBar.js
import React from "react";
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
} from "react-icons/fa";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const handleItemClick = () => {
    toggleSidebar();
  };

  return (
    <div
      className={`fixed flex flex-col justify-between  top-22 left-0 h-[calc(100vh-4rem)] lg:w-1/6 z-50 bg-gray-800 text-white p-5 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <nav>
        <ul>
          <Link to="/dashboard">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaHome className="mr-2" />
              Dashboard
            </li>
          </Link>
          <Link to="/gallery">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaImages className="mr-2" />
              Gallery
            </li>
          </Link>

          <Link to="/banner">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaFlag className="mr-2" />
              Banner
            </li>
          </Link>

          <Link to="/content">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaFlag className="mr-2" />
              Content
            </li>
          </Link>

          <Link to="/school">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaSchool className="mr-2" />
              School
            </li>
          </Link>
          <Link to="/newsnblogs">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaNewspaper className="mr-2" />
              News & Blogs
            </li>
          </Link>
          <Link to="/testimonials">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaQuoteLeft className="mr-2" />
              Testimonials
            </li>
          </Link>

          <Link to="/student">
            <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
              <FaUserGraduate className="mr-2" />
              Student
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
        <li className="mb-4 flex  items-center cursor-pointer lg:text-2xl text-xl hover:bg-gray-700 p-2 rounded">
          <FaSignOutAlt className="mr-2" />
          Logout
        </li>
      </Link>
    </div>
  );
};

export default SideBar;
