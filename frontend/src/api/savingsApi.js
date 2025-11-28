import axios from "./axios";

export const getSavingsTips = (userId = "me") => axios.post(`/savings/tips`, { userId });
