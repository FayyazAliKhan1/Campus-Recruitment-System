import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteCmp } from "../../actions/admin";
const Company = ({
  company: { _id, name, avatar, website, address, country, city, number, date },
  auth: { user },
  deleteCmp
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h2 class="text-dark">
          <strong>Comapny Name:</strong> {name}
        </h2>
        <p class="text-dark">
          <strong>Website:</strong>{" "}
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </p>
        <p class="text-dark">
          <strong>Company Current Address:</strong>
          {country} {city} {address}
        </p>
        <p class="text-dark">
          <strong>Contact number:</strong> {number}
        </p>
        <p className="post-date">
          Company Registered on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {user.age !== undefined && user.isAdmin && (
          <button className="btn btn-danger" onClick={() => deleteCmp(_id)}>
            Delete Company
          </button>
        )}
      </div>
    </div>
  );
};
Company.propTypes = {
  deleteCmp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteCmp }
)(Company);
