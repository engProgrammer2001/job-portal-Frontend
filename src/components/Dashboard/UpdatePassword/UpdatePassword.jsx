import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed via npm install axios
import { API_BASE_URL } from "../../../config/config";

const UpdateProfile = () => {
  // State to hold user profile data
  const [profileData, setProfileData] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
    about: "",
  });

  // Simulate fetching user ID from token or session
  const token = localStorage.getItem("token"); 

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // Make the API request to update the profile
    try {
      const response = await axios.post(
        `${API_BASE_URL}user/update-profile`, // API endpoint
        profileData, // Data to be sent to the server
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
      alert(response.data.message); 
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            className="border border-border rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="number">
            Phone Number
          </label>
          <input
            type="tel"
            id="number"
            value={profileData.number}
            onChange={handleInputChange}
            className="border border-border rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="border border-border rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={profileData.password}
            onChange={handleInputChange}
            className="border border-border rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            value={profileData.about}
            onChange={handleInputChange}
            className="border border-border rounded-lg p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
