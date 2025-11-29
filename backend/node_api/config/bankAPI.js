// bankAPI.js
export const BANK_API_CONFIG = {
  provider: "mock-bank",
  apiKey: process.env.BANK_API_KEY || "demo-api-key",
  baseUrl: "https://mockbank.example.com/api",
};

export const mockFetchTransactions = async (userId) => {
  // Simulated bank transactions
  return [
    { userId, date: "2025-11-01", description: "Salary", category: "Income", amount: 35000, type: "Income" },
    { userId, date: "2025-11-03", description: "Groceries", category: "Utilities", amount: 1200, type: "Expense" },
  ];
};
