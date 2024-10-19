import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const ManageResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch resumes from API
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}resume/get-resume`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setResumes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resumes", error);
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // Handle resume deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await axios.delete(`${API_BASE_URL}resume/delete-resume/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        setResumes(resumes.filter((resume) => resume._id !== id));
        alert("Resume deleted successfully");
      } catch (error) {
        console.error("Error deleting resume", error);
        alert("Failed to delete resume");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading resumes...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Manage Resumes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {resume.name}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Email:</span> {resume.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Title:</span> {resume.title}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Category:</span> {resume.category}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Location:</span> {resume.location}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Region:</span> {resume.region}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Submitted At:</span>{" "}
              {new Date(resume.submittedAt).toLocaleDateString()}
            </p>

            <div
              className="prose max-w-none mb-4"
              dangerouslySetInnerHTML={{ __html: resume.resumeContent }}
            ></div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(resume._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResume;
