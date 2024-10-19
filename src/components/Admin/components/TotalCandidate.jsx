import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const TotalCandidate = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employersPerPage = 6;

  const token = localStorage.getItem("token");

  // Fetch users from API and filter for employers
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
      const employerList = users.filter(
        (user) => user.role && user.role.toLowerCase().includes("candidate")
      );
      setEmployers(employerList);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastEmployer = currentPage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = employers.slice(indexOfFirstEmployer, indexOfLastEmployer);

  const totalPages = Math.ceil(employers.length / employersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading employers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-center text-white ">
        Total Employers
      </h1>

      {employers.length === 0 ? (
        <p className="text-center text-white">No employers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEmployers.map((employer, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center space-x-4">
                {/* Placeholder for Avatar */}
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-bold text-gray-700">
                    {employer.fullName ? employer.fullName[0].toUpperCase() : "E"}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {employer.fullName}
                  </h2>
                  <p className="text-gray-500">{employer.email}</p>
                  <p className="text-gray-500">{employer.number}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-800">
                  <span className="font-bold">Role:</span> {employer.role}
                </p>
                <p className="text-gray-800">
                  <span className="font-bold">Company Add:</span> {employer.companies.length || "N/A"}
                </p>
                <p className="text-gray-800">
                  <span className="font-bold">Joined:</span>{" "}
                  {new Date(employer.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Hover Info */}
              <div className="mt-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                  View More Details
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed`}
        >
          Previous
        </button>

        <p className="text-white">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TotalCandidate;
