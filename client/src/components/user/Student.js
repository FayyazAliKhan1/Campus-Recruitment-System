import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteStd } from "../../actions/admin";
import PropTypes from "prop-types";
const Student = ({
  student: { _id, name, avatar, qualification, address, age, mobile, date },
  auth: { user },
  deleteStd
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
          <strong>Student Home Address:</strong> {address}
        </p>
        <p class="text-dark">
          <strong>Age:</strong> {age}
        </p>
        <p class="text-dark">
          <strong>Mobile number:</strong> {mobile}
        </p>
        <p className="post-date">
          Student Registered on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {user.age !== undefined && user.isAdmin && (
          <button className="btn btn-danger" onClick={() => deleteStd(_id)}>
            Delete Student
          </button>
        )}
      </div>
    </div>
  );
};

Student.propTypes = {
  deleteStd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteStd }
)(Student);
