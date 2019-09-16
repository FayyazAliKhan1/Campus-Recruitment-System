import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/companies">Companies</Link>{" "}
      </li>
      <li>
        <Link to="/students">Students</Link>{" "}
      </li>
      <li>
        <Link to="/profilesc">Company Profile</Link>
      </li>
      <li>
        <Link to="/profiles">Student Profile</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/companies">Companies</Link>{" "}
      </li>
      <li>
        <Link to="/students">Students</Link>{" "}
      </li>
      <li>
        <Link to="/profilesc">Company Profile</Link>
      </li>
      <li>
        <Link to="/profiles">Student Profile</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <div className="dropdown">
          <a className="dropbtn">Register</a>
          <div className="dropdown-content">
            <Link to="/register">Company Registration</Link>
            <Link to="/registers">Student Registeration</Link>
          </div>
        </div>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-home" /> Home
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
