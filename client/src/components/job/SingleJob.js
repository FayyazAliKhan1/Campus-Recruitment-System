import React from "react";
import { connect } from "react-redux";
import { deleteJob } from "../../actions/jobs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const SingleJob = ({
  job: {
    _id,
    company: { name, website },
    job_name,
    eligible_c,
    salary,
    description
  },
  auth: { user },
  deleteJob
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
        {user.age !== undefined && !user.isAdmin ? (
          <Link to={`/jobs/${_id}`} className="btn btn-primary">
            Apply
          </Link>
        ) : (
          <button className="btn btn-danger" onClick={() => deleteJob(_id)}>
            <i className="fa fa-user-minus" />
            Delete Job
          </button>
        )}
      </div>
    </div>
  );
};
SingleJob.propTypes = {
  deleteJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteJob }
)(SingleJob);
