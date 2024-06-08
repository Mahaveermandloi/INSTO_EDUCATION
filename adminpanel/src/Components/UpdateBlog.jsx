import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Editor from "./Editor";
import { useNavigate, useParams } from "react-router-dom";
import {URLPath} from "../URLPath";
const UpdateBlog = () => {
  const [blogData, setBlogData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlogData = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${URL}/api/v1/blogs/get-edit-blog-details/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const { title, posted_By, permalink, description } =
            response.data.data.blogData;
          setBlogData({
            title,
            posted_By,
            permalink,
            description,
          });

          console.log(title, posted_By, permalink, description);
        } catch (error) {
          console.error("Error fetching blog data:", error);
          toast.error("Error fetching blog data", {
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
      };
      fetchBlogData();
    }
  }, [id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", blogData.title);
      formData.append("posted_By", blogData.posted_By);
      formData.append("permalink", blogData.permalink);
      formData.append("description", blogData.description);

      console.log(
        blogData.title,
        blogData.description,
        blogData.posted_By,
        blogData.permalink
      );

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${URL}/api/v1/blogs/update-blog-details/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully!", {
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
          navigate("/blog");
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog", {
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
        <div className="flex justify-between items-center flex-col">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Update Blog</h1>
          </div>

          <div className="flex w-full">
            <div className="w-full p-2 flex items-center bg-opacity-75">
              <div className="w-full p-3 lg:p-3 bg-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
                </div>

                <form
                  onSubmit={handleSubmit}
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
                        value={blogData.title}
                        onChange={(e) =>
                          setBlogData((prevData) => ({
                            ...prevData,
                            title: e.target.value,
                          }))
                        }
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="posted_By"
                      >
                        Posted By
                      </label>
                      <input
                        type="text"
                        id="posted_By"
                        value={blogData.posted_By}
                        onChange={(e) =>
                          setBlogData((prevData) => ({
                            ...prevData,
                            posted_By: e.target.value,
                          }))
                        }
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
                      value={blogData.permalink}
                      onChange={(e) =>
                        setBlogData((prevData) => ({
                          ...prevData,
                          permalink: e.target.value,
                        }))
                      }
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <div className="">
                    <Editor
                      value={blogData.description}
                      onChange={(value) =>
                        setBlogData((prevData) => ({
                          ...prevData,
                          description: value,
                        }))
                      }
                    />
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
                    Update Blog
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
