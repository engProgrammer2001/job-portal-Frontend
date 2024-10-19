import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { useNavigate, useParams } from "react-router-dom";

const CompanyDetails = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { companyId } = params;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Fetch company details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}company/get-companies/${companyId}`
        );
        setCompanyData(response.data);
        setUpdatedData(response.data); // Set initial data for editing
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId]);

  // Handle company deletion
  const deleteCompany = async (companyId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}company/delete-companies/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete Response:", response.data);
      setCompanyData(null);
      alert("Company deleted successfully!");
      navigate("/manage-companies");
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Error deleting company");
    }
  };

  // Handle company update
  const updateCompany = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}company/update-companies/${companyId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanyData(response.data.company); 
      alert("Company updated successfully!");
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Error updating company");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!companyData) return <div>No data available.</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-4 md:p-8">
      {isEditing ? (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Company Details</h2>
          <label htmlFor="companyName">company Name</label>
          <input
            type="text"
            name="companyName"
            value={updatedData.companyName}
            onChange={handleInputChange}
            placeholder="Company Name"
            className="block w-full p-2 border mb-4"
          />
          <label htmlFor="companyName">company TagLine</label>
          <input
            type="text"
            name="companyTagLine"
            value={updatedData.companyTagLine}
            onChange={handleInputChange}
            placeholder="Tagline"
            className="block w-full p-2 border mb-4"
          />
          <label htmlFor="companyName">company Website</label>
          <input
            type="text"
            name="companyWebsite"
            value={updatedData.companyWebsite}
            onChange={handleInputChange}
            placeholder="Website"
            className="block w-full p-2 border mb-4"
          />
          <label htmlFor="companyName">company Number</label>
          <input
            type="text"
            name="companyNumber"
            value={updatedData.companyNumber}
            onChange={handleInputChange}
            placeholder="Number"
            className="block w-full p-2 border mb-4"
          />
          <label htmlFor="companyName">company Address</label>
          <input
            type="text"
            name="companyAddress"
            value={updatedData.companyAddress}
            onChange={handleInputChange}
            placeholder="Number"
            className="block w-full p-2 border mb-4"
          />
          <label htmlFor="companyName">company Description</label>
          <textarea
            name="companyDescription"
            value={updatedData.companyDescription}
            onChange={handleInputChange}
            placeholder="Description"
            className="block w-full p-2 border mb-4"
          />
          <div className="flex space-x-4">
            <button
              onClick={updateCompany}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Company Display */}
          <div className="bg-white  shadow-lg rounded-lg p-6 mb-6">
            <img
              src={`${API_BASE_URL}${companyData.companyLogo}`}
              alt="Company Logo"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
            <h1 className="text-3xl font-bold mt-4">{companyData.companyName}</h1>
            <p className="text-gray-600 text-lg mb-4">
              {companyData.companyTagLine}
            </p>
            <h3 className="text-lg font-bold mt-4">{companyData._id}</h3>
            

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              {companyData.companyFacebook && (
                <a
                  href={companyData.companyFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Facebook
                </a>
              )}
              {companyData.companyTwitter && (
                <a
                  href={companyData.companyTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Twitter
                </a>
              )}
            </div>

            {/* Actions: Edit and Delete */}
            {/* Actions: Edit and Delete */}
            {role === "employer" && (
              <div className="lg:flex lg:justify-center mt-6 w-full">
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg"
                    onClick={() => deleteCompany(companyData._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-lg">
            <div>
              <h2 className="text-xl font-semibold mb-2">Company Information</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Address:</strong> {companyData.companyAddress}
                </li>
                <li>
                  <strong>Phone Number:</strong> {companyData.companyNumber}
                </li>
                <li>
                  <strong>Updated At:</strong>{" "}
                  {new Date(companyData.updatedAt).toLocaleString()}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Tagline:</strong> {companyData.companyTagLine}
                </li>
                {companyData.companyFacebook && (
                  <li>
                    <strong>Facebook:</strong> {companyData.companyFacebook}
                  </li>
                )}
                {companyData.companyTwitter && (
                  <li>
                    <strong>Twitter:</strong> {companyData.companyTwitter}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* About Us Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: companyData.companyContent }}
            />
          </div>

          {/* Company Overview */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
            <div className="space-y-2">
              <p>
                <strong>Created By:</strong> {companyData.createdBy}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(companyData.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(companyData.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
