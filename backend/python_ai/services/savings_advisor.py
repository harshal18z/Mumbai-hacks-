def get_saving_tips(data):
    goals = data.get("goals", [])
    tips = []

    if not goals:
        tips.append("Set a savings goal — even a small one matters!")
    else:
        tips.append("Automate transfers to your goal account weekly.")

    tips.append("Keep emergency savings worth 3–6 months of expenses.")
    return {"advice": tips}
