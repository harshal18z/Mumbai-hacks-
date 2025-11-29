import Transaction from "../models/Transaction.js";

export const listTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, userId: req.user.id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
