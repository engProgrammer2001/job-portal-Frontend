import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";

const AJAXLoadedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); // State to store selected job
  const jobsPerPage = 15;
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}job/get-all-job-withsearch`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
        {
          params: {
            title: jobTitle,
            location: location,
            jobType: category,
          },
        }
      );
      setJobs(response.data.jobs || []);
      console.log("Filtered Jobs:", response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}job/all-job`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setJobs(response.data.jobs || []);
        console.log("for AJAX Jobs: ", response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    navigate(`/job-details/${jobId}`);
  };
  // Calculate the current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job); // Update selected job when clicked
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left side for jobs list */}
      <div className="bg-red-200 grid grid-cols-1 md:grid-cols-2 gap-6 p-2 shadow-lg">
        {/* search functionality  */}
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
        {currentJobs && currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleJobSelect(job)} // Select job on click
            >
              <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={`${API_BASE_URL}${job.company.companyLogo}`}
                    alt="Logo"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {job.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.company.companyName}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Location:</strong> {job.jobLocation}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Description:</strong> {job.jobDescription}
                </p>
                <div className="flex flex-wrap space-x-2 mb-2">
                  <span className="bg-blue-200 hover:bg-red-100 text-red-700 px-3  rounded">
                    {job.jobType}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700">
                  <p>
                    Salary: Rs. {job.fromSalary} - Rs. {job.toSalary}
                  </p>
                  <p>Status: {job.jobStatus}</p>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Posted on: {job.jobPostedDate}</p>
                </div>
                <button
                  onClick={() => applyJob(job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Apply or See More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
      {/* Right side for job details */}
      <div className="lg:w-1/2 w-full p-4">
        {selectedJob ? (
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            {/* Job Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {selectedJob.jobTitle}
            </h2>

            {/* Job Details */}
            <div className="mb-6 space-y-3">
              <p className="text-sm font-semibold">
                <span className="font-bold text-gray-700">Email:</span>{" "}
                {selectedJob.applicationEmail}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> {selectedJob.company.companyName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {selectedJob.jobLocation}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {selectedJob.jobDescription}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Job Type:</strong> {selectedJob.jobType}
              </p>
            </div>

            {/* Salary and Status */}
            <div className="flex justify-between items-center font-medium text-gray-700 mb-4">
              <p>
                <span className="font-semibold">Salary:</span> Rs.{" "}
                {selectedJob.fromSalary} - Rs. {selectedJob.toSalary}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedJob.jobStatus}
              </p>
            </div>

            {/* Job Posted Date */}
            <div className="text-sm text-gray-500 mb-6">
              <p>Posted on: {selectedJob.jobPostedDate}</p>
            </div>

            {/* About Company Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                About Company
              </h3>

              {/* Company Logo and Name */}
              <div className="flex items-center mb-3">
                <img
                  src={`${API_BASE_URL}${selectedJob.company.companyLogo}`}
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-gray-800 text-lg font-semibold">
                  {selectedJob.company.companyName}
                </p>
              </div>

              {/* Company Description */}
              <p className="text-sm text-gray-600 mb-4">
                {selectedJob.company.companyDescription}
              </p>

              {/* Social Links */}
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Twitter:</strong> {selectedJob.company.companyTwitter}
                </p>
                <p>
                  <strong>Facebook:</strong>{" "}
                  {selectedJob.company.companyFacebook}
                </p>
                <p>
                  <strong>Website:</strong> {selectedJob.company.companyWebsite}
                </p>
                <p>
                  <strong>Website:</strong> {selectedJob.company.companyContent}
                </p>
              </div>

              {/* See More Button */}
              {/* <div className="mt-4">
                <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  See More & Apply
                </button>
              </div> */}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a job to see details</p>
        )}
      </div>
    </div>
  );
};

export default AJAXLoadedJobs;
