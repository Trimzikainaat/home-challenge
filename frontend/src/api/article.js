import axios from 'axios';
import { API_URL } from '../constants/config';
import { LOCAL_STORAGE_KEY } from '../constants/config';


export const getArticles = async (formData) => {
    try {
      const { categories, sources, ...rest } = formData;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          ...rest,
          categories: categories.join(','),
          sources: sources.join(','),
        },
      };
  
      const authJwt = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      const token = authJwt ? authJwt.access_token : null;
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      const response = await axios.get(`${API_URL}/api/articles`, config);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  
  