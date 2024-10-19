import React, { useEffect, useState } from "react";
import { FaUsers, FaBriefcase, FaClipboard, FaFileAlt, FaClipboardCheck } from "react-icons/fa"; // React icons
import axios from "axios"; // Import axios to make API calls
import { API_BASE_URL } from "../../../config/config";

const AdminDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalResumes, setTotalResumes] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}user/get-all-user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const users = response.data;
        const employers = users.filter(
          (user) => user.role && user.role.toLowerCase().includes("employer")
        );
        setTotalEmployees(employers.length);

        // total candidates
        const candidates = users.filter(
          (user) => user.role && user.role.toLowerCase().includes("candidate")
        );
        setTotalCandidates(candidates.length);

        // total Jobs
        const jobResponse = await axios.get(`${API_BASE_URL}job/all-job`);
        const jobs = jobResponse.data.jobs;
        setTotalJobs(jobs.length);

        // total resumes
        const resumeResponse = await axios.get(
          `${API_BASE_URL}resume/get-resume`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const resumes = resumeResponse.data.length;
        setTotalResumes(resumes);

        // total applications
        const applicationResponse = await axios.get(
          `${API_BASE_URL}application/get-total-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const applications = applicationResponse.data.totalApplications.length;
        setTotalApplications(applications);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
        Job Portal Admin Dashboard
      </h1>

      {/* Ganesha Image */}
      <div className="flex justify-center mb-10">
        <img
          src="https://i.pinimg.com/originals/db/5a/a7/db5aa759ff860dceae5c8f80ba9f8c28.jpg"
          alt="Lord Ganesha"
          className="w-56 h-56 rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Total Employees Card */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
          <FaUsers className="text-6xl text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Total Employees
          </h2>
          <p className="text-5xl font-bold">{totalEmployees}</p>
        </div>

        {/* Total Candidates Card */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
          <FaClipboard className="text-6xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Total Candidates
          </h2>
          <p className="text-5xl font-bold">{totalCandidates}</p>
        </div>

        {/* Total Jobs Card */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
          <FaBriefcase className="text-6xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Total Jobs
          </h2>
          <p className="text-5xl font-bold">{totalJobs}</p>
        </div>

        {/* Total Resumes Card */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
          <FaFileAlt className="text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Total Resumes
          </h2>
          <p className="text-5xl font-bold">{totalResumes}</p>
        </div>

        {/* Total Applications Card */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
          <FaClipboardCheck className="text-6xl text-purple-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Total Applications
          </h2>
          <p className="text-5xl font-bold">{totalApplications}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
