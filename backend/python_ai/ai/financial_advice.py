import random

TIPS = [
    "Set aside 20% of your income for savings.",
    "Review your subscriptions monthly.",
    "Avoid impulse online purchases.",
    "Automate bill payments to prevent late fees.",
    "Invest small, but regularly."
]

def generate_advice(data):
    return random.choice(TIPS)
