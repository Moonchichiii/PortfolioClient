import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosMultipart = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

// Add console logs for debugging
console.log('axiosInstance:', axiosInstance);
console.log('axiosMultipart:', axiosMultipart);

export { axiosInstance, axiosMultipart };
