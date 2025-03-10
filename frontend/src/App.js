import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage';
import PlannerPage from './pages/PlannerPage';
import ProtectedRoute from './components/ProtectedRoute';
import DialogflowMessenger from './components/DialogflowMessenger';
import { AuthProvider } from './components/AuthContext';
import { TaskProvider } from './components/TaskContext';
import { useAuth } from './components/AuthContext';
import { useLocation } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <NavBar />
          <DialogflowMessengerManager />
          <DialogflowMessenger />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} /> 
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </TaskProvider>
      </AuthProvider>
    </Router>    
  );
};

// Handles df-messenger visibility and user-id update
const DialogflowMessengerManager = () => {
  const location = useLocation();
  const { user } = useAuth(); // Get user info from context

  useEffect(() => {
    const dfMessenger = document.querySelector("df-messenger");

    if (dfMessenger) {
      if (location.pathname === "/") {
        dfMessenger.style.display = "none"; // Hide on LandingPage
      } else {
        dfMessenger.style.display = "block"; // Show on other pages
      }

      // Update the user-id dynamically
      if (user?.user_id) {
        dfMessenger.setAttribute("user-id", user.user_id);
      }
    }
  }, [location.pathname, user]);

  return null; // This component doesn't render anything
};

export default App;
