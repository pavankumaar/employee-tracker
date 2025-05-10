import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
  // In production (Vercel), use relative URLs
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  // In development, use the environment variable or fallback to localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

export default API;