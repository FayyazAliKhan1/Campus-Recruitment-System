import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getStudents } from "../../actions/user";
import PropTypes from "prop-types";
import Student from "./Student";
const Students = ({ getStudents, user: { stds, loading } }) => {
  useEffect(() => {
    getStudents();
  }, [getStudents]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Students</h1>
          <div className="profiles">
            {stds.length > 0 ? (
              stds.map(app => <Student key={app._id} student={app} />)
            ) : (
              <h4>No Students found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { getStudents }
)(Students);
