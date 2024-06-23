import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, profile, accessToken, refreshToken } = action.payload;
      state.user = user;  
      state.profile = profile;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
});

export const { setUser, clearUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
