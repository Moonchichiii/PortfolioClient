import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser, clearUser } from '../pages/auth/authSlice';
import { axiosInstance } from '../api/ApiConfig';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const saveTokens = (access_token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  const login = async (identifier, password, onSuccess) => {
    try {
      const response = await axiosInstance.post('auth/login/', {
        username: identifier,
        password,
      });
      const { user, profile, access_token, refresh_token } = response.data;
      dispatch(setUser({ user, profile, accessToken: access_token, refreshToken: refresh_token }));
      saveTokens(access_token);
      setError(null);
      if (onSuccess) onSuccess();
      navigate('/dashboard');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const register = async (userData, onSuccess) => {
    try {
      const response = await axiosInstance.post('auth/register/', userData);
      const { user, profile, access_token, refresh_token } = response.data;
      dispatch(setUser({ user, profile, accessToken: access_token, refreshToken: refresh_token }));
      saveTokens(access_token);
      setError(null);
      if (onSuccess) onSuccess();
      navigate('/dashboard');
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data || 'Registration failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('auth/logout/');
      dispatch(clearUser());
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.response?.data || 'Logout failed. Please try again.');
    }
  };

  return {
    login,
    register,
    logout,
    error,
  };
};

export default useAuth;
