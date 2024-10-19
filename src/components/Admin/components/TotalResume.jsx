import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const TotalResume = () => {
  const [resumes, setResumes] = useState([]); // Store all resume data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch resumes from API
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const resumeResponse = await axios.get(`${API_BASE_URL}resume/get-resume`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const resumeData = resumeResponse.data;
        setResumes(resumeData);
        setLoading(false); // Set loading to false after fetching data
      } catch (err) {
        setError("Failed to fetch resumes");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchResumes();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading resumes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Total Resumes Submitted
      </h1>

      {resumes.length === 0 ? (
        <p className="text-center text-gray-500">
          No resumes available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {resume.name}
              </h2>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Title: </span>
                {resume.title || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Category: </span>
                {resume.category || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Email: </span>
                {resume.email || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Location: </span>
                {resume.location || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Region: </span>
                {resume.region || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-bold">Submitted At: </span>
                {new Date(resume.submittedAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <p className="text-gray-500">{resume.resumeContent}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalResume;
