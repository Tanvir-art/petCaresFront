import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  email: string;
  role: string;
}

const initialState: AuthState = {
  token: "",
  email: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;
      // Store in local storage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("role", action.payload.role);
    },
    clearCredentials: (state) => {
      state.token = "";
      state.email = "";
      state.role = "";
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
