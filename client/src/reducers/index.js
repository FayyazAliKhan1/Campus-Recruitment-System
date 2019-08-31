import { combineReducers } from "redux";
import alert from "./alert";
import jobs from "./jobs";
import authReducer from "./authReducer";
export default combineReducers({
  alert,
  authReducer,
  jobs
});
