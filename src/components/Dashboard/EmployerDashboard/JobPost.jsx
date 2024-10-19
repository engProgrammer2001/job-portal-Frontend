import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const JobPost = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobType: "",
    jobLocation: "",
    jobDescription: "",
    closingData: "",
    experienceLevel: "",
    fromSalary: "",
    toSalary: "",
    applicationEmail: "",
    headerImage: "",
    company: "", // Assuming you have the company info available
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("post token:", token);

    try {
      const response = await axios.post(
        `${API_BASE_URL}job/post-job`,
        jobDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message); // Show success alert
      // Optionally, you can reset the form or handle further actions here
      console.log("response:", response);
      setJobDetails({
        jobTitle: "",
        jobType: "",
        jobLocation: "",
        jobDescription: "",
        closingData: "",
        experienceLevel: "",
        fromSalary: "",
        toSalary: "",
        applicationEmail: "",
        headerImage: "",
        company: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to post the job. Please try again."); // Show error alert
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Job Details</h2>

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-4">
          <label
            htmlFor="job-title"
            className="block text-sm font-medium text-foreground"
          >
            Job Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="job-title"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
            placeholder="e.g. Product Designer"
            required
          />
        </div>

        {/* Location and Job Type */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-foreground"
            >
              Location (optional)
            </label>
            <input
              type="text"
              id="location"
              name="jobLocation"
              value={jobDetails.jobLocation}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. San Francisco"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="job-type"
              className="block text-sm font-medium text-foreground"
            >
              Job Type <span className="text-destructive">*</span>
            </label>
            <select
              id="job-type"
              name="jobType"
              value={jobDetails.jobType}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              required
            >
              <option value="">Select Job Type</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Tags */}
        <div className="mb-4">
          <label
            htmlFor="job-tags"
            className="block text-sm font-medium text-foreground"
          >
            Job Tags (optional)
          </label>
          <input
            type="text"
            id="job-tags"
            name="jobTags"
            value={jobDetails.jobTags}
            onChange={handleChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
            placeholder="e.g. Social Media, Management"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            name="jobDescription"
            value={jobDetails.jobDescription}
            onChange={handleChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Closing Date and Experience Level */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="closing-date"
              className="block text-sm font-medium text-foreground"
            >
              Closing Date <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              id="closing-date"
              name="closingData"
              value={jobDetails.closingData}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              required
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="experience-level"
              className="block text-sm font-medium text-foreground"
            >
              Experience Level (optional)
            </label>
            <input
              type="text"
              id="experience-level"
              name="experienceLevel"
              value={jobDetails.experienceLevel}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. 5+ years"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="experience-level"
              className="block text-sm font-medium text-foreground"
            >
              company
            </label>
            <input
              type="text"
              id="experience-level"
              name="company"
              value={jobDetails.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. 5+ years"
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-4 w-full flex justify-normal gap-4">
          <div>
            <label
              htmlFor="salary-range"
              className="block text-sm font-medium text-foreground"
            >
              Salary From (optional)
            </label>
            <input
              type="text"
              id="salary-range"
              name="fromSalary"
              value={jobDetails.fromSalary}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. $60,000 - $80,000"
            />
          </div>
          <div>
            <label
              htmlFor="salary-range"
              className="block text-sm font-medium text-foreground"
            >
              Salary To (optional)
            </label>
            <input
              type="text"
              id="salary-range"
              name="toSalary"
              value={jobDetails.toSalary}
              onChange={handleChange}
              className="mt-1 block w-full border border-border rounded-md p-2"
              placeholder="e.g. $60,000 - $80,000"
            />
          </div>
        </div>

        {/* Apply Link */}
        <div className="mb-4">
          <label
            htmlFor="apply-link"
            className="block text-sm font-medium text-foreground"
          >
            Link to Apply for Job (required)
          </label>
          <input
            type="url"
            id="apply-link"
            name="applicationEmail"
            value={jobDetails.applicationEmail}
            onChange={handleChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
            placeholder="e.g. https://example.com/apply"
            required
          />
        </div>

        {/* Header Image */}
        <div className="mb-4">
          <label
            htmlFor="header-image"
            className="block text-sm font-medium text-foreground"
          >
            Header Image (optional)
          </label>
          <input
            type="text"
            id="header-image"
            name="headerImage"
            value={jobDetails.headerImage}
            onChange={handleChange}
            placeholder='e.g. "https://via.placeholder.com/500x300"'
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white hover:bg-primary/80 p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobPost;
