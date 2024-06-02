import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";

const Banner = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);

  const fetchGallery = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
         
          "http://localhost:8001/api/v1/banner/getBannerData",
          
        );
        console.log(response.data);

        setGallery(response.data);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
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

  const handleUpload = async () => {
    if (selectedFile && title && description && link) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:8001/api/v1/banner/upload-banner-image",
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
          setLink("");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
          `http://localhost:8001/api/v1/banner/delete-banner-image/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Image successfully deleted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setGallery((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );
        }
      } catch (error) {
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
          <h1 className="text-2xl lg:text-4xl font-bold">Banner</h1>
        </div>

        <div className="flex justify-around lg:gap-4">
          {/* Form for desktop view */}

          <div className="hidden lg:w-3/4 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery &&
                gallery.map(({ id, image ,link }) => (
                  <div key={id} className="relative">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`http://localhost:8001${image}`}
                      alt={`Gallery image ${id}`}
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

          <div className="hidden w-1/4 lg:flex  lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
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
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.




continue generating
ChatGPT
167M10 15V6m0 0L8 8m2-2 2 2"
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

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
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
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />

            <button
              className="mt-2 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
              onClick={handleUpload}
            >
              Upload
            </button>
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
            <div className="mt-2 p-2 border-2  h-full rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100"
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

              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                required
              />
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
                placeholder="Enter link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                required
              />

              <button
                className="w-full text-white bg-[#ed1450] hover:bg-primary-700 font-medium text-md rounded-md px-5 py-2.5 text-center"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}

          <div className=" lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery &&
                gallery.map(({ id, image }) => (
                  <div className="relative" key={id}>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`http://localhost:8001${image}`}
                      alt={`Gallery image`}
                    />
                    <button
                      onClick={() => handleDelete(id)}
                      className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                    >
                      <RxCross1 size={20} className="p-1" />
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

export default Banner;
