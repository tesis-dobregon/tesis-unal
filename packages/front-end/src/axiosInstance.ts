import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:3000',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
});

// Add a request interceptor to include the bearer token in all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
