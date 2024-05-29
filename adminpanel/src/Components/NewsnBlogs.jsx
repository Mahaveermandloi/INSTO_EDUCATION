import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsnBlogs = () => {
  const [newsData, setNewsData] = useState({
    headline: "",
    description: "",
    image: null,
  });

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8000/show-news-and-blogs",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setFetchData(response.data.data.data);
        console.log(response.data.data.data);
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
      formData.append("headline", newsData.headline);
      formData.append("description", newsData.description);
      formData.append("image", newsData.image);

      console.log(formData);

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/upload-news-and-blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("News and blog information uploaded successfully!");
        setNewsData({
          headline: "",
          description: "",
          image: null,
        });
        window.location.reload();
      }

      if (response.status === 403) {
        alert("News or blog with this headline already exists");
      }
    } catch (error) {
      console.error("Error uploading news and blog information:", error);
      alert("Error uploading news and blog information. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this news or blog entry?")
    ) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8000/delete-news-and-blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("News and blog entry deleted successfully");
          setFetchData(fetchData.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error("Error deleting news and blog entry:", error);
        alert("Error deleting news and blog entry. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl my-5 font-bold">
            News and Blogs
          </h1>
        </div>

        <div className="lg:flex justify-between p-5 lg:gap-10 space-y-10 lg:space-y-0">
          <div className="border-2 border-gray-200 p-3 lg:w-2/3 space-y-5">
            {fetchData &&
              fetchData.map((item) => (
                <div className="flex border items-center" key={item.id}>
                  <img
                    src={`http://localhost:8000/${item.image}`}
                    alt="image"
                    className="w-20 h-20 rounded-xl"
                  />
                  <div className="border-2 border-gray-200 h-20 rounded-xl w-full">
                    <h1>{item.headline}</h1>
                    <h2>{item.description}</h2>
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
                    htmlFor="headline"
                  >
                    Headline
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="headline"
                    type="text"
                    value={newsData.headline}
                    onChange={(e) =>
                      setNewsData({ ...newsData, headline: e.target.value })
                    }
                    placeholder="Enter Headline"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    value={newsData.description}
                    onChange={(e) =>
                      setNewsData({ ...newsData, description: e.target.value })
                    }
                    placeholder="Enter Description"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="newsImage"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    News Image
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="newsImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewsData({ ...newsData, image: e.target.files[0] })
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

export default NewsnBlogs;
