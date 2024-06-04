import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../pages/auth/authSlice';
import { axiosInstance } from '../api/ApiConfig';

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/api/auth/user/');
                dispatch(setUser(response.data));
            } catch (error) {
                dispatch(clearUser());
            }
        };

        checkAuth();
    }, [dispatch]);

    return (
        <CurrentUserContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
