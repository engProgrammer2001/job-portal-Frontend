import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for Quill
import { API_BASE_URL } from "../../../config/config";

const AddResume = () => {
  const [resumeContent, setResumeContent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    region: "",
    title: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuillChange = (content) => {
    setResumeContent(content); // Update resumeContent here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("region", formData.region);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("category", formData.category);
    data.append("resumeContent", resumeContent); // Use resumeContent here

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}resume/add-resume`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-background rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit Resume</h1>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Resume submitted successfully!</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="name">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="Candidate Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="Candidate Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Region and Professional Title */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="region">
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. London, UK; New York; Houston, TX"
              value={formData.region}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="title">
              Professional Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. Software Engineer, Data Scientist"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. Remote, On-site"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. IT, Management"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Rich Text Editor for Resume Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground" htmlFor="resumeContent">
            Resume Content (optional)
          </label>
          <ReactQuill
            value={resumeContent} // Link it to resumeContent state
            onChange={handleQuillChange}
            className="h-64"
            theme="snow"
            placeholder="Detailed content about your experience..."
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-red-500 text-white hover:bg-secondary/80 p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResume;
