import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-6">
      <div className="text-gray-900 text-7xl font-bold mb-4">404</div>
      <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-red-500 transition-all duration-300"
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default PageNotFound;
