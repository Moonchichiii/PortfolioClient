import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../api/ApiConfig';
import { clearUser, setAccessToken } from '../pages/auth/authSlice';

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const { isAuthenticated, accessToken, refreshToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    if (user?.id) {
      try {
        const response = await axiosInstance.get(`profiles/${user.id}/`);
        setProfile(response.data);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error fetching profile:', error);
        }
      }
    } else {
      console.error('User ID is undefined');
    }
  };

  const verifyToken = async () => {
    if (!accessToken && refreshToken) {
      try {
        const response = await axiosInstance.post('auth/token/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        dispatch(setAccessToken(access));
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        dispatch(clearUser());
      }
    } else if (accessToken) {
      try {
        await axiosInstance.post('auth/token/verify/', { token: accessToken });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const response = await axiosInstance.post('auth/token/refresh/', { refresh: refreshToken });
            const { access } = response.data;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            dispatch(setAccessToken(access));
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            dispatch(clearUser());
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
      verifyToken();

      const intervalId = setInterval(() => {
        verifyToken();
      }, 15 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, accessToken, refreshToken, dispatch, user]);

  const contextValue = useMemo(() => ({ profile }), [profile]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => useContext(CurrentUserContext);
