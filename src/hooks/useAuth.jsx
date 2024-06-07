import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../pages/auth/authSlice';
import { axiosInstance } from '../api/ApiConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const saveTokens = (access_token, refresh_token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    document.cookie = `jwt_refresh_token=${refresh_token}; path=/; secure; httponly`;
  };

  const login = async (identifier, password, onSuccess) => {
    try {
      const response = await axiosInstance.post('auth/login/', { username: identifier, password });
      const { user, access_token, refresh_token } = response.data;
      dispatch(setUser({ user, token: access_token }));
      setError(null);
      saveTokens(access_token, refresh_token);
      if (onSuccess) onSuccess();
      navigate('/dashboard');
      return true;
    } catch (err) {
      setError(err.response?.data || 'Login failed');
      return false;
    }
  };

  const register = async (userData, onSuccess) => {
    try {
      const response = await axiosInstance.post('auth/register/', userData);
      const { user, access_token, refresh_token } = response.data;
      dispatch(setUser({ user, token: access_token }));
      setError(null);
      saveTokens(access_token, refresh_token);
      if (onSuccess) onSuccess();
      navigate('/dashboard');
      return true;
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('auth/logout/');
      dispatch(clearUser());
      navigate('/');
    } catch (err) {
      console.error(err);
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
