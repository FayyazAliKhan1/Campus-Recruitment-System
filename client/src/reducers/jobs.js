import {
  GET_JOBS,
  JOB_ERROR,
  POST_JOB,
  APPLY_JOB,
  DELETE_JOB,
  UPDATE_JOB
} from "../actions/types";
const initialState = {
  job: null,
  jobs: [],
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false
      };
    case POST_JOB:
    case APPLY_JOB:
    case UPDATE_JOB:
      return {
        ...state,
        job: payload,
        loading: false
      };
    case DELETE_JOB:
      return {
        ...state,
        job: null,
        jobs: null,
        loading: false
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
