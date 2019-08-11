import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Campus Recruitment System</h1>
          <p className="lead">
            Here Company Posts jobs and Students apply for jobs
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-primary">
              Admin
            </Link>
            <Link to="/login" className="btn btn-light">
              Company
            </Link>
            <Link to="/login" className="btn btn-light">
              Student
            </Link>
            {/* <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
