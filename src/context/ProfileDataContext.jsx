import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../api/ApiConfig';

const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/profile/');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [isAuthenticated]);

    return (
        <ProfileDataContext.Provider value={{ profile }}>
            {children}
        </ProfileDataContext.Provider>
    );
};

export const useProfileData = () => useContext(ProfileDataContext);
