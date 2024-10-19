import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config"; // Adjust the path accordingly

const TotalApplications = ({ token }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 6; // Number of applications per page

  // Fetching total applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}application/get-total-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setApplications(response.data.totalApplications);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch applications");
        setLoading(false);
      }
    };
    fetchApplications();
  }, [token]);

  // Calculate the indices for the current page
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  // Handling pagination
  const nextPage = () => {
    if (currentPage < Math.ceil(applications.length / applicationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Total Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications available.</p>
      ) : (
        <div>
          {/* Display applications in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentApplications.map((application, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2"
              >
                <div className="mb-4">
                  {/* Replace with actual application logo/image if available */}
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid" // Placeholder image or replace with actual logo/image
                    alt="Application Logo"
                    className="w-24 h-24 object-contain mx-auto"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {application.job.jobTitle || "Position N/A"}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Applicant : </span>
                  {application.applicantName || "Name N/A"}
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Location: </span>
                  {application.job.jobLocation || "Location N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Category: </span>
                  {application.category || "Category N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Applications: </span>
                  {application.job.applications.length || "Applications N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Applied on: </span>
                  {new Date(application.createdAt).toLocaleDateString() ||
                    "N/A"}
                </p>

                {/* <div className="mt-4">
                  <a
                    href={`/application-details/${application.id}`}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    View Details &rarr;
                  </a>
                </div> */}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-400"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={
                currentPage ===
                Math.ceil(applications.length / applicationsPerPage)
              }
              className={`px-4 py-2 rounded-lg ${
                currentPage ===
                Math.ceil(applications.length / applicationsPerPage)
                  ? "bg-gray-400"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalApplications;
