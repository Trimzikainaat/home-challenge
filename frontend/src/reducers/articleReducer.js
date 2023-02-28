import { FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE, SET_ARTICLE_FILTERS } from '@/constants/actionTypes';

const initialState = {
  loading: false,
  articles: [],
  page: 1,
  limit: 9,
  error: null,
  formData: {
    keywords: '',
    from: null,
    categories: [],
    sources: []
  }
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error:null
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        articles: [...state.articles, ...action.payload.data]
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        page: 1,
        error: action.payload
      };
    case SET_ARTICLE_FILTERS:
      return {
        ...state,
        page:1,
        articles:[],
        error:null,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default articleReducer;
