import axios from "./axios";

export const login = (email, password) => axios.post("/auth/login", { email, password });
export const register = (payload) => axios.post("/auth/register", payload);
export const me = () => axios.get("/auth/me");
