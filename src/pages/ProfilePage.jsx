import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import UpdatePassword from "../components/Dashboard/UpdatePassword/UpdatePassword";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    number: "",
    email: "",
    aboutMe: "",
    avatar: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}user/get-user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userProfile = response.data;
        setProfile({
          fullName: userProfile.fullName,
          number: userProfile.number,
          email: userProfile.email,
          aboutMe: userProfile.aboutMe || "",
          avatar:
            userProfile.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          role: userProfile.role,
        });
        // console.log("Fetched user profile:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}user/update-profile`,
        profile
      );
      alert("Profile updated successfully!");
      console.log("Updated profile data:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      {/* Profile Details Form */}
      <div className="w-full md:w-1/2 bg-card p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Profile Details</h2>
        <span className="text-muted-foreground">Avatar</span>
        <div className="flex items-center mb-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
        </div>
        <div className="flex text-3xl items-center mb-4">
          <h1>{profile.role}</h1>
        </div>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="border border-border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="number">
              Phone
            </label>
            <input
              type="text"
              id="number"
              value={profile.number}
              onChange={handleProfileChange}
              className="border border-border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="border border-border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="aboutMe"
            >
              About me
            </label>
            <textarea
              id="aboutMe"
              value={profile.aboutMe}
              onChange={handleProfileChange}
              className="border border-border rounded-lg p-2 w-full"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password Form */}
      <div className="w-full md:w-1/2 bg-card rounded-lg shadow">
        <UpdatePassword />
      </div>
    </div>
  );
};

export default ProfilePage;
