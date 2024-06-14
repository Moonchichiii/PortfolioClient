import { axiosInstance } from '../api/ApiConfig';

export const fetchCsrfToken = async () => {
  try {
    const response = await axiosInstance.get('/csrf/');
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};