import axios from 'axios';
import config from '../config';

const backoff = (index: number) => 1000 * Math.pow(2, index);

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    _index?: number;
  }
}

const wait = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

const axiosConfig = {
  baseURL: config.API_URL,
  timeout: 1000,
  _index: 0,
};

const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error && originalRequest._retry) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest.index;
        //   const access_token = await refreshAccessToken();
        //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return instance(originalRequest);
      }

      if (originalRequest._index < 5) {
        originalRequest._index = originalRequest._index + 1;
        console.log(
          'error waiting',
          backoff(originalRequest._index),
          originalRequest._index,
        );
        await wait(backoff(originalRequest._index));
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
