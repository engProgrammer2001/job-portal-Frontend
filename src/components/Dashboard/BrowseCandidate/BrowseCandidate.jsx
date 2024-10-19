import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const EmployerApplications = ({ employerId }) => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
  
    const token = localStorage.getItem("token");
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}job/get-all-job-withsearch`,
          {
            params: {
              title: jobTitle,
              location: location,
              jobType: category,
            },
          }
        );
        const filteredJobs = response.data.jobs || [];
        setJobs(filteredJobs);
        
        // Filter applications based on filtered jobs
        const filteredApplicationsByJob = applications.filter((application) =>
          filteredJobs.some((job) => job._id === application.job._id)
        );
        
        setFilteredApplications(filteredApplicationsByJob); 
        console.log("Filtered Applications:", filteredApplicationsByJob);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    useEffect(() => {
      const fetchApplications = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}application/get-AllApplications-By-Employer/${employerId}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${token}`,
              },
            }
          );
          setApplications(response.data.applications);
          setFilteredApplications(response.data.applications);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchApplications();
    }, [employerId]);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          <p className="ml-3">Loading applications...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }
  
    if (applications.length === 0) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">
            No applications found for jobs posted by this employer.
          </p>
        </div>
      );
    }
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Applications</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8 w-[90%] mx-auto">
          <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Job title, keywords or company name"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Categories</option>
              <option value="All Categories">All Categories</option>
              <option value="FullTime">Full-Time</option>
              <option value="PartTime">Part-Time</option>
              <option value="Temporary">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
  
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-4 py-2 rounded-lg m-4 lg:m-4"
            >
              Search
            </button>
          </div>
  
          <div className="w-full lg:w-[70%]">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-100 transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {application.job.jobTitle}
                </h2>
                <p className="text-gray-600">
                  <span className="font-bold">Applicant Image:</span>{" "}
                  {application.applicantsImage}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Applicant Name:</span>{" "}
                  {application.applicantName}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Applicant Number:</span>{" "}
                  {application.applicantNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Email:</span>{" "}
                  {application.applicantEmail}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Company:</span>{" "}
                  {application.job.company.companyName}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Status:</span> {application.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Applied On:</span>{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployerApplications;
  
