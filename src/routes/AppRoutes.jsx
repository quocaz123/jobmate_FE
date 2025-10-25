import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/auth/Home";
import LoginPage from "../pages/auth/LoginPage";
import Authenticate from "../pages/auth/Authenticate";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentJobList from "../pages/student/StudentJobList";
import StudentJobRequest from "../pages/student/StudentJobRequest";
import StudentApplications from "../pages/student/StudentApplications";
import StudentProfile from "../pages/student/StudentProfile";
import StudentJobDetail from "../pages/student/StudentJobDetail";
import StudentApplicationDetail from "../pages/student/StudentApplicationDetail";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/joblist" element={<StudentJobList />} />
        <Route path="/student/jobrequest" element={<StudentJobRequest />} />
        <Route path="/student/applications" element={<StudentApplications />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/job/:id" element={<StudentJobDetail />} />
        <Route path="/student/application/:id" element={<StudentApplicationDetail />} />
      </Routes>
    </Router>
  );
}