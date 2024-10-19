import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the Quill editor
import axios from "axios"; // Import axios to handle API requests
import { API_BASE_URL } from "../../../config/config";

const AddCompanies = () => {
  const [companyContent, setCompanyContent] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    companyTagLine: "",
    companyWebsite: "",
    companyNumber: "",
    companyAddress: "",
    companyFacebook: "",
    companyTwitter: "",
    companyDescription: "",
  });

  const handleContentChange = (value) => {
    setCompanyContent(value);
  };

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]); // Capture the uploaded logo file
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem("token"); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData(); // Use FormData for file uploads
    data.append("companyName", formData.companyName);
    data.append("companyTagLine", formData.companyTagLine);
    data.append("companyWebsite", formData.companyWebsite);
    data.append("companyNumber", formData.companyNumber);
    data.append("companyAddress", formData.companyAddress);
    data.append("companyFacebook", formData.companyFacebook);
    data.append("companyTwitter", formData.companyTwitter);
    data.append("companyDescription", formData.companyDescription);
    data.append("companyContent", companyContent); // Rich text content
    if (companyLogo) {
      data.append("companyLogo", companyLogo); // Append the file if selected
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}company/add-companies`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Company added successfully:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-background rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Company</h1>

        <nav className="mb-6">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          &gt;
          <span className="text-muted"> Dashboard</span>
        </nav>

        <h2 className="text-xl font-semibold mb-4">Company Details</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-name">
                Company name
              </label>
              <input
                type="text"
                id="company-name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Company name"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-tagline">
                Company Tagline (optional)
              </label>
              <input
                type="text"
                id="company-tagline"
                name="companyTagLine"
                value={formData.companyTagLine}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Company tagline"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-logo">
                Company Logo (optional)
              </label>
              <input
                type="file"
                id="company-logo"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-website">
                Company Website
              </label>
              <input
                type="text"
                id="company-website"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Company website"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-number">
                Company Phone Number
              </label>
              <input
                type="text"
                id="company-number"
                name="companyNumber"
                value={formData.companyNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Company phone number"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-address">
                Company Address
              </label>
              <input
                type="text"
                id="company-address"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Company address"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-facebook">
                Company Facebook (optional)
              </label>
              <input
                type="text"
                id="company-facebook"
                name="companyFacebook"
                value={formData.companyFacebook}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Facebook page url"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium" htmlFor="company-twitter">
                Company Twitter (optional)
              </label>
              <input
                type="text"
                id="company-twitter"
                name="companyTwitter"
                value={formData.companyTwitter}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                placeholder="Twitter profile url"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium" htmlFor="company-description">
                Short Description (optional)
              </label>
              <textarea
                id="company-description"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                className="mt-1 block w-full border border-border rounded-md p-2"
                rows="4"
                placeholder="Short description about the company"
              ></textarea>
            </div>

            {/* Rich Text Editor for Company Content */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium" htmlFor="company-content">
                Company Content (optional)
              </label>
              <ReactQuill
                value={companyContent}
                onChange={handleContentChange}
                className="h-64"
                theme="snow"
                placeholder="Detailed content about the company..."
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-red-500 text-white hover:bg-secondary/80 p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanies;
