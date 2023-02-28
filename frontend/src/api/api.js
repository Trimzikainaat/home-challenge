import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;