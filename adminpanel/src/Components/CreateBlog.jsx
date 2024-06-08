import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import Editor from "./Editor";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {URLPath} from "../URLPath";
const CreateBlog = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [postedby, setPostedBy] = useState("");
  const [permalink, setPermalink] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchGallery = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(`${URLPath}/api/v1/blogs/get-blogs`);
        console.log(response.data.blogs);
        setGallery(response.data.blogs);
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
      console.log("this is file ", file);
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
    event.preventDefault();
    if (title && description && permalink && postedby) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("permalink", permalink);
      formData.append("posted_By", postedby);

      console.log(selectedFile);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${URLPath}/api/v1/blogs/post-blogs`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Blog uploaded successfully!", {
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
          setPermalink("");
          setPostedBy("");

          setTimeout(() => {
            navigate("/blog");
          }, 1000);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error while uploading ", {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Blogs</h1>
          </div>
        </div>

        <div className="flex">
          <div className="w-full p-2 flex items-center bg-opacity-75">
            <div className="w-full p-3 lg:p-3 bg-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Write a blog</h2>
              </div>

              <form
                onSubmit={handleUpload}
                className="space-y-4 flex flex-col justify-center"
              >
                <div className="flex justify-between gap-10">
                  <div className="w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <div className="w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="postedby"
                    >
                      Posted By
                    </label>
                    <input
                      type="text"
                      id="postedby"
                      value={postedby}
                      onChange={(e) => setPostedBy(e.target.value)}
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="permalink"
                  >
                    Permalink
                  </label>
                  <input
                    type="text"
                    id="permalink"
                    value={permalink}
                    onChange={(e) => setPermalink(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="">
                  <Editor onChange={setDescription} />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 rounded bg-gray-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
