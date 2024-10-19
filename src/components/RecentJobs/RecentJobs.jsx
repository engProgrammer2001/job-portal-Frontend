import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const RecentJobs = () => {
  const navigate = useNavigate();
  const [recentJobs, setRecentJobs] = useState([]); // Job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}job/all-job`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setRecentJobs(response.data.jobs || []); // Ensure jobs data is an array
        // console.log("Recent Job response: ", response.data.jobs);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="bg-gray-100 lg:px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Recent Jobs</h2>
        <div className="space-y-6">
          {recentJobs.length === 0 ? (
            <p className="text-center">No jobs available</p>
          ) : (
            recentJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/job-details/${job._id}`)}
                className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 w-32 h-32">
                    <img
                      src={`${API_BASE_URL}${job.company.companyLogo}`} // Update here to access company logo
                      alt={job.company.companyName} // Update here to access company name
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Job Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.jobTitle || "N/A"}
                    </h3>
                    <p className="text-gray-500">
                      {job.company.companyName || "Unknown Company"}{" "}
                      {/* Access company name */}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {job.company.companyTagLine || ""}
                    </p>

                    {/* Salary, Location, and Job Type */}
                    <div className="flex flex-col sm:flex-row sm:items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-6">
                      {/* Salary */}
                      {job.fromSalary && job.toSalary && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMoneyBillWave className="text-green-500 mr-2" />
                          <span>
                            ₹{job.fromSalary} - ₹{job.toSalary}
                          </span>
                        </div>
                      )}

                      {/* Location */}
                      {job.jobLocation && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="text-red-500 mr-2" />
                          <span>{job.jobLocation}</span>
                        </div>
                      )}

                      {/* Job Type */}
                      {job.jobType && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            job.jobType === "FullTime"
                              ? "bg-green-100 text-green-600"
                              : job.jobType === "PartTime"
                              ? "bg-yellow-100 text-yellow-600"
                              : job.jobType === "Freelance"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {job.jobType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <div className="w-full md:w-1/5">
                    <button className="bg-red-600 text-white w-full py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Explore More Jobs Button */}
      <div className="mt-6 text-center">
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
          Explore More Jobs
        </button>
      </div>
    </div>
  );
};

export default RecentJobs;
