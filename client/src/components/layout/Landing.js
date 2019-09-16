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
            <Link to="/registers" className="btn btn-primary">
              Sign Up for Students
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign Up for Company
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
