import { createSlice } from "@reduxjs/toolkit";

export interface AuthSlice {
  signup: object | null;
  login: { token?: string; user?: any };
  logout: boolean;
}

const initialState: AuthSlice = {
  signup: null,
  login: {},
  logout: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpReducer: (state, action) => {
      state.signup = action.payload;
    },
    loginReducer: (state, action) => {
      state.login = action.payload;
    },
    logoutReducer: (state) => {
      state.signup = {};
      state.login = {};
      state.logout = true;
    },
  },
});

export const { loginReducer, logoutReducer, signUpReducer } = authSlice.actions;

export default authSlice.reducer;
