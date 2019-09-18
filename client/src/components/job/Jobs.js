import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import SingleJob from "./SingleJob";
const Jobs = ({ getJobs, jobs: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">All Jobs</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" />
            Apply Here and Connect with Companies
          </p>
          <div className="profiles">
            {jobs.length > 0 ? (
              jobs.map(job => <SingleJob key={job._id} job={job} />)
            ) : (
              <h4>No Jobs found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getJobs }
)(Jobs);
