import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const MapAboveListings = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

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
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.company.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const handleJobClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  return (
    <div>
      <div className=" flex flex-col  py-20 px-20 mx-auto bg-gray-200 p-6">
        <h1 className="text-2xl font-bold text-foreground">
          Browse Jobs – Map
        </h1>
        <p className="text-muted-foreground">
          freshershub.co.in &gt; Browse Jobs – Map
        </p>
      </div>
      <div>
        <div className="w-full  bg-gray-400 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d409377.0553719105!2d-74.30932477148002!3d40.69701929469058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e1!3m2!1sen!2sin!4v1729073457744!5m2!1sen!2sin"
            width="100%"
            height="500"
            styleName="border:0;"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      {/* here show jobs  */}
      <div className="flex flex-col w-[90%] mx-auto lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-3/12 p-4">
          <h2 className="text-xl font-bold my-8">Search Jobs</h2>
          <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
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
              className="p-2 border w-full border-gray-300 rounded-lg"
            >
              <option value="">Categories</option>
              <option value="All Categories">All Categories</option>
              <option value="FullTime">Full-Time</option>
              <option value="PartTime">Part-Time</option>
              <option value="Temporary">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 mt-4 border w-full border-gray-300 rounded-lg"
            >
              <option value="">Salary</option>
              <option value="All Categories">20000</option>
              <option value="FullTime">25,000</option>
              <option value="PartTime">30,0000</option>
              <option value="Temporary">35,000</option>
              <option value="Internship">40,000+</option>
            </select>
            <br />
            <button
              onClick={handleSearch}
              className="bg-red-500 w-full text-white px-4 py-2 rounded-lg mt-4 "
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full lg:w-9/12 p-4">
          <h2 className="text-2xl font-bold my-8">Available Jobs</h2>
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleJobClick(job._id)}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    {/* Company Logo */}
                    <img
                      src={`${API_BASE_URL}${job.company.companyLogo}`}
                      alt={job.company.companyName}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div>
                      {/* Job Title */}
                      <h3 className="text-xl font-semibold text-gray-800">
                        {job.jobTitle}
                      </h3>
                      {/* Company Name */}
                      <p className="text-md text-gray-500">
                        {job.company.companyName}
                      </p>
                      {/* Tagline or info (Optional) */}
                      <p className="text-sm text-gray-400">
                        {job.company.tagline || "Innovating the Future"}
                      </p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <p className="text-lg mb-1">Location: {job.jobLocation}</p>
                  <p className="text-lg mb-1">
                    Salary: ₹{job.fromSalary} - ₹{job.toSalary}
                  </p>
                  <p className="text-lg mb-1">Posted On: {job.jobPostedDate}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Experience Level: {job.experienceLevel} years
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Status: {job.jobStatus}
                  </p>
                  <p className="text-sm text-red-600 mb-1">{job.jobType}</p>
                  <p className="text-gray-600 mb-2">{job.jobDescription}</p>

                  {/* Social Links */}
                  <div className="flex space-x-4 mt-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF className="text-white bg-blue-600 p-2 w-10 h-10 rounded-full hover:bg-blue-700 transition duration-300" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="text-white bg-blue-400 p-2 w-10 h-10 rounded-full hover:bg-blue-500 transition duration-300" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapAboveListings;
