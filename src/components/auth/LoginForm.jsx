import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using react-router for routing
import axios from "axios"; // For making HTTP requests
import { useDispatch } from "react-redux"; // If you're using Redux
import { loginSuccess } from "../../state/authSlice";
import { API_BASE_URL } from "../../config/config";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "", 
    password: "", 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}user/login`,
        {
          email: formData.email,
          password: formData.password, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      if (response.status === 200) {
        const { user, token } = response.data;
        dispatch(loginSuccess({ user, token }));
        if (user.role === "admin") {
          navigate("/admin/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
      alert(err.response.data.message || "An error occurred");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link
            to="/reset-password"
            className="text-sm text-red-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {/* Register Link */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};


export default LoginForm;
