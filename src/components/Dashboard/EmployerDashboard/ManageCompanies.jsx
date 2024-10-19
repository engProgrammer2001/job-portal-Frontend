import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Axios for API calls
import { API_BASE_URL } from "../../../config/config";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]); // State to hold company data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const params = useParams();

  const token = localStorage.getItem("token");

  const fetchUserWithCompanies = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}company/get-user-with-companies`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Companies:", response.data.companies);
      setCompanies(response.data.companies);
      setLoading(false);
    } catch (err) {
      setError("Error fetching company data");
      setLoading(false);
    }
  };

  const companiesId = params;

  // Delete company function
 

  const imageBaseUrl = `${API_BASE_URL}`;
  // Fetch data on component mount
  useEffect(() => {
    fetchUserWithCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="p-6 bg-background">
        <h1 className="text-2xl font-bold">Company Dashboard</h1>
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link> &gt; 
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>

        <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
          Your company can be viewed, edited, or removed below.
        </div>

        <div className="mt-6 overflow-x-auto">
          {/* Traditional Table for larger screens */}
          <table className="min-w-full bg-card hidden sm:table">
            <thead>
              <tr className="bg-[#282828] text-white p-4">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Date Posted</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate over companies and display their details */}
              {companies.map((company) => (
                <tr key={company._id} className="border-b">
                  <td className="py-2 px-4 flex items-center">
                    <Link to={`/company-details/${company._id}`}>
                      <img
                        src={`${API_BASE_URL}${company.companyLogo}`}
                        alt="Company Logo"
                        className="mr-2 w-24 h-24 object-cover rounded-full cursor-pointer"
                      />
                    </Link>
                    <span className="ml-2">{company.companyName}</span>
                  </td>
                  <td className="py-2 px-4">
                    {company.status || "Accept"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="py-2 px-4 flex space-x-2">
                    <button className="bg-red-500 text-secondary-foreground hover:bg-secondary/80 p-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-muted-foreground hover:bg-muted/80 p-1 rounded">
                      Hide
                    </button>
                    <button
                      className="bg-red-500 text-destructive-foreground hover:bg-destructive/80 p-1 rounded"
                      onClick={() => deleteCompany(company._id)} // Call delete function
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile-friendly table */}
          <div className="block sm:hidden">
            {companies.map((company) => (
              <div key={company._id} className="mb-4 bg-border p-4 rounded">
                <div className="flex justify-between">
                  <span className="font-bold">Name</span>
                  <span>{company.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Status</span>
                  <span>{company.status || "Accept"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Date Posted</span>
                  <span>{new Date(company.createdAt).toLocaleDateString()}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        {/* Button to add company */}
        <Link to={"/add-company"}>
          <button className="mt-4 bg-red-500 text-white hover:bg-destructive/80 p-2 rounded">
            Add Company
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ManageCompanies;
