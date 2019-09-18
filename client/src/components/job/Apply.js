import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { applyJob } from "../../actions/jobs";
import PropTypes from "prop-types";

const Apply = ({ applyJob, match, isAuthenticated, history }) => {
  const [formData, setformData] = useState({ skills: [] });
  const { skills } = formData;
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  // useEffect(() => {
  //     applyJob(match.params.id)
  // }, [applyJob, match.params.id])
  return (
    <Fragment>
      <h1 className="large text-primary">Apply for job</h1>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          applyJob(match.params.id, formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Your skills in technology"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
            required
          />
        </div>
      </form>
    </Fragment>
  );
};

Apply.propTypes = {
  applyJob: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { applyJob }
)(withRouter(Apply));
