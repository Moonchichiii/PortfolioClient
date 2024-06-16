import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../api/ApiConfig';
import { clearUser, setUser } from '../pages/auth/authSlice';

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('profiles/me/');
      setProfile(response.data);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error fetching profile:', error);
      }
    }
  };

  const verifyToken = async () => {
    if (!token) {
      const refresh_token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt_refresh_token'))
        ?.split('=')[1];

      if (refresh_token) {
        try {
          const response = await axiosInstance.post('auth/token/refresh/', {
            refresh: refresh_token,
          });
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          dispatch(setUser({ user: response.data.user, token: response.data.access }));
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          dispatch(clearUser());
        }
      }
    } else {
      try {
        await axiosInstance.post('auth/token/verify/', { token });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const refresh_token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('jwt_refresh_token'))
            ?.split('=')[1];
          try {
            const response = await axiosInstance.post('auth/token/refresh/', { refresh: refresh_token });
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            dispatch(setUser({ user: response.data.user, token: response.data.access }));
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
  }, [isAuthenticated, token, dispatch]);

  const contextValue = useMemo(() => ({ profile }), [profile]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => useContext(CurrentUserContext);
