// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../common/SideNavbar/SideNavbar";

const Layout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-auto">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/5 bg-white text-black p-4">
        <SideNavbar />
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-4/5 bg-gray-100">
        <Outlet /> {/* This will render the content for each route */}
      </div>
    </div>
  );
};

export default Layout;
