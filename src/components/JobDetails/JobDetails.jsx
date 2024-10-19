import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import Modal from "./Model";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobId = params.jobId;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}job/get-job/${jobId}`);
        setJobDetails(response.data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!jobDetails)
    return <div className="text-gray-500">No job details found.</div>;

  const {
    jobTitle,
    applicationEmail,
    jobDescription,
    jobLocation,
    company,
    closingData,
    fromSalary,
    toSalary,
    jobStatus,
    jobType,
    experienceLevel,
  } = jobDetails;

  return (
    <div className="mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {jobTitle || "Job Title Not Available"}
      </h1>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          <strong>Application Email:</strong>{" "}
          {applicationEmail || "Not Available"}
        </p>
        <p className="text-gray-600">
          <strong>Closing Date:</strong> {closingData || "Not Available"}
        </p>
      </div>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Job Description:</strong>
        <span className="block mt-2">
          {jobDescription || "Description Not Available"}
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p>
            <strong>Location:</strong> {jobLocation || "Not Available"}
          </p>
          <p>
            <strong>Job Status:</strong> {jobStatus || "Not Available"}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p>
            <strong>Job Type:</strong> {jobType || "Not Available"}
          </p>
          <p>
            <strong>Experience Level:</strong>{" "}
            {experienceLevel || "Not Available"} years
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <p>
            <strong>Salary:</strong> ₹{fromSalary || "N/A"} - ₹
            {toSalary || "N/A"}
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mt-6 mb-4">
        Company Details
      </h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <p className="mb-2">
          <strong>Name:</strong> {company?.companyName || "Not Available"}
        </p>
        <p className="mb-2">
          <strong>Tagline:</strong> {company?.companyTagLine || "Not Available"}
        </p>
        <p className="mb-2">
          <strong>Website:</strong>
          <a
            href={company?.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company?.companyWebsite || "Not Available"}
          </a>
        </p>
        <p className="mb-2">
          <strong>Twitter:</strong>
          <a
            href={company?.companyTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company?.companyTwitter || "Not Available"}
          </a>
        </p>
        <p className="mb-2">
          <strong>Contact Number:</strong>
          <a
            href={`tel:${company?.companyNumber}`}
            className="text-blue-600 hover:underline"
          >
            {company?.companyNumber || "Not Available"}
          </a>
        </p>
        <p className="mb-2">
          <strong>Facebook:</strong>
          <a
            href={company?.companyFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company?.companyFacebook || "Not Available"}
          </a>
        </p>
        <p className="mb-2">
          <strong>Company Content:</strong>
          <a
            href={company?.companyContent}
            rel="noopener noreferrer"
            className="text-black "
          >
            {company?.companyContent || "Not Available"}
          </a>
        </p>
        <button
          className="bg-red-500 text-lg text-white px-4 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Apply Now
        </button>
        {isModalOpen && (
          <Modal jobId={jobId} closeModal={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
