import requests
from app.config import SALESFORCE_CLIENT_ID, SALESFORCE_CLIENT_SECRET, SALESFORCE_REDIRECT_URI

SALESFORCE_AUTH_URL = "https://login.salesforce.com/services/oauth2/token"
SALESFORCE_API_BASE = "https://your-instance.my.salesforce.com/services/data/v57.0"

def get_access_token(auth_code):
    """
    OAuth exchange (demo version)
    """
    payload = {
        "grant_type": "authorization_code",
        "client_id": SALESFORCE_CLIENT_ID,
        "client_secret": SALESFORCE_CLIENT_SECRET,
        "redirect_uri": SALESFORCE_REDIRECT_URI,
        "code": auth_code
    }
    response = requests.post(SALESFORCE_AUTH_URL, data=payload)
    return response.json()


def fetch_salesforce_leads(access_token):
    """
    Pull leads from Salesforce
    """
    headers = {"Authorization": f"Bearer {access_token}"}
    query = "SELECT Id, Name, Company, Industry FROM Lead LIMIT 10"

    response = requests.get(
        f"{SALESFORCE_API_BASE}/query",
        headers=headers,
        params={"q": query}
    )
    return response.json()


def update_opportunity(access_token, opportunity_id, payload):
    """
    Push agent updates back to Salesforce
    """
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    response = requests.patch(
        f"{SALESFORCE_API_BASE}/sobjects/Opportunity/{opportunity_id}",
        headers=headers,
        json=payload
    )
    return response.status_code
