def get_budget_plan(data):
    income = data.get("income", 0)
    plan = {
        "Essentials": round(income * 0.5, 2),
        "Wants": round(income * 0.3, 2),
        "Savings": round(income * 0.2, 2)
    }
    return {
        "plan": plan,
        "message": "Follow the 50-30-20 rule to balance spending and saving."
    }
