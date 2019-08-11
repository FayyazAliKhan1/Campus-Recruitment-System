import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-home" /> Home
        </Link>
      </h1>
      <ul>
        <li>
          <a href="companies.html">Companies</a>
        </li>
        <li>
          <a href="student.html">Students</a>
        </li>
        <li>
          <a href="jobs.html">All Jobs</a>
        </li>
        <li>
          <div className="dropdown">
            <a className="dropbtn">Register</a>
            <div className="dropdown-content">
              <Link to="/register">Company Registration</Link>
              <Link to="/login">Student Registeration</Link>
            </div>
          </div>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
