import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3001/api",
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default instance;
