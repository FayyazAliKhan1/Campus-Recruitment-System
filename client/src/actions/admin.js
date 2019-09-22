import axios from "axios";
import { setAlert } from "./alert";
import {
  ADMIN_DEL_CMP,
  ADMIN_DEL_STD,
  ADMIN_DEL_JOB,
  USER_ERR,
  GET_USER
} from "./types";

//Get profile by id
export const getUserById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/user/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
export const deleteStd = id => async dispatch => {
  try {
    await axios.delete(`api/admin/std/${id}`);
    dispatch({
      type: ADMIN_DEL_STD,
      payload: id
    });
    dispatch(setAlert("Student Deleted", "success"));
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
export const deleteCmp = id => async dispatch => {
  try {
    await axios.delete(`api/admin/cmp/${id}`);
    dispatch({
      type: ADMIN_DEL_CMP,
      payload: id
    });
    dispatch(setAlert("Company Deleted", "success"));
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
export const deleteJob = id => async dispatch => {
  try {
    await axios.delete(`api/admin/jobs/${id}`);
    dispatch({
      type: ADMIN_DEL_JOB
    });
    dispatch(setAlert("Job Deleted", "success"));
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
