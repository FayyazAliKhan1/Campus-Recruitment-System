import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getAppStudents } from "../../actions/user";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import Applied from "./Applied";
const AppliedStudent = ({ getAppStudents, user: { apps, loading } }) => {
  useEffect(() => {
    getAppStudents();
  }, [getAppStudents]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Applied Students</h1>
          <div className="profiles">
            {apps.length > 0 ? (
              apps.map(app => <Applied key={app._id} app={app} />)
            ) : (
              <h4>No Students found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

AppliedStudent.propTypes = {
  getAppStudents: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { getAppStudents }
)(AppliedStudent);
