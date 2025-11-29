import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Transaction from "../models/Transaction.js";

export const generateAndEmailReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions.filter(t => t.type === "Income").reduce((a, b) => a + b.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "Expense").reduce((a, b) => a + b.amount, 0);

    const pdf = new PDFDocument();
    const filePath = path.join("reports", `report-${userId}.pdf`);
    pdf.pipe(fs.createWriteStream(filePath));

    pdf.fontSize(20).text("PaisaPath Financial Report", { align: "center" });
    pdf.text(`Total Income: ₹${totalIncome}`);
    pdf.text(`Total Expense: ₹${totalExpense}`);
    pdf.text(`Net Savings: ₹${totalIncome - totalExpense}`);
    pdf.end();

    res.json({ message: "Report generated successfully", filePath });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};
