import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {URLPath} from "../URLPath";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(`${URLPath}/profile`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = response.data.data;

          console.log(userData.data);
          setProfile(userData.data);
        } else {
          console.error("No access token found");
          toast.error("No access token found", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);

        toast.error("Error fetching profile", {
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

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      />
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl my-5 font-bold">Profile</h1>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="flex justify-center flex-col gap-10 ">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src={`${URLPath}${profile.image}`}
                  alt="No profile"
                />
              </div>
              <div className="p-2">
                <h3 className="text-center text-2xl text-gray-900 font-medium leading-8">
                  {profile.name}
                </h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p className="text-lg">{profile.role}</p>
                </div>
                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-lg text-gray-500 font-semibold">
                        Phone
                      </td>
                      <td className="px-2 py-2 text-lg">{profile.number}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-lg text-gray-500 font-semibold">
                        Email
                      </td>
                      <td className="px-2 py-2 text-lg">{profile.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                navigate("/updateprofile");
              }}
            >
              Edit
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                navigate("/updatepassword");
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
