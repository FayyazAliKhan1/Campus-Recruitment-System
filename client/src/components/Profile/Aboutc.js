import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Aboutc = ({
  profile: {
    bio,
    skills,
    company: { name, city, country, number }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
          <p>Country: {country}</p>
          <p>City: {city}</p>
          <p>mobile number: {number}</p>
          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        <p>Company Mostly Required Skills</p>
        {skills.map((skill, index) => (
          <div className="p-1">
            <i className="fa fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

Aboutc.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Aboutc;
