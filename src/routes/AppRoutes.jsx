import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Authenticate from '../pages/auth/Authenticate';
import Home from '../pages/auth/Home';
import SignupPage from '../pages/auth/SignUp';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/authenticate" element={<Authenticate />} />

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
