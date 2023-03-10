import React, { useState } from "react";
import "./Navbar.css";

import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const user = localStorage.getItem("token");
  const navigate = useNavigate() ;
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload() ;
}
  return (
    <div>
      <nav className="navigation">
        <a href="/" className="brand-name">
          <h1>
            <strong>🍃CODE <span className="span" >GREEN</span></strong>
          </h1>
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <div className="icon">☰</div>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              <a href="/">Home</a>
            </li> 
            {user && (
              <li>
                <a href="/dashboard" >Dashboard</a>
              </li>
            )}
            {!user && (
              <li>
                <a href="/signup">Signup</a>
              </li>
            )}
            {!user && (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
            {user && (
              <li>
                <a className="logout" onClick={handleLogout}>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
