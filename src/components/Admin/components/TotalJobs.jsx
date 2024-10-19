import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { Link } from "react-router-dom";

const TotalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const jobsPerPage = 6; // Display 6 jobs per page

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}job/all-job`);
        const jobList = response.data.jobs;
        setJobs(jobList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Calculate the indices for the current page's jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob); // Get only the jobs for the current page

  // Handling pagination
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="text-center text-white">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Total Listed Available Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-400">No jobs available at the moment.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {currentJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 shadow-md rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2"
              >
                {/* Company Logo */}
                <div className="mb-4">
                  <img
                    src={`${API_BASE_URL}${job.company.companyLogo}`}
                    alt={job.company.companyName}
                    className="w-full h-24 object-contain"
                  />
                </div>

                {/* Job Details */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {job.jobTitle}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Company: </span>
                  {job.company.companyName || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Location: </span>
                  {job.jobLocation || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Salary: </span>
                  ₹{job.fromSalary} - ₹{job.toSalary}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Type: </span>
                  {job.type || "Full-time"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Posted on: </span>
                  {new Date(job.jobPostedDate).toLocaleDateString()}
                </p>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                  {job.company.companyFacebook && (
                    <Link
                      to={job.company.companyFacebook}
                      className="bg-blue-600 text-white p-2 rounded-lg"
                    >
                      Facebook
                    </Link>
                  )}
                  {job.company.companyTwitter && (
                    <Link
                      to={job.company.companyTwitter}
                      className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                      Twitter
                    </Link>
                  )}
                </div>

                {/* View Details Button */}
                <div className="mt-6">
                  <a
                    href={`/job-details/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    View Details &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
              className={`px-4 py-2 rounded-lg ${currentPage === Math.ceil(jobs.length / jobsPerPage) ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalJobs;
