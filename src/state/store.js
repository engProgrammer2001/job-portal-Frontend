import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import the auth slice

export const store = configureStore({
  reducer: {
    auth: authReducer,  // Add auth slice to the store
  },
});

export default store;