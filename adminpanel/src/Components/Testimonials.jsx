import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8000/show-testimonials",
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
      formData.append("name", testimonialData.name);
      formData.append("description", testimonialData.description);
      formData.append("image", testimonialData.image);

      console.log(formData);

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/upload-testimonials",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Testimonial uploaded successfully!");
        setTestimonialData({
          name: "",
          description: "",
          image: null,
        });
        window.location.reload();
      }

      if (response.status === 403) {
        alert("Testimonial already exists");
      }
    } catch (error) {
      console.error("Error uploading testimonial:", error);
      alert("Error uploading testimonial. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this testimonial?")
    ) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8000/delete-testimonials/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Testimonial deleted successfully");
          setFetchData(fetchData.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Error deleting testimonial. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl my-5 font-bold">Testimonials</h1>
        </div>

        <div className="lg:flex justify-between p-5 lg:gap-10 space-y-10 lg:space-y-0">
          <div className="border-2 border-gray-200 p-3 lg:w-2/3 space-y-5">
            {/* -------------card */}
            {Array.isArray(fetchData) &&
              fetchData.map((item) => (
                <div className="flex border items-center" key={item.id}>
                  <img
                    src={`http://localhost:8000/${item.image}`}
                    alt="image"
                    className="w-20 h-20 rounded-xl"
                  />
                  <div className="border-2 border-gray-200 h-20 rounded-xl w-full">
                    <h1>{item.name}</h1>
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
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={testimonialData.name}
                    onChange={(e) =>
                      setTestimonialData({ ...testimonialData, name: e.target.value })
                    }
                    placeholder="Enter Name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    type="text"
                    value={testimonialData.description}
                    onChange={(e) =>
                      setTestimonialData({ ...testimonialData, description: e.target.value })
                    }
                    placeholder="Enter Description"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="testimonialImage"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Image
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="testimonialImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setTestimonialData({ ...testimonialData, image: e.target.files[0] })
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

export default Testimonials;
