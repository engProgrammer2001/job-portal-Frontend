import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const HeroSection = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = async () => {
    try {
      // API call with search parameters
      const response = await axios.get(`${API_BASE_URL}job/get-all-job-withsearch`, {
        params: {
          title: jobTitle,   // Use correct query param as per backend
          location: location,
          category: category,
        },
      });
      
      // Handle response data
      console.log("Filtered Jobs:", response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-illustration/abstract-symbol-business-job-chart-260nw-1914647818.jpg)",
        }}
      />
      <div className="relative flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-background bg-opacity-50 p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-red-500 text-center">
          Find the Right Job
        </h1>
        <p className="text-base md:text-lg text-gray-500 text-center mt-2">
          Hire Experts or be hired in automotive
        </p>

        <div className="mt-6 w-full max-w-md md:max-w-2xl">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* Job title input */}
              <input
                type="text"
                placeholder="What job are you looking for?"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              
              {/* Location input */}
              <input
                type="text"
                placeholder="City/Town?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              
              {/* Category select */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Categories</option>
                <option value="All Categories">All Categories</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
              </select>
              
              {/* Search button */}
              <button
                className="bg-red-500 text-white p-2 rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <p className="mt-4 text-black">
            Need more search options?{" "}
            <button className="text-red-500 hover:underline">
              Advanced Search
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
