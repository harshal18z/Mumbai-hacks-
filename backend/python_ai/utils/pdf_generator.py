from fpdf import FPDF

def create_pdf(filename, data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(200, 10, "PaisaPath Financial Report", ln=True, align="C")

    pdf.set_font("Arial", size=12)
    for key, value in data.items():
        pdf.cell(200, 10, f"{key}: {value}", ln=True)
    
    pdf.output(f"reports/{filename}")
