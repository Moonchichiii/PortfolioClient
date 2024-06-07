import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      console.log('User set:', state.user);
      console.log('Token set:', state.token);
      console.log('Authentication status:', state.isAuthenticated);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      console.log('User cleared:', state.user);
      console.log('Authentication status:', state.isAuthenticated);
      console.log('Token cleared:', state.token);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
