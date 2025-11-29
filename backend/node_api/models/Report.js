import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    period: { type: String, enum: ["Weekly", "Monthly"], default: "Monthly" },
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    savingsRate: { type: Number, default: 0 },
    topCategory: String,
    reportFile: String, // path to PDF
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
