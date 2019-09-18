import React from "react";
import { Link } from "react-router-dom";
const SingleJob = ({
  job: {
    _id,
    company: { name, website },
    job_name,
    eligible_c,
    salary,
    description
  }
}) => {
  return (
    <div className="profile-exp bg-white p-2">
      <div>
        <h2 class="text-primary">{name}</h2>
        <p class="text-dark">{website}</p>
        <p class="text-dark">{job_name} required here</p>
        <p class="text-dark">Eligible Candidates {eligible_c}</p>
        <p class="text-dark">Starting Salary: {salary}</p>
        <p>Job Details {description}</p>
        <Link to={`/jobs/${_id}`} className="btn btn-primary">
          Apply
        </Link>
      </div>
    </div>
  );
};

export default SingleJob;
