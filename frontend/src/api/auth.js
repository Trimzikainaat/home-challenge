import axios from 'axios';
import { API_URL } from '../constants/config';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    }); 
    
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/refresh`, {
      token,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, password, email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };