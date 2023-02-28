import { login as apiLogin, register as apiRegister, verifyToken } from '../api/auth';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST
  } from '@/constants/actionTypes';

  
export const register = (username, password) => async (dispatch) => {
    try {
      const { token, user } = await apiRegister(username, password);
      const payload = { token, user };
      dispatch({ type: REGISTER_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error });
    }
  };
export const login = (email, password) => async (dispatch) => {
  try {
    const { access_token, user } = await apiLogin(email, password);
    const payload = { access_token, user };
    dispatch({ type: LOGIN_REQUEST, payload });
    dispatch({ type: LOGIN_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const verify = (token) => async (dispatch) => {
  try {
    const {access_token, user} = await verifyToken(token);
    const payload = { access_token, user };
    dispatch({ type: LOGIN_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};