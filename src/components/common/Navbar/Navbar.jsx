import {
  Bars3Icon,
  MoonIcon,
  PaperAirplaneIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { FaCaretDown, FaCaretRight, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../state/authSlice";
import logo from "../../../assets/images/job-portal.jpg"


const role = localStorage.getItem("role");

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSubMenu = (menuName) => {
    setActiveSubMenu((prevState) => (prevState === menuName ? "" : menuName));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    dispatch(logout()); // Dispatch logout action to clear user data in Redux
    navigate("/");
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex mx-auto justify-between w-5/6 ">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-16 my-8">
            <div>
              <Link
                to="/"
                className="flex gap-1 font-bold text-gray-700 items-center "
              >
                <img className="h-14 w-14" src={logo} alt="" />
              </Link>
            </div>
            {/* primary */}
            <div className="hidden lg:flex gap-8 relative">
              {/* For Candidates */}
              {role === "candidate" && (
                <div
                  onMouseEnter={() => handleSubMenu("candidates")}
                  onMouseLeave={() => handleSubMenu("")}
                  className="relative"
                >
                  <Link to="/" className="flex items-center">
                    For Candidates
                    <FaCaretDown className="ml-2" />
                  </Link>
                  {activeSubMenu === "candidates" && (
                    <div className="absolute top-8 left-0 bg-white shadow-md px-4 w-48 z-10">
                      <Link to="/browse-company" className="block py-2">
                        Browse Companies
                      </Link>
                      <Link to="/browse-category" className="block py-2">
                        Browse Category
                      </Link>
                      <Link to="/add-resume" className="block py-2">
                        Submit Resume
                      </Link>
                      <Link to="/candidate-dashboard" className="block py-2">
                        Candidate Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Browser Jobs */}
              <div
                onMouseEnter={() => handleSubMenu("browserJobs")}
                onMouseLeave={() => handleSubMenu("")}
                className="relative"
              >
                <Link to="/" className="flex items-center">
                  Browse Jobs
                  <FaCaretDown className="ml-2" />
                </Link>
                {activeSubMenu === "browserJobs" && (
                  <div className="absolute top-8 left-0 bg-white shadow-md px-4 w-48 z-10">
                    <Link to="/half-page-map" className="block py-2">
                      Half Page Map
                    </Link>
                    <Link to="/ajax-loaded-jobs" className="block py-2">
                      AJAX Loaded Jobs
                    </Link>
                    <Link to="/list-layout" className="block py-2">
                      List Layout
                    </Link>
                    <Link to="/grid-layout" className="block py-2">
                      Grid Layout
                    </Link>
                    <Link to="/map-above-listings" className="block py-2">
                      Map Above Listings
                    </Link>
                  </div>
                )}
              </div>

              {/* For Employers */}
              {role === "employer" && (
                <div
                  onMouseEnter={() => handleSubMenu("employers")}
                  onMouseLeave={() => handleSubMenu("")}
                  className="relative"
                >
                  <Link to="/" className="flex items-center">
                    For Employers
                    <FaCaretDown className="ml-2" />
                  </Link>
                  {activeSubMenu === "employers" && (
                    <div className="absolute top-8 left-0 bg-white shadow-md p-4 w-48 z-10">
                      <Link to="/browse-candidtes" className="block py-2">
                        Browse Candidates
                      </Link>
                      <Link to="/job-post" className="block py-2">
                        Submit Job
                      </Link>
                      <Link to="/add-company" className="block py-2">
                        Add Company
                      </Link>
                      <Link to="/candidate-dashboard" className="block py-2">
                        Employer Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Pages */}
              <div
                onMouseEnter={() => handleSubMenu("pages")}
                onMouseLeave={() => handleSubMenu("")}
                className="relative"
              >
                <Link to="/" className="flex items-center">
                  Pages
                  <FaCaretDown className="ml-2" />
                </Link>
                {activeSubMenu === "pages" && (
                  <div className="absolute top-8 left-0 bg-white shadow-md w-48 p-4 z-10">
                    <Link to="/resume" className="block py-2">
                      Resume Page
                    </Link>
                    <Link to="/contact" className="block py-2">
                      Contact
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* secondary */}
          <div className="flex gap-6 items-center">
            <div className="hidden xs:flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-2">
                <MoonIcon className="h-6 w-6" />
                <SunIcon className="h-6 w-6" />
              </div>
              <div>
                <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                  Free Trial
                </button>
              </div>
            </div>
            {/* User avatar with dropdown */}
            {user ? (
              <div className="relative flex items-center gap-4">
                <div className="flex items-center">
                  <Link to="/my-profile">
                    <FaUserCircle className="h-8 w-8 text-gray-700" />
                  </Link>
                  <div className="relative">
                    <button onClick={() => setActiveSubMenu("userMenu")}>
                      <FaCaretDown className="ml-1" />
                    </button>
                    {activeSubMenu === "userMenu" && (
                      <div className="absolute top-10 right-0 bg-white shadow-md w-48 z-10">
                        <Link
                          to="/my-profile"
                          className="block w-full py-2 px-4 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/candidate-dashboard"
                          className="block w-full py-2 px-4 hover:bg-gray-200"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 px-4 text-red-500 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-100">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Register
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8 py-3">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            {/* For Candidates - Mobile */}
            {role === "candidate" && (
              <div onClick={() => handleSubMenu("candidates-mobile")}>
                <span className="flex items-center">
                  For Candidates <FaCaretRight className="ml-2" />
                </span>
                {activeSubMenu === "candidates-mobile" && (
                  <div className="flex flex-col ml-4 mt-2">
                    <Link to="/browse-company" className=" py-2">Browse Companies</Link>
                    <Link to="/browse-category" className=" py-2">Browse Category</Link>
                    <Link to="/add-resume" className=" py-2">Submit Resume</Link>
                    <Link to="/candidate-dashboard" className=" py-2">Candidate Dashboard</Link>
                  </div>
                )}
              </div>
            )}

            {/* Browse Jobs - Mobile */}
            <div onClick={() => handleSubMenu("browserJobs-mobile")}>
              <span className="flex items-center">
                Browse Jobs <FaCaretRight className="ml-2" />
              </span>
              {activeSubMenu === "browserJobs-mobile" && (
                <div className="flex flex-col ml-4 mt-2">
                  <Link to="/half-page-map" className=" py-2">Half Page Map</Link>
                  <Link to="/ajax-loaded-jobs" className=" py-2">AJAX Loaded Jobs</Link>
                  <Link to="/list-layout" className=" py-2">List Layout</Link>
                  <Link to="/grid-layout" className=" py-2">Grid Layout</Link>
                  <Link to="/map-above-listings" className=" py-2">Map Above Listings</Link>
                </div>
              )}
            </div>

            {/* For Employers - Mobile */}
            {role === "employer" && (
              <div onClick={() => handleSubMenu("employers-mobile")}>
                <span className="flex items-center">
                  For Employers <FaCaretRight className="ml-2" />
                </span>
                {activeSubMenu === "employers-mobile" && (
                  <div className="flex flex-col ml-4 my-2 mt-2">
                    <Link to="/browse-candidtes" className=" py-2">Browse Candidates</Link>
                    <Link to="/job-post" className=" py-2">Submit Job</Link>
                    <Link to="/add-company" className=" py-2">Add Company</Link>
                    <Link to="/candidate-dashboard" className=" py-2">Employer Dashboard</Link>
                  </div>
                )}
              </div>
            )}

            {/* Pages - Mobile */}
            <div onClick={() => handleSubMenu("pages-mobile")}>
              <span className="flex items-center">
                Pages <FaCaretRight className="ml-2" />
              </span>
              {activeSubMenu === "pages-mobile" && (
                <div className="flex flex-col ml-4 mt-2">
                  <Link to="/resume">Resume Page</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
