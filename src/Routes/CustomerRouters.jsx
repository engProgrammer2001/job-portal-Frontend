import React from "react";
import Footer from "../components/common/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/common/Navbar/Navbar";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import BrowseCompany from "../components/ShowAllCompany/BrowseCompany";
import Contact from "../pages/Contact";
import PageNotFound from "../pages/PageNotFound";
import ResetPassword from "../components/auth/ResetPassword";
import CandidateDashboard from "../components/Dashboard/EmployeeDashboard/CandidateDashboard";
import Message from "../components/Dashboard/Message/Message";
import Layout from "../components/Dashboard/Layout";
import BookMark from "../components/Dashboard/BookMark/BookMark";
import ManageResume from "../components/Dashboard/ManageResume/ManageResume";
import AddResume from "../components/Dashboard/AddResume/AddResume";
import MyApplication from "../components/Dashboard/EmployeeDashboard/MyApplication";
import ManageCompanies from "../components/Dashboard/EmployerDashboard/ManageCompanies";
import AddCompanies from "../components/Dashboard/EmployerDashboard/AddCompanies";
import ProfilePage from "../pages/ProfilePage";
import HalfPageMap from "../components/BrowseJob/HalfPageMap";
import AJAXLoadedJobs from "../components/BrowseJob/AJAXLoadedJobs";
import ListLayout from "../components/BrowseJob/ListLayout";
import GridLayout from "../components/BrowseJob/GridLayout";
import MapAboveListings from "../components/BrowseJob/MapAboveListings";
import JobDetails from "../components/JobDetails/JobDetails";
import JobPost from "../components/Dashboard/EmployerDashboard/JobPost";
import JobAlert from "../components/Dashboard/JobAlert/JobAlert";
import CompanyDetaills from "../components/Dashboard/EmployerDashboard/CompanyDetaills";
import MessageJob from "../components/Dashboard/EmployerDashboard/MessageJob";
import BrowseCandidate from "../components/Dashboard/BrowseCandidate/BrowseCandidate";

const CustomerRouters = () => {
  return (
    <>
      <div>
      <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/browse-company" element={<BrowseCompany />} />
        <Route path="/half-page-map" element={<HalfPageMap />} />
        <Route path="/ajax-loaded-jobs" element={<AJAXLoadedJobs />} />
        <Route path="/list-layout" element={<ListLayout />} />
        <Route path="/grid-layout" element={<GridLayout />} />
        <Route path="/map-above-listings" element={<MapAboveListings />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />
        <Route path="/browse-candidtes" element={<BrowseCandidate/>} />

        <Route path="/" element={<Layout />}>
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/bookmarks" element={<BookMark />} />
          <Route path="/manage-resumes" element={<ManageResume />} />
          <Route path="/add-resume" element={<AddResume />} />
          <Route path="/my-applications" element={<MyApplication />} />
          <Route path="/manage-companies" element={<ManageCompanies />} />
          <Route path="/manage-job" element={<MessageJob/>}/>
          <Route path="/company-details/:companyId" element={<CompanyDetaills />} />
          <Route path="/add-company" element={<AddCompanies />} />
          <Route path="/job-post" element={<JobPost />} />
          <Route path="/job-alert" element={<JobAlert />} />
          <Route path="/my-profile" element={<ProfilePage />} />
        </Route>
        <Route path="/candidate-dashboard" element={<Layout />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default CustomerRouters;
