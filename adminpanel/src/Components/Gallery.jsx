import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx"; 

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [liked, setLiked] = useState({}); // State to track likes

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            "http://localhost:8000/show-gallery",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setGallery(response.data.data.galleryEntries);
        } else {
          console.error("No access token found");
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select an image file.");
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          "http://localhost:8000/upload-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          alert("Image uploaded successfully!");
          window.location.reload(); // Reload to fetch the updated gallery
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `http://localhost:8000/delete-image/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Image successfully deleted");
          setGallery((prevGallery) => prevGallery.filter((item) => item.id !== id)); // Update the gallery state without reloading
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Error deleting image. Please try again.");
      }
    }
  };

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <div>
        <h1 className="text-2xl lg:text-4xl my-5 font-bold">Gallery</h1>
      </div>

      <div className="border-2 border-gray-400 p-5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((item) => (
            <div key={item.id} className="relative">
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src={`http://localhost:8000${item.image}`}
                alt="gallery-photo"
              />
              <button
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg ${
                  liked[item.id] ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => handleDelete(item.id)}
              >
                <RxCross1 />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="m-2 flex items-center">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          className="p-2 bg-green-400 rounded-full w-20 font-bold"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Gallery;
