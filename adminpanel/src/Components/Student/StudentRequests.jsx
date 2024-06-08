// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, Bounce, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaInfoCircle } from "react-icons/fa";

// const StudentRequests = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSchool, setSelectedSchool] = useState(null);

//   const [studentData, setStudentData] = useState([]);

//   const [schoolName, setSchoolName] = useState([]);

//   const [schoolId, setSchoolId] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/student/getAllStudentData",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           setStudentData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const fetchSchoolName = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");

//         // Fetch school data
//         const schoolResponse = await axios.get(
//           "http://localhost:8000/api/v1/school/getSchoolData",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         console.log(schoolResponse.data.data.getData);

//         if (schoolResponse.status === 200) {
//           setSchoolName(schoolResponse.data.data.getData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     fetchSchoolName();
//   }, []);

//   const toggleModal = (schoolId) => {
//     setIsModalOpen(!isModalOpen);

//     const school = studentData.find((school) => school.id === schoolId);
//     if (school) {
//       setSelectedSchool(school);
//     } else {
//       setSelectedSchool(null);
//     }
//   };

//   const handleApprove = async () => {
  
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.post(
//         `http://localhost:8000/api/v1/studentList/createStudentList/${selectedSchool.id}`,
//         {
//           schoolId: schoolId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("School approved successfully!");
//         const response = await axios.delete(
//           `http://localhost:8000/api/v1/student/deleteStudentRequest/${selectedSchool.id}`,

//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           toast.success("Student Requests removed successfully!");

//           setTimeout(() => {
//             setIsModalOpen(!isModalOpen);
//             window.location.reload();
//           }, 1000);
//         }
//       }
//     } catch (error) {
//       toast.error("School Not found OR Email might not be unique");
//     }
//   };

//   // const handleReject = async () => {
//   //   try {
//   //     const accessToken = localStorage.getItem("accessToken");
//   //     const response = await axios.put(
//   //       `http://localhost:8000/api/v1/school/rejectSchool/${selectedSchool.id}`,
//   //       {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${accessToken}`,
//   //         },
//   //       }
//   //     );

//   //     if (response.status === 200) {
//   //       setStudentData((prevData) =>
//   //         prevData.map((school) =>
//   //           school.id === selectedSchool.id
//   //             ? { ...school, status: "rejected" }
//   //             : school
//   //         )
//   //       );
//   //       toast.success("School rejected successfully!");
//   //       setTimeout(() => {
//   //         setIsModalOpen(!isModalOpen);
//   //       }, 1000);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error rejecting school:", error);
//   //     toast.error("Error rejecting school. Please try again later.");
//   //   }
//   // };

//   return (
//     <>
//       <div className="lg:w-10/12 lg:ml-auto">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl lg:text-4xl my-5 font-bold">
//               Students Requests
//             </h1>
//           </div>
//         </div>

//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//           transition={Bounce}
//         />

//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
//               <tr className="">
//                 <th
//                   scope="col"
//                   className="px-4 py-2 text-md bg-gray-800"
//                 >
//                   School Name
//                 </th>
//                 <th scope="col" className="px-4 py-2 text-md bg-gray-800">
//                   Student Name
//                 </th>

//                 <th scope="col" className="px-4 py-2 text-md bg-gray-800">
//                   Mobile Number
//                 </th>
//                 <th scope="col" className="px-4 py-2 text-md bg-gray-800">
//                   Class
//                 </th>

//                 <th scope="col" className="px-4 py-2 text-md bg-gray-800">
//                   Email
//                 </th>

//                 <th scope="col" className="px-4 py-2 text-md bg-gray-800">
//                   City
//                 </th>

//                 <th scope="col" className="px-6 py-3 text-md bg-gray-200 ">
//                   INFO
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {studentData &&
//                 studentData.map(
//                   ({
//                     id,
//                     school_name,
//                     email,
//                     city,
//                     student_class,
//                     mobile_number,
//                     name,
//                   }) => (
//                     <tr
//                       key={id}
//                       className="border-b  border-gray-200 dark:border-gray-700 text-md"
//                     >
//                       <td className="px-6  whitespace-nowrap">
//                         {school_name}
//                       </td>
//                       <td className="px-4 py-2 text-md">{name}</td>
//                       <td className="px-4 py-2 text-md">{mobile_number}</td>
//                       <td className="px-4 py-2 text-md">{student_class}</td>

//                       <td className="px-4 py-2 text-md">{email}</td>
//                       <td className="px-4 py-2 text-md">{city}</td>

//                       <td className="px-4 py-2 text-md text-center">
//                         <button onClick={() => toggleModal(id)}>
//                           <FaInfoCircle size={25} className="text-[#ed1450]" />
//                         </button>
//                       </td>
//                     </tr>
//                   )
//                 )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && selectedSchool && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl mb-4">{selectedSchool.school_name} Info</h2>

//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gray-100 border-b">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Field {selectedSchool.id}
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Data
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Name
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.name}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Class
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.student_class}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Email
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.email}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Address
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.address}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       City
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.city}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       State
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.state}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Pincode
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.pincode}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Mobile Number
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.mobile_number}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       School Name
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.school_name}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       Syllabus
//                     </td>
//                     <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
//                       {selectedSchool.syllabus}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>

//               <p className="p-2.5 font-bold text-green-400">Map with Schools</p>
//               <select
//                 id="countries"
//                 class="bg-gray-50 border border-gray-300  text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200  "
//                 onChange={(e) => {
//                   setSchoolId(e.target.value);
//                 }}
//               >
//                 <option selected value="">
//                   Choose School
//                 </option>

//                 {schoolName &&
//                   schoolName.map(({ school_name, school_id }) => (
//                     <option value={school_id} key={school_id}>
//                       {school_name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={handleApprove}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Approve
//               </button>

//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-[#ed1450] text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StudentRequests;


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
  const entriesPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(studentData.length / entriesPerPage);

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
                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
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
                <th scope="col" className="px-6 py-3 text-md bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody>
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
                    className="border-b  border-gray-200 dark:border-gray-700 text-md"
                  >
                    <td className="px-6  whitespace-nowrap">{school_name}</td>
                    <td className="px-4 py-2 text-md">{name}</td>
                    <td className="px-4 py-2 text-md">{mobile_number}</td>
                    <td className="px-4 py-2 text-md">{student_class}</td>
                    <td className="px-4 py-2 text-md">{email}</td>
                    <td className="px-4 py-2 text-md">{city}</td>
                    <td className="px-4 py-2 text-md text-center">
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
          <div className="fixed-bottom flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {isModalOpen && selectedSchool && (
        <div className="fixed inset-0 flex p-1 items-center justify-center bg-black bg-opacity-75">
          <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-3 lg:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl lg:mb-4">{selectedSchool.school_name} Info</h2>

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
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Name
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Class
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.student_class}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Email
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Address
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      City
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.city}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      State
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.state}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Pincode
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.pincode}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Mobile Number
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      School Name
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.school_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      Syllabus
                    </td>
                    <td className="text-md lg:text-xl px-4 py-2 whitespace-nowrap font-semibold">
                      {selectedSchool.syllabus}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="lg:p-2.5 font-bold text-green-400">Map with Schools</p>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 block w-full lg:p-2.5 dark:bg-gray-200"
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
