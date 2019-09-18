import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Top from "./Top";
import Topc from "./Topc";
import Experience from "./Experience";
import Education from "./Education";
import About from "./About";
import Aboutc from "./Aboutc";
import Github from "./Github";
const Profile = ({
  getProfileById,
  match, // this.props.match.params.id
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user.age !== undefined ? (
            <div className="profile-grid my-1">
              <Top profile={profile} />
              <About profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map(experience => (
                      <Experience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Experience Credentials</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map(education => (
                      <Education key={education._id} education={education} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Education Credentials</h4>
                )}
              </div>
              {profile.githubusername && (
                <Github username={profile.githubusername} />
              )}
            </div>
          ) : (
            <div className="profile-grid my-1">
              <Topc profile={profile} />
              <Aboutc profile={profile} />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
