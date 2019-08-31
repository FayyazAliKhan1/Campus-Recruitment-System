import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load Student and Company
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
//load Company
// export const loadUser = () => async dispatch => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get("/api/authc");
//     dispatch({ type: COMPANY_LOADED, payload: res.data });
//   } catch (error) {
//     dispatch({ type: AUTH_ERROR });
//   }
// };
//load Admin
// export const loadUsera = () => async dispatch => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get("/api/autha");
//     dispatch({ type: ADMIN_LOADED, payload: res.data });
//   } catch (error) {
//     dispatch({ type: AUTH_ERROR });
//   }
// };
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
    dispatch(loadUser());
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
    dispatch(loadUser());
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
//Login Students and company
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    email,
    password
  });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
//Login Companyy
// export const loginc = (email, password) => async dispatch => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({
//     email,
//     password
//   });
//   try {
//     const res = await axios.post("/api/authc", body, config);
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });
//     dispatch(loadUser());
//   } catch (error) {
//     const errors = error.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };
export const logout = () => dispatch => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
