import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getJobsOfComp } from "../../actions/jobs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SingleJob from "./SingleJob";
const GetPJobs = ({ getJobsOfComp, jobs: { jobs, loading } }) => {
  useEffect(() => {
    getJobsOfComp();
  }, [getJobsOfComp]);
  return (
    <Fragment>
      {jobs === null || loading ? (
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

GetPJobs.propTypes = {
  getJobsOfComp: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getJobsOfComp }
)(GetPJobs);
