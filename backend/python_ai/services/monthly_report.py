from utils.pdf_generator import create_pdf
from datetime import datetime

def generate_pdf_summary(data):
    report_name = f"financial_report_{datetime.now().strftime('%Y%m%d_%H%M')}.pdf"
    report_data = {
        "Income": data.get("income", 0),
        "Expenses": data.get("expenses", 0),
        "Savings Rate": f"{(1 - data.get('expenses', 0)/data.get('income', 1)) * 100:.2f}%",
    }
    create_pdf(report_name, report_data)
    return {"report_file": report_name, "status": "generated"}
