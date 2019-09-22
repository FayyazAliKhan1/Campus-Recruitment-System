import axios from "axios";
import { GET_COMP, GET_APP, GET_STD, USER_ERR } from "./types";
//get companies
export const getCompanies = () => async dispatch => {
  try {
    const res = await axios.get("/api/companies");
    dispatch({
      type: GET_COMP,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
//get Students
export const getStudents = () => async dispatch => {
  try {
    const res = await axios.get("/api/students");
    dispatch({
      type: GET_STD,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// get applied stud
export const getAppStudents = () => async dispatch => {
  try {
    const res = await axios.get("/api/companies/applieds");
    dispatch({
      type: GET_APP,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
