import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Food", "Utilities", "Entertainment", "Income", "Other"], default: "Other" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Income", "Expense"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
