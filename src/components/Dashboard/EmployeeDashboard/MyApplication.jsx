import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all applications from the backend
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}application/get-all-applications`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${token}`,
              withCredentials: true,
            },
          }
        );
        console.log("response is : ", response.data);
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
        Past Applications
      </h1>
      <nav className="mb-6 text-gray-500 text-sm">
        <a href="#" className="hover:text-blue-500">
          Home
        </a>
        &gt;
        <a href="#" className="hover:text-blue-500">
          Dashboard
        </a>
      </nav>

      {/* Check if there are applications */}
      {applications.length === 0 ? (
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            You haven't made any applications yet!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={`${API_BASE_URL}${application.job.company.companyLogo}`}
                  alt={application.job.company.companyName}
                  className="h-16 w-16 rounded-full object-cover border border-gray-300"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {application.job.company.companyName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {application.job.company.companyTagLine}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {application.job.jobTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Location:
                {application.job.jobLocation}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Salary: ₹{application.job.fromSalary} - ₹
                {application.job.toSalary}
              </p>
              <p className="text-sm mb-4">
                <strong>Job Description:</strong>{" "}
                {application.job.jobDescription}
              </p>

              <div className="flex items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    application.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : application.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <p className="text-sm mb-2">
                <strong>Applied On:</strong>{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <a
                  href={application.job.company.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Company Website
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplication;
