import axios from "./axios";

export const getProfile = (userId = "me") => axios.get(`/users/${userId}`);
export const updateProfile = (userId = "me", data) => axios.put(`/users/${userId}`, data);
