import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

export default API;