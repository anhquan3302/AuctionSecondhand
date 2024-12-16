import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const data = action.payload.data;
      if (data) {
        const { user, token, refresh_token } = data;
        state.user = user;
        state.token = token;
        state.refreshToken = refresh_token;
        //save token in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
      }
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) =>
  state.auth.user?.fullName || "Guest";

export const selectCurrentUserAPI = (state) =>
    state.auth.user || "Guest";

export const selectCurrentToken = (state) => state.auth.token;
//export const selectCurrentRole = (state) => state.auth.user.role;
export const selectCurrentRole = (state) => state.auth?.user?.role || null;
export const selectIsLoggedIn = (state) => !!state.auth.token;