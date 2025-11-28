import axios from "./axios";

export const listTransactions = () => axios.get("/transactions");
