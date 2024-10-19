import { createSlice } from "@reduxjs/toolkit";

// Get the user and token from localStorage if available
const userFromStorage = JSON.parse(localStorage.getItem("authUser"));
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage || null, // Load from localStorage if present
  token: tokenFromStorage || null, // Load token from localStorage if present
  role: userFromStorage?.role || "candidate",
  isAuthenticated: !!tokenFromStorage, // Set to true if token is available
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;

      // Save user and token in localStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      // Remove user and token from localStorage
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
