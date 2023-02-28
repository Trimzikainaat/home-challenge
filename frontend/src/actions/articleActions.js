import { getArticles } from '../api/article';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    SET_ARTICLE_FILTERS

} from '@/constants/actionTypes';


export const fetchArticles = (formData) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ARTICLES_REQUEST});
        const articles = await getArticles(formData);
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: articles });
    } catch (error) {
        dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error });
    }
};


export const updateFormData = (formData) => async(dispatch) => {

    try {
        dispatch({ type: SET_ARTICLE_FILTERS, payload: formData });
        dispatch({ type: FETCH_ARTICLES_REQUEST});
        const articles = await getArticles(formData);
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: articles });
    } catch (error) {
        dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error });
    }
   
};


