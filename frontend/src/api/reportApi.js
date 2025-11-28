import axios from "./axios";

export const getMonthlySummary = (userId = "me", month) =>
  axios.get("/reports/summary", { params: { userId, month } });

export const generatePdf = (userId = "me", month) =>
  axios.get("/reports/pdf", { params: { userId, month }, responseType: "blob" });
