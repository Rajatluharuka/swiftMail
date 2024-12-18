import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || "";
const email = localStorage.getItem("email") || "";
const initialAuthState = {
  isloggedIn: !!token,
  token,
  email,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isloggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.token = "";
      state.email = "";
      state.isloggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
