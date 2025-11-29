import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    occupation: { type: String, enum: ["Student", "Employee", "Business", "Other"], default: "Other" },
    language: { type: String, default: "English" },
    coachPersona: { type: String, default: "Supportive" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
