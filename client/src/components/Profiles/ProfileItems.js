import React from "react";
import { Link } from "react-router-dom";

const ProfileItems = ({
  profile: {
    student: { _id, name, avatar, qualification },
    status,
    company_name,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <h4>Qualification: {qualification}</h4>
        <p>
          {status}
          {company_name && <span> at {company_name}</span>}
        </p>

        <p className="my-1">Howe address: {location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <div>
        <h6>Student Minimun Skills</h6>
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

export default ProfileItems;
