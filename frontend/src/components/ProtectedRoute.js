import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext'

// Checks if a session exists before routing
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;