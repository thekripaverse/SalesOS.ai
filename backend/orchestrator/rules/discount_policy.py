def discount_policy(company_size):
    if company_size >= 500:
        return {"max_discount": 5}
    elif company_size >= 100:
        return {"max_discount": 10}
    return {"max_discount": 15}
