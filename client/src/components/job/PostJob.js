import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { postJob } from "../../actions/jobs";
import { connect } from "react-redux";
const PostJob = ({ postJob, history }) => {
  const [formData, setFormData] = useState({
    job_name: "",
    eligible_c: "",
    salary: "",
    description: ""
  });
  const { job_name, eligible_c, salary, description } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Post Your new Job Vacancy</h1>

      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          postJob(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="job_name"
            value={job_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Eligibility Criteria of your job"
            name="eligible_c"
            value={eligible_c}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Starting Salary"
            name="salary"
            value={salary}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Details"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

PostJob.propTypes = {
  postJob: PropTypes.func.isRequired
};

export default connect(
  null,
  { postJob }
)(withRouter(PostJob));
