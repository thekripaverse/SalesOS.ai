# redis_client.py
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)
STREAM = "sales_events"

def publish_event(event: dict):
    r.xadd(STREAM, event)

def consume_events(last_id):
    return r.xread({STREAM: last_id}, block=5000)
