import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../../state/authSlice";
import { useDispatch } from "react-redux";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle navbar visibility on mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    dispatch(logout()); 
    navigate("/login");
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg lg:bg-white lg:text-black ">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-4 text-red-500 focus:outline-none"
        onClick={toggleNavbar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <span className="text-white font-bold text-center text-2xl">
        Dashboard Navigation
      </span>
      {/* Sidebar */}
      <div
        className={`bg-card text-foreground p-4 w-64 h-full lg:block ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Main</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <Link
              to="/candidate-dashboard"
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              Dashboard
            </Link>
          </li>
          <li className="flex justify-between items-center">
            <Link
              to="/messages"
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              Messages
            </Link>
          </li>
          <li className="flex justify-between items-center">
            <Link
              to="/bookmarks"
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              Bookmarks
            </Link>
          </li>
          <li className="flex justify-between items-center">
            <Link
              to="/job-alert"
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              Job Alerts
            </Link>
            <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
              0
            </span>
          </li>
        </ul>

        {/* Conditionally Render Candidate Section */}
        {role === "candidate" && (
          <>
            <h2 className="text-lg font-semibold mt-6 mb-4">Candidate</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <Link
                  to="/manage-resumes"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Manage Resumes
                </Link>
                <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
                  0
                </span>
              </li>
              <li className="flex justify-between items-center">
                <Link
                  to="/add-resume"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Add Resume
                </Link>
              </li>
              <li className="flex justify-between items-center">
                <Link
                  to="/my-applications"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  My Applications
                </Link>
                <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
                  1
                </span>
              </li>
            </ul>
          </>
        )}

        {/* Conditionally Render Employer Section */}
        {role === "employer" && (
          <>
            <h2 className="text-lg font-semibold mt-6 mb-4">Employer</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <Link
                  to="/manage-job"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Manage Job
                </Link>
                <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
                  0
                </span>
              </li>
              <li className="flex justify-between items-center">
                <Link
                  to="/job-post"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Submit Job
                </Link>
              </li>
              <li className="flex justify-between items-center">
                <Link
                  to="/manage-companies"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Manage Companies
                </Link>
                <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
                  1
                </span>
              </li>
              <li className="flex justify-between items-center">
                <Link
                  to="/add-company"
                  className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
                >
                  Add Companies
                </Link>
                <span className="bg-destructive text-destructive-foreground rounded-full px-2 text-xs">
                  1
                </span>
              </li>
            </ul>
          </>
        )}

        <h2 className="text-lg font-semibold mt-6 mb-4">Account</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <Link
              to="/my-profile"
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              My Profile
            </Link>
          </li>
          <li className="flex justify-between items-center">
            <Link
              onClick={handleLogout}
              className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
