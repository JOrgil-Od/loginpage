import axios from "axios";
import { apiUrl } from "../constants/defaultValues";

// LocalstorageService
import LocalStorageService from "./LocalStorageService";
const myAxios = axios.create();

//add base url
myAxios.defaults.baseURL = apiUrl;

// Add a request interceptor
myAxios.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default myAxios;
