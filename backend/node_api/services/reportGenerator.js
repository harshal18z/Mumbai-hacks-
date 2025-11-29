import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateReportFile(user, reportData) {
  const fileName = `report-${user._id}-${Date.now()}.pdf`;
  const filePath = path.join("reports", fileName);
  const pdf = new PDFDocument();

  pdf.pipe(fs.createWriteStream(filePath));

  pdf.fontSize(22).text("💼 PaisaPath Financial Report", { align: "center" });
  pdf.moveDown();

  pdf.fontSize(14).text(`User: ${user.name}`);
  pdf.text(`Email: ${user.email}`);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`);
  pdf.moveDown();

  pdf.text(`Total Income: ₹${reportData.income}`);
  pdf.text(`Total Expense: ₹${reportData.expense}`);
  pdf.text(`Savings Rate: ${reportData.savingsRate}%`);
  pdf.moveDown();

  pdf.text(`Top Spending Category: ${reportData.topCategory || "N/A"}`);
  pdf.text("Keep saving and growing 🌱");

  pdf.end();

  return filePath;
}
