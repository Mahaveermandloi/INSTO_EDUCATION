import axios from "axios";
import React, { useEffect, useState } from "react";

const Student = () => {

  const [options, setOptions] = useState("");

  useEffect(() => {
    const fetchSchoolInfo = async () => {
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

        setOptions(response.data.data.data);
        console.log(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolInfo();
  }, []);

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <div>
        <h1 className="text-2xl lg:text-4xl my-5 font-bold">Student List</h1>
      </div>
      <div className="flex justify-center flex-col space-y-5">
        <select id="" name="" className="w-full p-4 rounded-md border-2">
          <option value="">Choose the school</option>
          {options &&
            options.map((item, key) => (
              <option value={item.name} key={key}>
                {item.name}
              </option>
            ))}
        </select>

        <div>
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="excelFile"
          >
            Upload Excel Sheet
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="excelFile"
            type="file"
            accept=".xlsx"
            placeholder="Upload Excel Sheet"
          />
        </div>

        <div>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
