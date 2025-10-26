
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Authenticate from '../pages/auth/Authenticate';
import Home from '../pages/auth/Home';
import SignupPage from '../pages/auth/SignUp';
import MainLayout from '../layouts/MainLayout';
import Overview from '../pages/Overview';
import JobPostings from '../pages/JobPostings';
import FindStudents from '../pages/FindStudents';
import ApplicantsPage from '../pages/ApplicantsPage';
import MessagesPage from '../pages/MessagesPage';
import Statistics from '../pages/Statistics';
import CompanyProfile from '../pages/CompanyProfile';
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentJobList from "../pages/student/StudentJobList";
import StudentJobRequest from "../pages/student/StudentJobRequest";
import StudentApplications from "../pages/student/StudentApplications";
import StudentProfile from "../pages/student/StudentProfile";
import StudentJobDetail from "../pages/student/StudentJobDetail";
import StudentApplicationDetail from "../pages/student/StudentApplicationDetail";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/dashboard" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/job-postings" element={<JobPostings />} />
                <Route path="/find-students" element={<FindStudents />} />
                <Route path="/applicants" element={<ApplicantsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/company-profile" element={<CompanyProfile />} />

                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/joblist" element={<StudentJobList />} />
                <Route path="/student/jobrequest" element={<StudentJobRequest />} />
                <Route path="/student/applications" element={<StudentApplications />} />
                <Route path="/student/profile" element={<StudentProfile />} />
                <Route path="/student/job/:id" element={<StudentJobDetail />} />
                <Route path="/student/application/:id" element={<StudentApplicationDetail />} />

                {/* Các trang có Header và Footer */}
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
            </Routes>
        </Router>
    )
}

export default AppRoutes
