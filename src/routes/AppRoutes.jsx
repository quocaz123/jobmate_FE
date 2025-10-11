import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Authenticate from '../pages/auth/Authenticate';
import Home from '../pages/auth/Home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes