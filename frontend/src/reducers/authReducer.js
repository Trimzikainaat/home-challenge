import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_FAILURE } from '../constants/actionTypes';
import { LOCAL_STORAGE_KEY } from '../constants/config';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error:null,
        loading: true,
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        error:null,
        loading: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
      return {
        ...state,
        loading:false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.access_token,
        error: null,
      };
    case LOGIN_FAILURE,
         REGISTER_FAILURE:
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return {
        ...state,
        loading:false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return {
        ...state,
        loading:false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;