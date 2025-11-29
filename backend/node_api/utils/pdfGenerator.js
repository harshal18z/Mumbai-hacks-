import fs from "fs";
import PDFDocument from "pdfkit";

export function createSimplePDF(title, data) {
  const doc = new PDFDocument();
  const filePath = `reports/${title.replace(/\s/g, "_")}_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text(title, { align: "center" });
  doc.moveDown();

  Object.entries(data).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key}: ${value}`);
  });

  doc.end();
  return filePath;
}
