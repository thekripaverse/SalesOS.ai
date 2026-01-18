def eligible_for_upsell(probability, size):
    return probability > 0.75 and size > 100
