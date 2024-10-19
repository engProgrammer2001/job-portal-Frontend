import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import { Link } from "react-router-dom";

const HalfPageMap = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const jobsPerPage = 10; // Number of jobs per page

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
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // This may not always be necessary on the client-side
            // You can add more custom headers here, such as authorization tokens if needed
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
        const response = await axios.get(`${API_BASE_URL}job/all-job`);
        setJobs(response.data.jobs || []);
        console.log("Jobs: ", response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob); // Jobs for the current page
  const totalPages = Math.ceil(jobs.length / jobsPerPage); // Total number of pages

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-gray-200">
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Job</h2>
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
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 lg:m-4"
            >
              Search
            </button>
          </div>

          {/* Show jobs here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentJobs && currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <Link to={`/job-details/${job._id}`} key={job._id}>
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
                      <span className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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
                  </div>
                </Link>
              ))
            ) : (
              <p>No jobs available</p>
            )}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-between my-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`bg-gray-500 text-white px-4 py-2 rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`bg-red-500 text-white px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Right Section with Green World Map */}
      <div className="w-full lg:w-1/2 bg-gray-400 relative">
        {/* <h2 className="absolute top-4 left-4 text-black text-2xl font-bold z-10">
          Location Map
        </h2> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d409377.0553719105!2d-74.30932477148002!3d40.69701929469058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e1!3m2!1sen!2sin!4v1729073457744!5m2!1sen!2sin"
          width="100%"
          height="100%"
          styleName="border:0;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default HalfPageMap;
