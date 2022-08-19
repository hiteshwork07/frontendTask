import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import Cookies from "js-cookie";

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 24 * 60 * 60 * 1000,
});

const getToken = (name = "token") => {
  return "key4v56MUqVr9sNJv";
};

const Axios = axios.create({
  baseURL: "",
  timeout: 80000,
  adapter: cache.adapter,
});

Axios.interceptors.request.use(
  async (config) => {
    const token = getToken("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export { Axios };
