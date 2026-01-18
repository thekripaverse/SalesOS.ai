import pandas as pd

def load_data():
    companies = pd.read_csv("agents/mock_data/companies.csv")
    leads = pd.read_csv("agents/mock_data/leads.csv")
    events = pd.read_csv("agents/mock_data/events.csv")
    return companies, leads, events


def get_lead_bundle(lead_id):
    companies, leads, events = load_data()

    lead_row = leads[leads["lead_id"] == lead_id]
    if lead_row.empty:
        raise ValueError(f"Lead {lead_id} not found")

    lead = lead_row.iloc[0].to_dict()

    company_row = companies[companies["company_id"] == lead["company_id"]]
    if company_row.empty:
        raise ValueError(f"Company not found for lead {lead_id}")

    company = company_row.iloc[0].to_dict()
    lead_events = events[events["lead_id"] == lead_id]["event_type"].tolist()

    return lead, company, lead_events