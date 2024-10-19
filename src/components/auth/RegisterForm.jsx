import React, { useState } from "react";
import axios from "axios"; // Axios is used for making HTTP requests
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", 
    number: "",
    email: "",
    password: "",
    role: "", 
    about: "", 
  });

  const [error, setError] = useState(""); // State to handle errors
  const [success, setSuccess] = useState(""); // State to show success message

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API to register a user
      const response = await axios.post(
        `${API_BASE_URL}user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log("response: ", response.data);
      setSuccess(response.data.message);
      alert(response.data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message || "An error occurred");
      setSuccess("");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Success Message */}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* Error Message */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Register as
          </label>
          <div className="flex gap-4 justify-center mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="candidate"
                checked={formData.role === "candidate"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Candidate
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={formData.role === "employer"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Employer
            </label>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contact Number
            </label>
            <input
              type="number"
              name="number"
              id="number"
              placeholder="Enter your contact number"
              value={formData.number}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* About (optional) */}
          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              About (Optional)
            </label>
            <textarea
              name="about"
              id="about"
              placeholder="Tell us about yourself"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
