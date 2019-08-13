import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
//Register Company
export const register = ({
  name,
  email,
  password,
  website,
  number,
  country,
  city,
  description,
  address
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    name,
    email,
    password,
    website,
    number,
    country,
    city,
    description,
    address
  });
  try {
    const res = await axios.post("/api/companies", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
//Register Students
export const registers = ({
  name,
  email,
  password,
  qualification,
  age,
  mobile,
  skills,
  address
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    name,
    email,
    password,
    qualification,
    age,
    mobile,
    skills,
    address
  });
  try {
    const res = await axios.post("/api/students", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
