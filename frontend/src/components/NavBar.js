import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from 'axios';

import '../styles/NavBar.css'


const NavBar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/logout", {
                withCredentials: true 
            });
            setUser(null);
            navigate("/");  // Redirect to home
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    }

    return (
        <nav>
            <div>
                <Link className="nav-link" id="nav-logo" to={user ? "/dashboard" : "/"}>planmylife</Link>
            </div>
            <ul className="nav-ul">
                <li><Link className="nav-link" to={user ? "/dashboard" : "/"}>Home</Link></li>
                {user && (
                    <li><Link className="nav-link" to="/planner">Planner</Link></li>
                )}
                <li><Link className="nav-link" to="/about">About</Link></li>
                {user && (
                    <li><Link className="nav-link" onClick={handleLogout}>Logout</Link></li>
                )}
            </ul>
            
        </nav>
    )
}

export default NavBar