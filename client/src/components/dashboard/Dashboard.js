import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>

      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          {user.age === undefined ? (
            ""
          ) : (
            <Fragment>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </Fragment>
          )}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-user-minus" />
              Delete my account
            </button>
          </div>
        </Fragment>
      ) : user.age !== undefined && user.isAdmin ? (
        <Fragment>
          <h1 class="large text-primary">Admin Dashboard</h1>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          {user.age === undefined ? (
            <Link to="/create-profilec" className="btn btn-primary my-1">
              Create Profile
            </Link>
          ) : (
            <Link to="/create-profiles" className="btn btn-primary my-1">
              Create Profile
            </Link>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
