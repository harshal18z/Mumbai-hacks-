def clean_transaction_data(transactions):
    cleaned = []
    for t in transactions:
        if not t.get("amount"):
            continue
        t["amount"] = abs(float(t["amount"]))
        cleaned.append(t)
    return cleaned
