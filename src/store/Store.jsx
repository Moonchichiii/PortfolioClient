// store/Store.js

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'; // Import Redux-Logger
import authReducer from '../pages/auth/authSlice';

// Create Redux-Logger middleware
const loggerMiddleware = createLogger();

// Configure Redux store with Redux-Logger middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware), 
});

export default store;
