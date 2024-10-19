import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import { IoCall } from "react-icons/io5";

const BrowseCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState(""); // State for search title
  const [location, setLocation] = useState(""); // State for search location
  const jobsPerPage = 5;

  // Fetch companies when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Function to fetch companies based on title and location
  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}company/get-all-companies`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompanies(response.data);
      console.log("response:", response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}company/search-company`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            title: title,
            location: location,
          },
        }
      );
      setCompanies(response.data);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  // Calculate indices for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = companies.slice(indexOfFirstJob, indexOfLastJob);

  // Handle next and previous pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(companies.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="p-6 bg-gray-100 h-[30vh]">
        <p className="text-muted">
          We have {companies.length} companies in our database
        </p>
        <h1 className="text-2xl font-bold text-foreground">
          Showing All Companies
        </h1>
      </div>

      <div className="p-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-lg">
            <div className="md:col-span-2 bg-gray-100 p-2 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Recent Companies</h2>

              <div className="space-y-4">
                {currentJobs.map((company) => (
                  <div key={company._id} className="block">
                    <Link to={`/company-details/${company._id}`}>
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white rounded-lg shadow-sm transition-all">
                        <div className="hidden md:block flex-shrink-0 w-1/5">
                          <img
                            src={`${API_BASE_URL}${company.companyLogo}`} // Adjust path if needed
                            alt={company.companyName}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="w-full md:w-1/2">
                          <h3 className="text-lg font-medium">
                            {company.companyTagLine}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {company.companyName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {company.companyAddress}
                          </p>
                          <div className="flex flex-col md:flex-row mt-2">
                            <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg text-sm text-gray-700 mb-1 lg:mr-4">
                              <IoCall className="text-red-500" />
                              <span>{company.companyNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm bg-gray-200 p-2 rounded-lg text-gray-500">
                              <FaMapMarkerAlt className="text-green-500" />
                              <span>{company.companyAddress}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {/* Pagination Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-red-500 text-white rounded-md ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(companies.length / jobsPerPage)
                  }
                  className={`px-4 py-2 bg-red-500 text-white rounded-md ${
                    currentPage === Math.ceil(companies.length / jobsPerPage)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Second Grid (Search Filter) */}
          <div className="md:col-span-1 rounded-lg">
            <div className="md:col-span-1 rounded-lg p-4 bg-white shadow-md">
              {/* Search Filters */}
              <div className="p-4 bg-card rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Search Filters</h2>

                <div className="mb-4">
                  <label
                    className="block text-muted-foreground mb-1"
                    htmlFor="keywords"
                  >
                    Search keywords
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    placeholder="Company title or keywords"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring focus:ring-ring"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-muted-foreground mb-1"
                    htmlFor="location"
                  >
                    Search Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Location or keywords"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} // Update location state
                    className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring focus:ring-ring"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCompany;
