import axios, { AxiosRequestConfig } from 'axios';

// axios class init with env variable base url = http://localhost:8000
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// axios get, post, put, delete methods
const get = (url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get(url, config);
const post = (url: string, data: any, config?: AxiosRequestConfig) =>
  axiosInstance.post(url, data, config);
const put = (url: string, data: any, config?: AxiosRequestConfig) =>
  axiosInstance.put(url, data, config);
const del = (url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete(url, config);

export default {
  network: {
    get,
    post,
    put,
    del,
  },
};
