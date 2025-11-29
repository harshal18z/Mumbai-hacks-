# python_ai/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import random

app = FastAPI()

class SavingsInput(BaseModel):
    income: float
    expenses: dict
    goals: list = []
    userProfile: dict = None

@app.post("/savings-advice/")
async def savings_advice(data: SavingsInput):
    income = data.income
    expenses = data.expenses
    total_expense = sum(expenses.values())
    savings = income - total_expense
    savings_rate = (savings / income) * 100 if income else 0

    # Simple AI-like pattern (simulate ML model)
    advice_patterns = [
        "Automate a fixed ₹2000 monthly saving",
        "Use UPI cashback offers to reduce digital spend",
        "Limit entertainment to 5% of income",
        "Start a small SIP or mutual fund investment",
        "Track daily expenses using PaisaPath dashboard",
        "Prioritize goal-based budgeting (like rent, study, transport)"
    ]

    top_spending = sorted(expenses, key=expenses.get, reverse=True)[:3]

    return {
        "income": income,
        "total_expense": total_expense,
        "savings": savings,
        "savings_rate": round(savings_rate, 2),
        "top_spending_categories": top_spending,
        "ml_recommendations": random.sample(advice_patterns, 3),
        "confidence_score": round(random.uniform(0.7, 0.95), 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
