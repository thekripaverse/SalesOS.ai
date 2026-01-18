# These weights are INSPIRED by IBM churn behavior patterns

WEIGHTS = {
    "industry_match": 20,
    "company_size_fit": 15,
    "funded_company": 10,
    "email_opened": 10,
    "pricing_clicked": 20,
    "reply_received": 30
}

def calculate_behavior_score(events):
    score = 0

    if "email_opened" in events:
        score += WEIGHTS["email_opened"]

    if "pricing_clicked" in events:
        score += WEIGHTS["pricing_clicked"]

    if "reply_received" in events:
        score += WEIGHTS["reply_received"]

    return score