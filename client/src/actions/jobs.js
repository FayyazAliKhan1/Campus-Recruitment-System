import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_JOBS,
  JOB_ERROR,
  POST_JOB,
  APPLY_JOB,
  DELETE_JOB,
  UPDATE_JOB
} from "./types";
export const getJobsOfComp = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs/comp1");
    dispatch({ type: GET_JOBS, payload: res.data });
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
//post job
export const postJob = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/companies/post_job", formData, config);
    dispatch({
      type: POST_JOB,
      payload: res.data
    });
    dispatch(setAlert("Job Posted", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
//apply job
export const applyJob = (id, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      `/api/students/apply_job/${id}`,
      formData,
      config
    );
    dispatch({ type: APPLY_JOB, payload: res.data });
    dispatch(setAlert("Applied Successfully", "success"));
    history.push("/jobs");
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// delete job
export const deleteJob = id => async dispatch => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    dispatch({ type: DELETE_JOB });
    dispatch(setAlert("Deleted Successfully", "success"));
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
//get all jobs
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs");
    dispatch({ type: GET_JOBS, payload: res.data });
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// update job
export const updateJob = id => async dispatch => {
  try {
    await axios.put(`/api/jobs/${id}`);
    dispatch({ type: UPDATE_JOB });
    dispatch(setAlert("Update Successfully", "success"));
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
