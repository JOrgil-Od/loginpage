import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../constants/defaultValues";
import tokenAxios from "../../helpers/tokenAxios";

export const login = createAsyncThunk("users/login", async (data, store) => {
  const response = await axios.post(`${apiUrl}/users/login`, data);
  return response;
});

export const logout = createAsyncThunk("users/logout", async (id, store) => {
  const response = await tokenAxios.get(`${apiUrl}/users/logout`);
  return response;
});
