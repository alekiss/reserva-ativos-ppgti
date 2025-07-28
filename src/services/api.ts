import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void; config: AxiosRequestConfig }[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(promise => {
    return error ? promise.reject(error) : promise.resolve(api(promise.config));
  });
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: original });
        });
      }
      isRefreshing = true;
      try {
        await api.post('/v1/auth/refresh');
        processQueue(null);
        return api(original);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
