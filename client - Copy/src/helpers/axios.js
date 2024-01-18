import axios from 'axios';
import { apiUrl } from '../constants/defaultValues';

const myAxios = axios.create({
  withCredentials:true,
  baseURL:apiUrl,
  credentials:'include'
});

export default myAxios;
