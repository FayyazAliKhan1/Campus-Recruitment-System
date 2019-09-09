import axios from "axios";
import { setAlert } from "./alert";
import { GET_JOBS, JOB_ERROR } from "./types";
export const getCurrentJob = () => async dispatch => {
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
