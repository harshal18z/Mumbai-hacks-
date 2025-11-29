import random

def predict_next_month(data):
    expenses = data.get("expenses", 0)
    projected = round(expenses * random.uniform(1.02, 1.15), 2)
    return {
        "predicted_expense": projected,
        "message": "Based on past trends, your next month’s expenses may rise slightly."
    }
