def categorize_transaction(description: str) -> str:
    description = description.lower()

    if any(x in description for x in ["food", "restaurant", "hotel"]):
        return "Food"
    if any(x in description for x in ["uber", "bus", "fuel", "petrol"]):
        return "Transport"
    if any(x in description for x in ["mobile", "recharge", "wifi"]):
        return "Utilities"
    if any(x in description for x in ["movie", "games", "fun"]):
        return "Entertainment"

    return "Other"
