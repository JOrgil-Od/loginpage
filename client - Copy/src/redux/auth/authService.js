import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../constants/defaultValues";
import tokenAxios from "../../helpers/tokenAxios";

export const login = createAsyncThunk("users/login", async (data, store) => {
  const response = await axios.post(`${apiUrl}/users/login`, data);
  return response;
  // const response = await fetch("https://172.30.30.20:8080/api/users/login", {
  //   credentials:'include',
  //   withCredentials:true,
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data),
  // })
  // return response.json();
});

export const logout = createAsyncThunk("users/logout", async (id, store) => {
  const response = await tokenAxios.get(`${apiUrl}/users/logout`);
  return response;
  // const res = await fetch("https://172.30.30.20:8080/api/users/logout", {
  //   credentials: "include",
  //   withCredentials: true,
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // return res;
});
