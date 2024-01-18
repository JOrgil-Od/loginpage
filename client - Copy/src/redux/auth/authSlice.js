import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../helpers/LocalStorageService";
import { login, logout } from "./authService";

const initialState = {
  loading: false,
  isAuth: false,
  error: "",
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      let defaultPath = action.payload.roles?.filter(
        (role) => role.menu
      )?.[0].path;
      state.data = {...action.payload,defaultPath};
      state.loading = false;
      state.isAuth = true;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = "";
        state.isAuth = false;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload.data;

        LocalStorageService.setToken({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        let defaultPath = action.payload.data.user.roles?.filter(
          (role) => role.menu
        )?.[0].path;
        state.data = { ...user, accessToken, refreshToken, defaultPath };
        state.loading = false;
        state.isAuth = true;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        if (action.error.message.indexOf(401)) {
        } else if (action.error.message.indexOf(500)) {
        }
        state.loading = false;
        state.isAuth = false;
        state.error = action.error;
      })
      .addCase(logout.pending, (state, payload) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.data = {};
        state.error = "";
        LocalStorageService.clearToken();
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logOut, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
export const loggedUser = (state) => state.data;
