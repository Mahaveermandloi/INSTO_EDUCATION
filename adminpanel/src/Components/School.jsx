import React, { useEffect, useState } from "react";
import axios from "axios";

const School = () => {
  const [schoolData, setSchoolData] = useState({
    name: "",
    address: "",
    logo: null,
  });

  const [fetchData, getSchoolData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8000/get-school-info",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        getSchoolData(response.data.data.data);
        console.log(response.data.data.data);
        if (response.status === 200) {
          // alert("Data fetched successfully!");
          // window.location.reload(); // Reload to fetch the updated data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", schoolData.name);
      formData.append("address", schoolData.address);
      formData.append("logo", schoolData.logo);

      console.log(formData);
      console.log(schoolData.name);
      console.log(schoolData.address);
      console.log(schoolData.logo);

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/upload-school-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("School information uploaded successfully!");
        setSchoolData({
          name: "",
          address: "",
          logo: null,
        });
        window.location.reload();
      }

      if (response.status === 403) {
        alert("School already exists");
      }
    } catch (error) {
      console.error("Error uploading school information:", error);
      alert("School already exists");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this school information?")
    ) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8000/delete-school-info/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("School information deleted successfully");
          getSchoolData(fetchData.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error("Error deleting school information:", error);
        alert("Error deleting school information. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl my-5 font-bold">School</h1>
        </div>

        <div className="lg:flex justify-between p-5 lg:gap-10 space-y-10 lg:space-y-0">
          <div className="border-2 border-gray-200 p-3 lg:w-2/3 space-y-5">
            {/* -------------card */}
            {Array.isArray(fetchData) &&
              fetchData.map((item) => (
                <div className="flex border items-center" key={item.id}>
                  <img
                    src={`http://localhost:8000/${item.logo}`}
                    alt="image"
                    className="w-20 h-20 rounded-xl"
                  />
                  <div className="border-2 border-gray-200 h-20 rounded-xl w-full">
                    <h1>{item.name}</h1>
                    <h2>{item.address}</h2>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <div className="lg:w-1/3 border-2 border-gray-200">
            <div className="w-full">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleFormSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    School Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={schoolData.name}
                    onChange={(e) =>
                      setSchoolData({ ...schoolData, name: e.target.value })
                    }
                    placeholder="Enter School Name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    School Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="text"
                    value={schoolData.address}
                    onChange={(e) =>
                      setSchoolData({ ...schoolData, address: e.target.value })
                    }
                    placeholder="Enter School Address"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="schoolImage"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    School Logo
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="schoolImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSchoolData({ ...schoolData, logo: e.target.files[0] })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default School;
