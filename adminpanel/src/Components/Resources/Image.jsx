import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";

const Image = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("paid");
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [resourceURL, setResourceURL] = useState("");
  // const [thumbnailURL, setThumbnailURL] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);

  const [disable, setDisable] = useState(true);

  // const fetchdata = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (accessToken) {
  //       const response = await axios.get(
  //         "http://localhost:8001/api/v1/resource/get-all-resources"
  //       );
  //       setData(response.data.data.resourcesData);
  //       console.log(response.data.data.resourcesData);
  //     } else {
  //       console.error("No access token found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchdata = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          "http://localhost:8001/api/v1/resource/get-all-resources"
        );

        // Filter only PDF resources
        const imageResources = response.data.data.resourcesData.filter(
          (resource) => resource.resource_type === "image"
        );

        setData(imageResources);
        console.log(imageResources);
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
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Please select an image file.", {
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
    event.preventDefault(); // Prevent default form submission behavior

    if (selectedFile && title && description ) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
     
      formData.append("resource_url", resourceURL);

      formData.append("resource_type", "image"); // Assuming image is always selected
      formData.append("is_paid", selectedOption === "paid");

      console.log(formData);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:8001/api/v1/resource/create-resource",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Image uploaded successfully!", {
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
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.", {
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
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8001/api/v1/resource/delete-resource/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Image successfully deleted", {
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
        if (response.status === 403) {
          toast.error("No resource with this id", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          console.error("Error deleting image:", error);
          toast.error("Error deleting image", {
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
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Images</h1>
        </div>

        <div className="hidden lg:flex justify-around lg:gap-4">
          {/* Form for desktop view */}
          <div className="hidden lg:w-1/2 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            {/* data display */}
           
           
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data &&
                data.map(({ id, resource_url }) => {
                  return (
                    <>
                      <div key={id} className="relative">
                        <img
                          className="h-auto max-w-full rounded-lg"
                          src={`http://localhost:8001${resource_url}`}

                          alt={`data image ${id}`}
                        />

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
          <div className="w-full lg:w-1/2 flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
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
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Form fields */}
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            >
              <option value="paid">PAID</option>
              <option value="free">FREE</option>
            </select>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
          
            <input
              type="text"
              placeholder="Resource URL"
              value={resourceURL}
              onChange={(e) => setResourceURL(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            {/* <input
              type="text"
              placeholder="Thumbnail URL (Optional)"
              value={thumbnailURL}
              onChange={(e) => setThumbnailURL(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            /> */}

            {/* Submit button */}
            {disable && (
              <button
                className="mt-4 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
          </div>
        </div>

        {/* Toggle button and form for mobile view */}

        <div className="lg:hidden m-2 flex flex-col gap-2">
          <button
            className="p-2 bg-[#ed1450] rounded-md text-white w-full font-bold"
            onClick={toggleMobileForm}
          >
            {isMobileFormVisible ? "Hide Form" : "Upload Image"}
          </button>

          {isMobileFormVisible && (
            <div className="flex justify-around lg:gap-4">
              {/* Form for desktop view */}
              <div className="hidden lg:w-1/2 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
                {/* data display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data &&
                    data.map(({ id, resource_url }) => (
                      <div key={id} className="relative">
                        <img
                          className="h-auto max-w-full rounded-lg"
                          src={`http://localhost:8001${resource_url}`}
                          alt={`data image ${id}`}
                        />
                       
                        <button
                          onClick={() => handleDelete(id)}
                          className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                        >
                          <RxCross1 size={30} className="p-1" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Form for both desktop and mobile view */}
              <div className="w-full lg:w-1/2 flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
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
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Form fields */}
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                  required
                />
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                >
                  <option value="paid">PAID</option>
                  <option value="free">FREE</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                  required
                />
               
                <input
                  type="text"
                  placeholder="Resource URL"
                  value={resourceURL}
                  onChange={(e) => setResourceURL(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                />
                {/* <input
              type="text"
              placeholder="Thumbnail URL (Optional)"
              value={thumbnailURL}
              onChange={(e) => setThumbnailURL(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            /> */}

                {/* Submit button */}
                <button
                  className="mt-4 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          )}

          {/* data display for mobile */}

          <div className="lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data &&
                data.map(({ id, resource_url }) => (
                  <div key={id} className="relative">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`http://localhost:8001${resource_url}`}
                      alt={`data image ${id}`}
                    />
                    <button
                      onClick={() => handleDelete(id)}
                      className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                    >
                      <RxCross1 size={30} className="p-1" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Image;
