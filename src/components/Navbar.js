import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">Clinigoal</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <a href="#courses">Courses</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>

        {/* Login Dropdown */}
        <div
          className="login-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="login-btn">Login ▾</span>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/login/admin">Admin Login</Link>
              <Link to="/login/user">User Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
