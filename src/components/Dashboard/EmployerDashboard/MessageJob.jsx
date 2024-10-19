import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import { API_BASE_URL } from "../../../config/config";
import JobDetails from "../../JobDetails/JobDetails";

const MessageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token"); // Assuming token stored in local storage

      try {
        const response = await axios.get(`${API_BASE_URL}job/admin-job`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        });
        setJobs(response.data.jobs); // Store jobs in state
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchJobs();
  }, []); 

  const handleJobClick = (jobId) => {
    navigate(`/job-details/${jobId}`); // Navigate to job details with job ID
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="p-6 bg-background">
        <h1 className="text-2xl font-bold">Job Dashboard</h1>

        <div className="mt-4 bg-card text-center items-center rounded-lg shadow">
          <div className="grid grid-cols-4 p-4 border-b border-border">
            <div className="font-semibold">Title</div>
            <div className="font-semibold">Date</div>
            <div className="font-semibold">Applications</div>
            <div className="font-semibold">View details</div>
          </div>

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="grid grid-cols-4 p-4 border-b border-border"
              >
                <div
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => handleJobClick(job._id)} 
                >
                  {job.jobTitle}
                </div>
                <div>{new Date(job.jobPostedDate).toLocaleDateString()}</div>
                <div>{job.applications.length || 0}</div>
                <div>
                  <Link to={`/job-details/${job._id}`}>
                    <button className="bg-red-500 p-2 rounded-lg text-white hover:underline cursor-pointer">
                      View details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-muted-foreground">
              You do not have any active listings.
            </div>
          )}
        </div>
        <div>
          <Link to={"/job-post"}> <button className="bg-red-500 mt-5 p-2 hover:bg-red-600 rounded-lg text-white hover:underline cursor-pointer">Add New Job</button></Link>
        </div>
      </div>
    </div>
  );
};

export default MessageJob;
