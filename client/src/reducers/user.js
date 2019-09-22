import {
  GET_COMP,
  GET_APP,
  GET_STD,
  USER_ERR,
  ADMIN_DEL_CMP,
  ADMIN_DEL_STD,
  ADMIN_DEL_JOB,
  GET_USER
} from "../actions/types";
const initialState = {
  cmps: [],
  stds: [],
  apps: [],
  user: null,
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMP:
      return {
        ...state,
        cmps: payload,
        loading: false
      };
    case GET_STD:
      return {
        ...state,
        stds: payload,
        loading: false
      };
    // case GET_USER:
    //   return {
    //     ...state,
    //     user: payload,
    //     loading: false
    //   };
    case GET_APP:
      return {
        ...state,
        apps: payload,
        loading: false
      };
    case ADMIN_DEL_CMP:
      return {
        ...state,
        cmps: state.cmps.filter(cp => cp._id !== payload),
        loading: false
      };
    case ADMIN_DEL_STD:
      return {
        ...state,
        stds: state.stds.filter(st => st._id !== payload),
        loading: false
      };
    // case ADMIN_DEL_CMP:
    // case ADMIN_DEL_STD:
    // case ADMIN_DEL_JOB:
    //   return {
    //     ...state,
    //     user: payload,
    //     loading: false
    //   };

    case USER_ERR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
