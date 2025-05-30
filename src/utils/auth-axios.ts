import axios from 'axios';
import { baseUrl } from './helper';

const authAxios = axios.create({
  baseURL: `${baseUrl}/`,
});

export const authorizationProvider = (store: any) => {
  authAxios.interceptors.request.use((config: any) => {
    const token = store.getState().login.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default authAxios;