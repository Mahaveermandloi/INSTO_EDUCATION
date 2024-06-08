import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfoCircle } from "react-icons/fa";

const SchoolRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8000/api/v1/school/getSchoolData",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setSchoolData(response.data.data.getData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);
    const school = schoolData.find((school) => school.school_id === schoolId);
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);
    }
  };

  const handleApprove = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8000/api/v1/school/approveSchool/${selectedSchool.school_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSchoolData((prevData) =>
          prevData.map((school) =>
            school.school_id === selectedSchool.school_id
              ? { ...school, status: "approved" }
              : school
          )
        );
        toast.success("School approved successfully!");

        setTimeout(() => {
          setIsModalOpen(!isModalOpen);
        }, 1000);
      }
    } catch (error) {
      console.error("Error approving school:", error);
      toast.error("Error approving school. Please try again later.");
    }
  };

  const handleReject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8000/api/v1/school/rejectSchool/${selectedSchool.school_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSchoolData((prevData) =>
          prevData.map((school) =>
            school.school_id === selectedSchool.school_id
              ? { ...school, status: "rejected" }
              : school
          )
        );
        toast.success("School rejected successfully!");
        setTimeout(() => {
          setIsModalOpen(!isModalOpen);
        }, 1000);
      }
    } catch (error) {
      console.error("Error rejecting school:", error);
      toast.error("Error rejecting school. Please try again later.");
    }
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl my-5 font-bold">
              School Requests
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
                <th
                  scope="col"
                  className="px-6 py-3 text-lg bg-gray-800 dark:bg-gray-800"
                >
                  School Name
                </th>
                <th scope="col" className="px-6 py-3 text-lg bg-gray-800">
                  Email
                </th>

                <th scope="col" className="px-6 py-3 text-lg bg-gray-800">
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-800 text-lg dark:bg-gray-800"
                >
                  State
                </th>

                <th scope="col" className="px-6 py-3 text-lg bg-gray-800">
                  Mobile Number
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-800 text-lg dark:bg-gray-800"
                >
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-lg bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody>
              {schoolData &&
                schoolData.map(
                  ({
                    school_id,
                    school_name,
                    email,
                    city,
                    state,
                    status,
                    mobile_number,
                  }) => (
                    <tr
                      key={school_id}
                      className="border-b border-gray-200 dark:border-gray-700 text-lg"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {school_name}
                      </td>
                      <td className="px-6 py-4">{email}</td>

                      <td className="px-6 py-4">{city}</td>
                      <td className="px-6 py-4">{state}</td>

                      <td className="px-6 py-4">{mobile_number}</td>

                      <td className="px-6 py-4">
                        <span
                          className={` ${
                            status === "approved"
                              ? "bg-green-500"
                              : status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-white px-2 py-1 rounded`}
                        >
                          {status || "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button onClick={() => toggleModal(school_id)}>
                          <FaInfoCircle size={30} className="text-[#ed1450]" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedSchool && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">{selectedSchool.school_name} Info</h2>

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
                  <tr>
                    <td className="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Email
                    </td>
                    <td className="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.email}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      City
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.city}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      State
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.state}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Mobile Number
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Status
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.status}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Landline
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.landline}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      District
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.district}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      STD Code
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.STD_code}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Pincode
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.pincode}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Principal
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.principal_name_prefix} <span> </span>
                      {selectedSchool.principal_name}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Syllabus
                    </td>
                    <td class="text-md  lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.syllabus}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
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

export default SchoolRequests;
