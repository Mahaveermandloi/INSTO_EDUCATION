import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import logo from "../assets/pdf.png";
import { URLPath } from "../URLPath";
const Testimonials = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/testimonial/get-testimonial`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setTestimonial(response.data.data.testimonialData);
          console.log(response.data.data.testimonialData);
        } else {
          console.error("No access token found");
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchTestimonial();
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("name", name);
      formData.append("description", description);

      console.log(name, description, selectedFile);

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${URLPath}/api/v1/testimonial/post-testimonial`,
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
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Wait for 2 seconds before reloading
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
        });
      }
    } else {
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${URLPath}/api/v1/testimonial/delete-testimonial/${id}`,
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
          setTestimonial((prevTestimonial) =>
            prevTestimonial.filter((item) => item.id !== id)
          ); // Update the testimonial state without reloading
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Error deleting image. Please try again.", {
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
      <div className="lg:w-10/12 lg:ml-auto ">
        <div>
          <h1 className="text-2xl lg:text-4xl  font-bold">Testimonial</h1>
        </div>

        <div className="flex justify-around   lg:gap-4 ">
          {/* Form for desktop view */}

          <div className=" hidden lg:w-3/4 gap-10 lg:grid grid-cols-2 lg:items-end lg:mt-5  lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            {testimonial &&
              testimonial.map(({ id, image, name, description }) => (
                <div
                  key={id}
                  className="relative flex h-28 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-28 md:w-48 md:rounded-none md:rounded-s-lg bg-yellow-400"
                    src={`${URLPath}${image}`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="text-lg pt-3 font-bold tracking-tight text-gray-900 dark:text-white">
                      {name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis line-clamp-3">
                      {description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(id)}
                    className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                  >
                    <RxCross1 size={30} className="p-1" />
                  </button>
                </div>
              ))}

            {/* images should be displayed here  in desktop view  */}
          </div>

          <div className="hidden w-1/4 lg:flex  lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <div className="flex justify-center mb-4">
                      <img
                        className="rounded-lg"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="mt-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />

            <textarea
              id="message"
              rows="4"
              className="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <button
              className="w-full text-white bg-[#ed1450] hover:bg-primary-700 font-medium text-md rounded-md px-5 py-2.5 mt-2 text-center"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button and form for mobile view */}
      <div className="lg:hidden m-2  flex flex-col gap-5 ">
        <button
          className="p-2 bg-[#ed1450] rounded-md  text-white w-full font-bold"
          onClick={toggleMobileForm}
        >
          {isMobileFormVisible ? "Hide Form" : "Upload Image"}
        </button>

        {isMobileFormVisible && (
          <div className="mt-2 p-2 border-2 border-gray-400 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <div className="flex justify-center mb-4">
                      <img
                        className="rounded-lg"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-2 p-2 border rounded-lg w-full"
            />

            <button
              className="w-full text-white  bg-[#ed1450] hover:bg-primary-700   font-medium  text-md rounded-md px-5 py-2.5 text-center"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        )}

        <div className=" lg:flex  lg:flex-col lg:items-end lg:mt-5  lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
          <div className="flex flex-col gap-5">
            {testimonial &&
              testimonial.map(({ id, image, name, description }) => (
                <div className="relative flex h-28 lg:flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:bg-gray-100 overflow-hidden">
                  <img
                    className="object-cover  rounded-full  h-20 w-20 md:rounded-none md:rounded-s-lg bg-yellow-400"
                    src={`${URLPath}${image}`}
                    alt="image"
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal overflow-hidden">
                    <h5 className="text-md font-bold tracking-tight text-gray-900 ">
                      {name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-600 overflow-hidden  whitespace-nowrap text-ellipsis md:whitespace-normal">
                      {description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(id)}
                    className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                  >
                    <RxCross1 size={25} className="p-1" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
