import React from "react";
import { Link } from "react-router-dom";

const ProfileItemc = ({
  profile: {
    company: { _id, name, avatar, country, city },
    status,
    skills,
    location
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        develop for
        <p>{status}</p>
        City: {city} Country: {country}
        <p className="my-1">Company location: {location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <div>
        <h5>Minimum Required skills for company</h5>
        <ul>
          {skills.slice(0, 5).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileItemc;
