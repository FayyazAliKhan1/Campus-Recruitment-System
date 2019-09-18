import { combineReducers } from "redux";
import alert from "./alert";
import jobs from "./jobs";
import user from "./user";
// import admin from "./admin";
import profile from "./profile";
import auth from "./authReducer";
export default combineReducers({
  alert,
  auth,
  jobs,
  profile,
  user
  // admin
});
