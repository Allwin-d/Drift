import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {   //config is a callback function ,
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  //we are sending token in every api call .
    }
    return config;
  },
  (error) => Promise.reject(error),   //error is a callback function it gets executed if there is some issue with the response
);

export default api;
