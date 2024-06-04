import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../pages/auth/authSlice';
import { axiosInstance } from '../api/ApiConfig';
import { useState } from 'react';

const useAuth = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/api/auth/login/', { email, password });
            dispatch(setUser(response.data.user));
        } catch (err) {
            setError(err.response.data);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axiosInstance.post('/api/auth/register/', userData);
            dispatch(setUser(response.data.user));
        } catch (err) {
            setError(err.response.data);
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/api/auth/logout/');
            dispatch(clearUser());
        } catch (err) {
            console.error(err);
        }
    };

    return {
        login,
        register,
        logout,
        error
    };
};

export default useAuth;
