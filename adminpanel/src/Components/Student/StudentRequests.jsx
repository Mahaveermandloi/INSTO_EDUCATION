import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StudentRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [schoolName, setSchoolName] = useState([]);
  const [schoolId, setSchoolId] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8000/api/v1/student/getAllStudentData",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setStudentData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSchoolName = async () => {
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

        console.log(schoolResponse.data.data.getData);

        if (schoolResponse.status === 200) {
          setSchoolName(schoolResponse.data.data.getData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchSchoolName();
  }, []);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);

    const school = studentData.find((school) => school.id === schoolId);
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);
    }
  };

  const handleApprove = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://localhost:8000/api/v1/studentList/createStudentList/${selectedSchool.id}`,
        {
          schoolId: schoolId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("School approved successfully!");
        const response = await axios.delete(
          `http://localhost:8000/api/v1/student/deleteStudentRequest/${selectedSchool.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Student Requests removed successfully!");

          setTimeout(() => {
            setIsModalOpen(!isModalOpen);
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      toast.error("School Not found OR Email might not be unique");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(studentData.length / entriesPerPage);

  const currentEntries = studentData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );



  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl my-5 font-bold">
              Students Requests
            </h1>
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
              <tr className="">
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  School Name
                </th>
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  Student Name
                </th>
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  Mobile Number
                </th>
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  Class
                </th>
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  Email
                </th>
                <th scope="col" className="px-4 py-2 text-base bg-gray-800">
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-base bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {currentEntries.map(
                ({
                  id,
                  school_name,
                  email,
                  city,
                  student_class,
                  mobile_number,
                  name,
                }) => (
                  <tr
                    key={id}
                    className="border-b  border-gray-200 dark:border-gray-700 text-base"
                  >
                    <td className="px-6  whitespace-nowrap">{school_name}</td>
                    <td className="px-4 py-2 text-base">{name}</td>
                    <td className="px-4 py-2 text-base">{mobile_number}</td>
                    <td className="px-4 py-2 text-base">{student_class}</td>
                    <td className="px-4 py-2 text-base">{email}</td>
                    <td className="px-4 py-2 text-base">{city}</td>
                    <td className="px-4 py-2 text-base text-center">
                      <button onClick={() => toggleModal(id)}>
                        <FaInfoCircle size={25} className="text-[#ed1450]" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

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
      </div>

      {isModalOpen && selectedSchool && (
        <div className="fixed inset-0 flex p-1 items-center justify-center bg-black bg-opacity-75">
          <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-3 lg:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl lg:mb-4">
              {selectedSchool.school_name} Info
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Field {selectedSchool.id}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Name
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Class
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.student_class}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Email
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Address
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      City
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.city}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      State
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.state}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Pincode
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.pincode}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Mobile Number
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      School Name
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.school_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Syllabus
                    </td>
                    <td className="text-base lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.syllabus}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="lg:p-2.5 font-bold text-green-400">
                Map with Schools
              </p>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 block w-full lg:p-2.5 dark:bg-gray-200"
                onChange={(e) => {
                  setSchoolId(e.target.value);
                }}
              >
                <option selected value="">
                  Choose School
                </option>
                {schoolName &&
                  schoolName.map(({ school_name, school_id }) => (
                    <option value={school_id} key={school_id}>
                      {school_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
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
    </>
  );
};

export default StudentRequests;
