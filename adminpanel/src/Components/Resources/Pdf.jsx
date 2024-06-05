import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";

import thumbnail from "../../../public/pdf.png";

const Pdf = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  
  
  const [selectedOption, setSelectedOption] = useState("all");

  const handleAll = () => {
    setSelectedOption("all")
    fetchdata();
  };

  const handleFreeButtonClick = () => {
    setSelectedOption("free");
    fetchdata("free");
  };

  const handlePaidButtonClick = () => {
    setSelectedOption("paid");
    fetchdata("paid");
  };

  const fetchdata = async (option) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          "http://localhost:8000/api/v1/resource/get-all-resources"
        );
        const pdfResources = response.data.data.resourcesData.filter(
          (resource) => resource.resource_type === "pdf"
        );

        let filteredData;
        if (option === "free") {
          filteredData = pdfResources.filter((item) => !item.is_paid);
        } else if (option === "paid") {
          filteredData = pdfResources.filter((item) => item.is_paid);
        } else {
          filteredData = pdfResources;
        }

        setData(filteredData);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Please select a PDF file.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedFile && title && description) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("title", title);
      formData.append("description", description);

      formData.append("resource_url", resourceURL);
      formData.append("resource_type", "pdf");
      formData.append("is_paid", selectedOption === "paid");

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:8000/api/v1/resource/create-resource",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("PDF uploaded successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setSelectedFile(null);
          setTitle("");
          setDescription("");

          setResourceURL("");

          window.location.reload();
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
        toast.error("Error uploading PDF. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this PDF?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8000/api/v1/resource/delete-resource/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("PDF successfully deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setData((prevdata) => prevdata.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error("Error deleting PDF:", error);
        toast.error("Error deleting PDF", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const toggleMobileForm = () => {
    setIsMobileFormVisible(!isMobileFormVisible);
  };

  return (
    <>
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
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center  ">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">PDF</h1>
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleAll}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "all" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={handleFreeButtonClick}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "free" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              Free
            </button>

            <button
              onClick={handlePaidButtonClick}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "paid" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-around lg:gap-4">
          {/* Form for desktop view */}
          <div className="hidden lg:w-2/3 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-1 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            {/* data display */}
            <div className="grid grid-cols-2  md:grid-cols-3 gap-2 ">
              {data &&
                data.map(({ id, resource_url, title }) => {
                  return (
                    <>
                      <div key={id} className="relative bg-gray-200">
                        <img
                          className=""
                          src={thumbnail}
                          alt={`data PDF ${id}`}
                        />
                        <center>
                          <p className="text-xl  font-bold ">{title}</p>
                        </center>
                        <button
                          onClick={() => handleDelete(id)}
                          className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                        >
                          <RxCross1 size={30} className="p-1" />
                        </button>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          {/* Form for both desktop and mobile view */}
          <div className="w-full lg:w-1/3 flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0-.8 7.925"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 12v4m0 0l-3-3m3 3 3-3"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </label>
            </div>
            <form onSubmit={handleUpload} className="w-full mt-4">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />

              <select
                id="resource_type"
                name="resource_type"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              >
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
              <input
                type="text"
                id="resourceURL"
                name="resourceURL"
                placeholder="Resource URL"
                value={resourceURL}
                onChange={(e) => setResourceURL(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <button
                type="submit"
                className="bg-[#ed1450] text-white p-2 rounded w-full"
              >
                Upload
              </button>
            </form>
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-2 ">
          {/* Form for mobile view */}
          <button
            className="mt-4 p-2 bg-[#ed1450] text-white rounded w-full"
            onClick={toggleMobileForm}
          >
            {isMobileFormVisible ? "Hide Upload Form" : "Show Upload Form"}
          </button>

          {isMobileFormVisible && (
            <div className="w-full flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file-mobile"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0-.8 7.925"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 12v4m0 0l-3-3m3 3 3-3"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file-mobile"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="application/pdf"
                  />
                </label>
              </div>
              <form onSubmit={handleUpload} className="w-full mt-4">
                <input
                  type="text"
                  id="title-mobile"
                  name="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                />
                <textarea
                  id="description-mobile"
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                />

                <select
                  id="resource_type-mobile"
                  name="resource_type"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                >
                  <option value="paid">Paid</option>
                  <option value="free">Free</option>
                </select>
                <input
                  type="text"
                  id="resourceURL-mobile"
                  name="resourceURL"
                  placeholder="Resource URL"
                  value={resourceURL}
                  onChange={(e) => setResourceURL(e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                />
                <button
                  type="submit"
                  className="bg-[#ed1450] text-white p-2 rounded w-full"
                >
                  Upload
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-2  md:grid-cols-3 gap-2 ">
            {data &&
              data.map(({ id, resource_url, title }) => {
                return (
                  <>
                    <div key={id} className="relative bg-gray-200">
                      <img
                        className=""
                        src={thumbnail}
                        alt={`data PDF ${id}`}
                      />
                      <center>
                        <p className="text-xl  font-bold ">{title}</p>
                      </center>
                      <button
                        onClick={() => handleDelete(id)}
                        className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                      >
                        <RxCross1 size={20} className="p-1" />
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pdf;
