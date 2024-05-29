// // // Header.js
// // import React, { useState } from "react";
// // import { FaUserTie } from "react-icons/fa";
// // import { GiHamburgerMenu } from "react-icons/gi";
// // // import logo from "../Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
// // import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
// // import SideBar from "./SideBar";

// // import { Outlet } from "react-router-dom";
// // const Header = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {

// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <>
// //       <header className="border-b-8 sticky top-0 z-50 bg-white border-gray-200 lg:justify-between p-10 lg:items-center lg:flex flex justify-around items-center h-16">

// //         <div className="">
// //           <GiHamburgerMenu size={40} onClick={toggleSidebar} />
// //         </div>

// //         <div className="p-5">
// //           <img src={logo} alt="Logo" className="h-10" />
// //         </div>
// //         <div>
// //           <FaUserTie size={40} />
// //         </div>
// //       </header>
// //       <div className="flex justify-center">
// //         <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

// //         <main
// //           className={`p-4 ml-auto ${
// //             isSidebarOpen ? "lg:w-10/12 w-full " : "w-full"
// //           } bg-green-300`}
// //         >
// //           <Outlet />
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // export default Header;

// // Header.js
// import React, { useState } from "react";
// import { FaUserTie } from "react-icons/fa";
// import { GiHamburgerMenu } from "react-icons/gi";
// import logo from "../assets/Intso_Slicing_Assets/Header_Logo/Header_Logo.png";
// import SideBar from "./SideBar";
// import { Outlet } from "react-router-dom";

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default in desktop mode

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <header className="border-b-8 sticky top-0 z-50 bg-white border-gray-200 lg:justify-between p-5 lg:items-center lg:flex flex justify-around items-center h-16">
//         <div className="lg:hidden"> {/* Render hamburger menu only in mobile view */}
//           <GiHamburgerMenu size={40} onClick={toggleSidebar} />
//         </div>

//         <div className="p-5">
//           <img src={logo} alt="Logo" className="h-10" />
//         </div>
//         <div>
//           <FaUserTie size={40} />
//         </div>
//       </header>
//       <div className="flex justify-center">
//         {isSidebarOpen || window.innerWidth < 1024 ? ( // Render sidebar if open or in mobile view
//           <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         ) : null}

//         {/* Render main content with conditional width based on sidebar state */}
//         <main className={`p-4 ml-auto ${isSidebarOpen ? "lg:w-10/12 w-full  " : "w-full"}`}>
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// };

// export default Header;

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

    // Set initial state
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
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
