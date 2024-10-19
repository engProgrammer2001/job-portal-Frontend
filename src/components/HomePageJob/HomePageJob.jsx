import React from "react";
import FeaturedJobs from "../FeaturedJobs/FeaturedJobs";
import RecentJobs from "../RecentJobs/RecentJobs";
import Testimonials from "../Testimonials/Testimonials";

const HomePageJob = () => {
  return (
    <>
      <div className="p-6 lg:px-24">
        {/* Two-column grid with spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Grid (Recent Jobs) - 70% on larger screens */}
          <div className="md:col-span-2 rounded-lg ">
            <RecentJobs />
          </div>
          {/* Second Grid (Featured Jobs) - 30% on larger screens */}
          <div className="md:col-span-1 rounded-lg ">
            <FeaturedJobs />
          </div>
        </div>
      </div>
      <div>
        <div className="relative h-[50vh] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGZXqRIUltTi-3ZWAgFKkKW3zblxm2U38lQ&s')`, // Replace with your image URL
              opacity: 0.7,
            }}
          />
          <div className="absolute inset-0 bg-black opacity-70" />
          <div className="relative flex flex-col md:flex-row h-full items-center justify-between px-5 lg:px-0 md:px-10">
            <div className="text-white space-y-4 w-full md:w-1/2 px-8">
              <h1 className="text-3xl md:text-4xl font-bold">
                Find Your Dream Job
              </h1>
              <p className="text-lg">
                Explore thousands of job opportunities across different
                industries.
              </p>
              <button onClick={() => window.location.href = '/list-layout'} className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Browse Jobs
              </button>
            </div>

            {/* Right Side (Image Section) */}
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <img
                src="https://www.tvisha.com/data/category_images/job-portban-main-banner.jpg" 
                alt="Job Search"
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Section */}
      <div>
        <Testimonials />
      </div>
    </>
  );
};

export default HomePageJob;
