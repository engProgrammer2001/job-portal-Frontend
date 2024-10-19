import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { Link } from "react-router-dom";

const TotalCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}company/get-all-companies`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setCompanies(response.data || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch companies");
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}company/delete/${companyId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      setCompanies(companies.filter((company) => company._id !== companyId));
      alert("Company deleted successfully.");
    } catch (error) {
      alert("Failed to delete company.");
    }
  };

  // Pagination Logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        Our Companies
      </h1>

      {companies.length === 0 ? (
        <p className="text-center text-gray-500">No companies available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {currentCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                <div className="mb-4 text-center">
                  <img
                    src={`${API_BASE_URL}${company.companyLogo}`}
                    alt="Company Logo"
                    className="w-28 h-28 object-contain mx-auto rounded-full"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                  {company.companyName || "Company Name"}
                </h2>

                <div className="text-gray-600 text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Tagline: </span>
                    {company.companyTagLine || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Location: </span>
                    {company.location || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Website: </span>
                    <Link
                      to={company.companyWebsite}
                      className="text-red-500 hover:underline"
                    >
                      {company.companyWebsite || "N/A"}
                    </Link>
                  </p>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                  {company.companyFacebook && (
                    <a
                      href={company.companyFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    >
                      Facebook
                    </a>
                  )}
                  {company.companyTwitter && (
                    <a
                      href={company.companyTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 transition"
                    >
                      Twitter
                    </a>
                  )}
                </div>

                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800">Created By</h3>
                  <p>
                    <span className="font-semibold">Full Name: </span>
                    {company.createdBy?.fullName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>
                    {company.createdBy?.email || "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    Delete Company
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-red-500 text-white hover:bg-red-600 transition"}`}
            >
              Previous
            </button>
            <p className="text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-red-500 text-white hover:bg-red-600 transition"}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TotalCompany;
