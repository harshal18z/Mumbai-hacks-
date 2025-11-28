import axios from "./axios";

export const getBudget = (userId = "me") => axios.get(`/budget/${userId}`);
export const getRecommendedBudget = (userId = "me") => axios.post(`/budget/recommend`, { userId });
export const saveBudget = (payload) => axios.post(`/budget/save`, payload);
