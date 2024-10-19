import { useEffect, useState, React } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { API_BASE_URL } from "../../config/config";
import axios from "axios";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}job/all-job`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const filteredJobs = response.data.jobs.filter(
          (job) =>
            job.jobTitle.toLowerCase().includes("call boy") ||
            job.jobTitle.toLowerCase().includes("play boy") ||
            job.jobTitle.toLowerCase().includes("feture boy")
        );
        setFeaturedJobs(filteredJobs || []);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const handleNext = () => {
    if (currentJobIndex < featuredJobs.length - 1) {
      setCurrentJobIndex(currentJobIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (currentJobIndex > 0) {
      setCurrentJobIndex(currentJobIndex - 1);
    }
  };

  // Handle navigation to job details page
  const handleApplyClick = (jobId) => {
    navigate(`/job-details/${jobId}`); 
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="md:col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Featured Job
      </h2>

      {/* Job Details */}
      {featuredJobs.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {featuredJobs[currentJobIndex].jobTitle}
          </h3>

          <div className="space-y-1">
            <p className="text-gray-600">
              <span className="font-semibold">Company: </span>
              {featuredJobs[currentJobIndex].company.companyName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location: </span>
              {featuredJobs[currentJobIndex].jobLocation}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Job Type: </span>
              {featuredJobs[currentJobIndex].jobType}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Salary: </span>
              ₹{featuredJobs[currentJobIndex].fromSalary} - ₹
              {featuredJobs[currentJobIndex].toSalary}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Closing Date: </span>
              {featuredJobs[currentJobIndex].closingData}
            </p>
          </div>

          <p className="text-gray-700 text-justify">
            {featuredJobs[currentJobIndex].jobDescription}
          </p>

          <div className="w-full">
            <button
              className="bg-red-500 text-white w-full px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={() =>
                handleApplyClick(featuredJobs[currentJobIndex]._id)
              }
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 p-2 rounded-lg disabled:opacity-50 flex items-center w-1/2 mr-2 hover:bg-gray-400 transition-all"
          onClick={handlePrevious}
          disabled={currentJobIndex === 0}
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button
          className="bg-gray-300 p-2 rounded-lg disabled:opacity-50 flex items-center w-1/2 ml-2 hover:bg-gray-400 transition-all"
          onClick={handleNext}
          disabled={currentJobIndex === featuredJobs.length - 1}
        >
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>
      {/* Job Counter */}
      <p className="text-center text-gray-600 mt-4 text-xl">
        {featuredJobs.length > 0
          ? `Showing job ${currentJobIndex + 1} of ${featuredJobs.length}`
          : "No jobs available."}
      </p>
    </div>
  );
};

export default FeaturedJobs;
