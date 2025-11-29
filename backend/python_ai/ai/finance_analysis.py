def get_financial_summary(data):
    income = data.get("income", 0)
    expenses = data.get("expenses", 0)
    savings = income - expenses
    savings_rate = (savings / income * 100) if income else 0

    advice = "Good job! You’re saving well." if savings_rate > 20 else "Try to save more this month."
    
    return {
        "income": income,
        "expenses": expenses,
        "savings": savings,
        "savings_rate": round(savings_rate, 2),
        "advice": advice
    }
