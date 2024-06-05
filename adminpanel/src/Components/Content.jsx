import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import pdfpng from "../assets/pdf.png";
const Content = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentType, setContentType] = useState(""); // State to track content type (image, video, pdf)
  const [liked, setLiked] = useState(false); // State to track likes

  const [imageData, setImageData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [pdfData, setPdfData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get("http://localhost:8000/content", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setImageData(response.data.data.images);
          setVideoData(response.data.data.videos);
          setPdfData(response.data.data.pdfs);

          

          console.log("Image Data:", response.data.data.images);
          console.log("Video Data:", response.data.data.videos);
          console.log("PDF Data:", response.data.data.pdfs);
        } else {
          console.error("No access token found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setContentType("image");
      } else if (file.type.startsWith("video/")) {
        setContentType("video");
      } else if (file.type === "application/pdf") {
        setContentType("pdf");
      } else {
        setSelectedFile(null);
        alert("Please select a valid file (image, video, or PDF).");
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let uploadUrl = "";
        const formData = new FormData();

        if (contentType === "image") {
          uploadUrl = "http://localhost:8000/upload-free-image";
          formData.append("image", selectedFile);
        } else if (contentType === "video") {
          uploadUrl = "http://localhost:8000/upload-free-video";
          formData.append("video", selectedFile);
        } else if (contentType === "pdf") {
          uploadUrl = "http://localhost:8000/upload-free-pdf";
          formData.append("pdf", selectedFile);
        } else {
          alert("Please select a valid file (image, video, or PDF).");
          return;
        }

        const response = await axios.post(uploadUrl, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          alert("File uploaded successfully!");
          window.location.reload(); // Reload to fetch the updated content
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let deleteUrl = "";

        if (type === "image") {
          deleteUrl = `http://localhost:8000/delete-free-image/${id}`;
        } else if (type === "video") {
          deleteUrl = `http://localhost:8000/delete-free-video/${id}`;
        } else if (type === "pdf") {
          deleteUrl = `http://localhost:8000/delete-free-pdf/${id}`;
        }

        const response = await axios.delete(deleteUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          alert("File successfully deleted");
          window.location.reload(); // Reload to fetch the updated content
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Error deleting file. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="lg:ml-auto lg:w-10/12">
        <div>
          <h1 className="text-2xl lg:text-4xl my-5 font-bold">Content</h1>
        </div>

        <div className="lg:grid grid-cols-2 gap-10">
          {/* IMAGE SECTION */}
          <div>
            <div className="border-2 border-gray-400 p-3">
              <div>
                <h1 className="text-2xl lg:text-4xl py-3 font-bold">Images</h1>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {/* Example images */}
                {imageData &&
                  imageData.map((item, key) => (
                    <div className="relative" key={key}>
                      <img
                        className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src={`http://localhost:8000${item.image}`}
                        alt="gallery-photo"
                      />
                      <button
                        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg ${
                          liked ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={() => handleDelete(item.id, "image")}
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="m-2 flex lg:flex-row flex-col justify-center gap-10 p-10 bg-red-300 items-center lg:justify-evenly">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <select name="type" id="type">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <button
                className="p-2 bg-green-400 rounded-full w-20 font-bold"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>

          {/* VIDEO SECTION */}
          <div>
            <div className="border-2 border-gray-400 p-3">
              <div>
                <h1 className="text-2xl lg:text-4xl py-3 font-bold">Videos</h1>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {/* Example videos */}
                {videoData &&
                  videoData.map((item, key) => (
                    <div className="relative" key={key}>
                      <video
                        className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        controls
                      >
                        <source
                          src={`http://localhost:8000${item.video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg ${
                          liked ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={() => handleDelete(item.id, "video")}
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="m-2 flex lg:flex-row flex-col justify-center gap-10 p-10 bg-red-300 items-center lg:justify-evenly">
              <input type="file" accept="video/*" onChange={handleFileChange} />
              <select name="type" id="type">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <button
                className="p-2 bg-green-400 rounded-full w-20 font-bold"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>

          {/* PDF SECTION */}
          <div>
            <div className="border-2 border-gray-400 p-3">
              <div>
                <h1 className="text-2xl lg:text-4xl py-3 font-bold">PDF</h1>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {/* Example PDFs */}
                {pdfData &&
                  pdfData.map((item, key) => (
                    <div className="relative" key={key}>
                      <img
                        className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src={pdfpng}
                        alt="gallery-photo"
                      />
                      <button
                        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg ${
                          liked ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={() => handleDelete(item.id, "pdf")}
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="m-2 flex lg:flex-row flex-col justify-center gap-10 p-10 bg-red-300 items-center lg:justify-evenly">
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              <select name="type" id="type">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <button
                className="p-2 bg-green-400 rounded-full w-20 font-bold"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
