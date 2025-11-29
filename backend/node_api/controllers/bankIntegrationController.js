import { mockFetchTransactions } from "../config/bankAPI.js";
import Transaction from "../models/Transaction.js";

export const linkBank = async (req, res) => {
  res.json({ message: "Mock bank linked successfully!" });
};

export const importMockTransactions = async (req, res) => {
  try {
    const data = await mockFetchTransactions(req.user.id);
    const added = await Transaction.insertMany(data);
    res.json({ message: "Bank transactions imported", count: added.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to import bank transactions" });
  }
};
