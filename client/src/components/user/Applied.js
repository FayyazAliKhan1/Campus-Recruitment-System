import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const Applied = ({
  app: {
    student: { _id, name, avatar, qualification },
    job_name,
    skills,
    date
  }
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h2 class="text-dark">
          <strong>Student Name:</strong> {name}
        </h2>
        <p class="text-dark">
          <strong>Student Qualification:</strong> {qualification}
        </p>
        <p class="text-dark">
          <strong>Job in which applied:</strong> {job_name}
        </p>
        <p className="post-date">
          Applied on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <Link to={`/dashboard`} className="btn btn-primary">
          Back
        </Link>
      </div>
      <ul>
        <p class="text-dark">
          <strong>Student Skills:</strong>
        </p>
        {skills.map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applied;
