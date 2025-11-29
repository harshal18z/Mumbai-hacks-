import mongoose from "mongoose";

const savingsPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    description: String,
    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("SavingsPlan", savingsPlanSchema);
