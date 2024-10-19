import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBriefcase, FaEye, FaPaperPlane, FaBookmark } from "react-icons/fa";
import SideNavbar from "../../common/SideNavbar/SideNavbar";
import { API_BASE_URL } from "../../../config/config";

const CandidateDashboard = () => {
  const [jobCount, setJobCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Fetch data from APIs using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all jobs
        const jobsResponse = await axios.get(`${API_BASE_URL}job/all-job`);
        setJobCount(jobsResponse.data.jobs.length);

        // Fetch all companies
        const companiesResponse = await axios.get(
          `${API_BASE_URL}company/get-all-companies`
        );
        setCompanyCount(companiesResponse.data.length);

        // Fetch all applications
        const applicationsResponse = await axios.get(
          `${API_BASE_URL}application/get-total-applications`
        );
        setApplicationCount(applicationsResponse.data.totalApplications.length);

        // Fetch all users
        const usersResponse = await axios.get(
          `${API_BASE_URL}user/get-all-user-profile`
        );
        setUserCount(usersResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-auto">
      {/* <SideNavbar /> Assuming you have a sidebar for navigation */}

      {/* Main Content Area */}
      <div className="w-full bg-gray-100 p-6">
        <div className="bg-background">
          <h1 className="text-2xl font-bold mb-4">Howdy, Test</h1>

          <nav className="mb-6">
            <Link to="/" className="text-muted-foreground">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to="/dashboard" className="text-muted-foreground">
              Dashboard
            </Link>
          </nav>

          {/* Displaying Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <FaBriefcase className="text-5xl opacity-70 mr-4" />
              <div>
                <h2 className="text-5xl font-semibold">{jobCount}</h2>
                <p>Active Job Listings</p>
              </div>
            </div>

            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex items-center">
              <FaEye className="text-5xl opacity-70 mr-4" />
              <div>
                <h2 className="text-5xl font-semibold">{companyCount}</h2>
                <p>Total Companies</p>
              </div>
            </div>

            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <FaPaperPlane className="text-5xl opacity-70 mr-4" />
              <div>
                <h2 className="text-5xl font-semibold">{applicationCount}</h2>
                <p>Total Applications</p>
              </div>
            </div>

            <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <FaBookmark className="text-5xl opacity-70 mr-4" />
              <div>
                <h2 className="text-5xl font-semibold">{userCount}</h2>
                <p>Total Users</p>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-bold mb-2">Recent Activities</h3>
            <p>You don't have any activities logged yet.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2">Your Listing Packages</h3>
            <p>You don't have any packages yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
