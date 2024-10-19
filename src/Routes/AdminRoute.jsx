import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Admin from "../components/Admin/Admin";
import AdminDashboard from "../components/Admin/components/AdminDashboard";
import TotalCandidate from "../components/Admin/components/TotalCandidate";
import TotalEmployer from "../components/Admin/components/TotalEmployer";
import TotalJobs from "../components/Admin/components/TotalJobs";
import TotalResume from "../components/Admin/components/TotalResume";
import TotalApplications from "../components/Admin/components/TotalApplications";
import AdminProfile from "../components/Admin/components/AdminProfile";
import TotalCompany from "../components/Admin/components/TotalCompany";

const AdminRoute = () => {
  return (
    <Routes>
      {/* Protect all admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="total-candidates-admin" element={<TotalCandidate />} />
        <Route path="total-employer-admin" element={<TotalEmployer />} />
        <Route path="total-jobs-admin" element={<TotalJobs />} />
        <Route path="total-resume-admin" element={<TotalResume />} />
        <Route path="total-applications-admin" element={<TotalApplications />} />
        <Route path="my-profile-admin" element={<AdminProfile />} />
        <Route path="total-company-admin" element={<TotalCompany />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
