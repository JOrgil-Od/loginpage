import { combineReducers } from "@reduxjs/toolkit";
import user from "./auth/authSlice";

const reducers = combineReducers({
  user,
});

export default reducers;
