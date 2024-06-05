import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this line to import styles

const NewsandUpdates = () => {
  const [event, setEvents] = useState([]);
  const [update, setUpdates] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          "http://localhost:8000/api/v1/newsandupdates/get-news-and-updates"
        );

        const news = response.data.newsArray;
        const event = response.data.EventAndExamArray;
        const update = response.data.updateArray;

        setNews(news);
        setUpdates(update);
        setEvents(event);
        console.log(news);
        console.log(update);
        console.log(event);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
    event.preventDefault();

    if (selectedFile && title && description) {
      const formData = new FormData();

      formData.append("image", selectedFile);
      formData.append("title", title);

      formData.append("description", description);
      formData.append("posted_By", postedBy);
      formData.append("post_Type", selectedOption);
      formData.append("event_Date", eventDate);
      formData.append("event_Time", eventTime);

      console.log(
        title,
        description,

        postedBy,
        eventDate,
        eventTime,
        selectedOption,
        selectedFile
      );

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:8000/api/v1/newsandupdates/upload-news-and-updates",
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
          `http://localhost:8000/api/v1/newsandupdates/delete-news-and-updates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Blog successfully deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setNews((prevNews) => prevNews.filter((item) => item.id !== id));
          setEvents((prevEvents) =>
            prevEvents.filter((item) => item.id !== id)
          );
          setUpdates((prevUpdates) =>
            prevUpdates.filter((item) => item.id !== id)
          );
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
          transition: Bounce,
        });
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl my-5 font-bold">
              News, Events, Updates, Exam
            </h1>
          </div>
          <div>
            <button
              onClick={toggleModal}
              className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create
            </button>
          </div>
        </div>

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

        <div className="flex flex-col lg:flex-row lg:space-x-4 p-4">
          {/* News Section */}
          <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
            <h2 className="text-xl font-bold mb-2 text-red-600">News</h2>
            <div className="overflow-y-auto max-h-80">
              {/* Adjust the height as needed */}
              {news.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                >
                  <h3 className="text-md font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    className="text-white p-1 mt-4 bg-[#ed1450] rounded-full"
                    onClick={() => handleDelete(item.id)}
                  >
                    <RxCross1 className="p-1" size={30} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
            <h2 className="text-xl font-bold mb-2 text-red-600">
              Exam & Events
            </h2>
            <div className="overflow-y-auto max-h-80">
              {event.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                >
                  <h3 className="text-md font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    className="text-white p-1 mt-4 bg-[#ed1450] rounded-full"
                    onClick={() => handleDelete(item.id)}
                  >
                    <RxCross1 className="p-1" size={30} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
            <h2 className="text-xl font-bold mb-2 text-red-600">Updates</h2>
            <div className="overflow-y-auto max-h-80">
              {update.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                >
                  <h3 className="text-md font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    className="text-white p-1 mt-4 bg-[#ed1450] rounded-full"
                    onClick={() => handleDelete(item.id)}
                  >
                    <RxCross1 className="p-1" size={30} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className=" fixed mt-12
         bg-black inset-0 flex items-center justify-center  bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="">
              <h2 className="text-2xl font-bold mb-4">Create New Entry </h2>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
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

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100"
                  required
                ></textarea>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="postedBy"
                >
                  Posted By
                </label>
                <input
                  type="text"
                  id="postedBy"
                  value={postedBy}
                  onChange={(e) => setPostedBy(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="news">News</option>
                  <option value="event">Event</option>
                  <option value="update">Update</option>
                  <option value="exam">Exam</option>
                </select>
              </div>

              {(selectedOption === "event" || selectedOption === "exam") && (
                <>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="eventDate"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="eventTime"
                    >
                      Event Time
                    </label>
                    <input
                      type="time"
                      id="eventTime"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>
                </>
              )}

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

              <button
                onClick={toggleModal}
                className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsandUpdates;
