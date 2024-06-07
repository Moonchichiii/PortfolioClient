import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

console.log('store:', store.getState()); // Log the initial state of the store

store.subscribe(() => {
  console.log('store:', store.getState()); // Log the updated state whenever there is a change
});

export default store;
