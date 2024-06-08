import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolData, setSchoolData] = useState([]);
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSchoolName, setSelectedSchoolName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClassChange = (event) => {
    const which_class = event.target.value;
    setSelectedClass(which_class);
  };

  const handleSchoolNameChange = (event) => {
    const which_school = event.target.value;
    setSelectedSchoolName(which_school);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Fetch school data
      const schoolResponse = await axios.get(
        "http://localhost:8000/api/v1/school/getSchoolData",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (schoolResponse.status === 200) {
        setSchoolNameList(schoolResponse.data.data.getData);
      }

      // Fetch student data
      const studentResponse = await axios.get(
        "http://localhost:8000/api/v1/studentList/getAllStudents",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      let filteredData = studentResponse.data;

      if (selectedClass && selectedSchoolName) {
        filteredData = filteredData.filter(
          (item) =>
            item.student_class === selectedClass &&
            item.school_name === selectedSchoolName
        );
      } else if (selectedClass) {
        filteredData = filteredData.filter(
          (item) => item.student_class === selectedClass
        );
      } else if (selectedSchoolName) {
        filteredData = filteredData.filter(
          (item) => item.school_name === selectedSchoolName
        );
      }

      setSchoolData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedSchoolName]);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);

    const school = schoolData.find((school) => school.id === schoolId);
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);
    }
  };

  const totalPages = Math.ceil(schoolData.length / itemsPerPage);
  const currentData = schoolData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div className=" lg:flex justify-between  items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl  lg:my-5 font-bold">
              Students List
            </h1>
          </div>

          <div className="  lg:flex lg:gap-10 mt-3  lg:space-y-0 space-y-3 lg:mt-5  lg:w-1/2">
            <div className="w-full">
              <form className="w-full mx-auto ">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300  text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2  lg:p-2.5 dark:bg-gray-200 "
                  onChange={handleClassChange}
                >
                  <option selected>Choose a class</option>
                  <option value="1" className="text-center ">
                    1
                  </option>
                  <option value="2" className="text-center ">
                    2
                  </option>
                  <option value="3" className="text-center ">
                    3
                  </option>
                  <option value="4" className="text-center ">
                    4
                  </option>
                  <option value="5" className="text-center ">
                    5
                  </option>
                  <option value="6" className="text-center ">
                    6
                  </option>
                  <option value="7" className="text-center ">
                    7
                  </option>
                  <option value="8" className="text-center ">
                    8
                  </option>
                  <option value="9" className="text-center ">
                    9
                  </option>
                  <option value="10" className="text-center ">
                    10
                  </option>
                  <option value="11" className="text-center ">
                    11
                  </option>
                  <option value="12" className="text-center ">
                    12
                  </option>
                </select>
              </form>
            </div>

            <div className="w-full ">
              <form class="w-full mx-auto">
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200  "
                  onChange={handleSchoolNameChange}
                >
                  <option selected>Choose School</option>

                  {schoolNameList &&
                    schoolNameList.map(({ school_name, school_id }) => (
                      <option value={school_name} key={school_id}>
                        {school_name}
                      </option>
                    ))}
                </select>
              </form>
            </div>
          </div>
        </div>

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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
              <tr className="">
                <th scope="col" className="px-4 py-2 text-md bg-gray-800  ">
                  School Name
                </th>
                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Student Name
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Mobile Number
                </th>
                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Class
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Email
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  City
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No matching records found
                  </td>
                </tr>
              ) : (
                currentData.map((school) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-100 dark:border-gray-300"
                    key={school.id}
                  >
                    <td className="px-4 py-2 text-base font-bold text-black">
                      {school.school_name}
                    </td>
                    <td className="px-4 py-2 ">{school.name}</td>

                    <td className="px-4 py-2 ">{school.mobile_number}</td>
                    <td className="px-4 py-2">{school.student_class}</td>

                    <td className="px-4 py-2 ">{school.email}</td>

                    <td className="px-4 py-2 ">{school.city}</td>

                    <td className="px-4 py-2  ">
                      <button onClick={() => toggleModal(school.id)}>
                        <FaInfoCircle size={20} className="text-green-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

       
       
        {totalPages > 1 && (
          <div className="mt-2 fixed-bottom flex justify-center">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronLeft />
            </button>

            {/* Page numbers */}
            {[...Array(Math.min(totalPages, 3)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {number + 1}
              </button>
            ))}

            {/* Show number 4 after 3 pages */}
            {currentPage >= 4 && (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-500"
                >
                  ...
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`mx-1 px-3 py-1 rounded bg-blue-500 text-white`}
                >
                  {currentPage} 
                </button>
              </>
            )}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        

        {isModalOpen && selectedSchool && (
          <div className="fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-75">
            <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 ">
                {selectedSchool.school_name} Info
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="">
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Name
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Class
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.student_class}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Email
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Address
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        City
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.city}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        State
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.state}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Pincode
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.pincode}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Mobile Number
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.mobile_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        School Name
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.school_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Syllabus
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.syllabus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#ed1450] text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
