import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../state/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


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
    <>
      <div className="bg-gray-800 text-white rounded-lg lg:h-screen ">
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-4 text-red-500 focus:outline-none"
          onClick={toggleNavbar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <span className="text-white font-bold text-center text-2xl ">
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
                to="/admin/admin/dashboard"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Dashboard
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-employer-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Employer
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-candidates-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Candidates
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-jobs-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Jobs
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-resume-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Resume
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-applications-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Applications
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/total-company-admin"
                className="hover:bg-red-200 hover:text-red-500 p-2 rounded-lg block"
              >
                Total Company
              </Link>
            </li>
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-4">Account</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <Link
                to="/admin/admin/my-profile-admin"
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
    </>
  );
};

export default AdminNavbar;
