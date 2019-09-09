import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const DashboardAction = ({ user }) => (
  <div>
    {user.age === undefined ? (
      <div className="dash-buttons">
        <Link to="/edit-profilec" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Edit Profile
        </Link>
      </div>
    ) : (
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary" /> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary" /> Add Education
        </Link>
      </div>
    )}
  </div>
);
DashboardAction.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  {}
)(DashboardAction);
