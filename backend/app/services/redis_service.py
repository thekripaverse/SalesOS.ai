import redis, json
from app.config import REDIS_HOST, REDIS_PORT

def publish_event(event_type, lead_id, payload={}):
    try:
        r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
        r.publish(
            "sales_events",
            json.dumps({
                "type": event_type,
                "lead_id": str(lead_id),
                "payload": payload
            })
        )
    except Exception as e:
        # Redis is optional — do not crash backend
        print("Redis not available:", e)
