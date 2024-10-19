import React from 'react';
import { FaGlobe } from "react-icons/fa";

const PopularCategories = () => {
  return (
    <div>
      <div className="p-6 lg:px-24">
        <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>

        {/* Grid for 4 divs per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* First row of 4 items with links */}
          <a href="/half-page-map" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Accounting / Finance</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">8070</p>
            </div>
          </a>

          <a href="/list-layout" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Advertising Jobs</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">9755</p>
            </div>
          </a>

          <a href="/half-page-map" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Automotive Jobs</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">10329</p>
            </div>
          </a>

          <a href="/grid-layout" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Backdoor Jobs</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">11492</p>
            </div>
          </a>

          {/* Second row of 4 items with links */}
          <a href="/map-above-listings" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Construction / Facilities</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">7736</p>
            </div>
          </a>

          <a href="/half-page-map" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Consultancy Jobs</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">10160</p>
            </div>
          </a>

          <a href="/ajax-loaded-jobs" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Customer Service</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">15816</p>
            </div>
          </a>

          <a href="/half-page-map" className="group">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <FaGlobe className="w-8 h-8 mb-2 text-red-500 group-hover:text-white" />
              <h3 className="text-lg font-medium">Education Training</h3>
              <p className="text-5xl flex justify-center text-gray-500 group-hover:text-white blur-sm">5949</p>
            </div>
          </a>
        </div>
      </div>
      <hr className="border-gray-300 my-28" />
    </div>
  );
};

export default PopularCategories;
