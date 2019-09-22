import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCompanies } from "../../actions/user";
import PropTypes from "prop-types";
import Company from "./Company";
const Companies = ({ getCompanies, user: { cmps, loading } }) => {
  useEffect(() => {
    getCompanies();
  }, [getCompanies]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Companies</h1>
          <div className="profiles">
            {cmps.length > 0 ? (
              cmps.map(app => <Company key={app._id} company={app} />)
            ) : (
              <h4>No Companies found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Companies.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { getCompanies }
)(Companies);
