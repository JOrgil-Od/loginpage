import axios from "axios";
import { apiUrl } from "../constants/defaultValues";
// LocalstorageService
import LocalStorageService from "./LocalStorageService";
const localStorageService = LocalStorageService.getService();
const myAxios = axios.create();
//add base url

myAxios.defaults.baseURL = apiUrl;

// Add a request interceptor
myAxios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      console.log("endeees token");
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

myAxios.interceptors.response.use(
  (response) => {
    console.log("response");
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (originalRequest.url === "/authenticate" ||
        originalRequest.url === "/refresh-token")
    ) {
      //    router.push('/login');
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest.url === "/users/currentUser"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("401 from masaxios response filters", originalRequest.url);
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return myAxios
        .post("/refresh-token", {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorageService.setToken({
              access_token: res.data.accessToken,
              refresh_token: res.data.refreshToken,
            });
            myAxios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.accessToken;
            return myAxios(originalRequest);
          } else {
            console.log("refresh_token status: ", res.status);
          }
        })
        .catch((err) => {
          console.log("error n : ", err.response.status);
          LocalStorageService.clearToken();
          window.location.href = "/hrs/user/login";
        });
    }
    return Promise.reject(error);
  }
);
export default myAxios;
