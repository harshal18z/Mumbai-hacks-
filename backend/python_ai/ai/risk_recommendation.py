def generate_risk_profile(data):
    risk_tolerance = data.get("risk_tolerance", "medium")
    if risk_tolerance == "low":
        advice = "Focus on FDs, mutual funds, and emergency savings."
    elif risk_tolerance == "high":
        advice = "Consider SIPs, stocks, and index funds for long-term growth."
    else:
        advice = "Maintain a balance between safety and returns."

    return {
        "risk_tolerance": risk_tolerance,
        "recommendation": advice
    }
