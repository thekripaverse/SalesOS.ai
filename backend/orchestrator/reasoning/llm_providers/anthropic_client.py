import anthropic
client = anthropic.Anthropic()

def run_anthropic(prompt):
    msg = client.messages.create(
        model="claude-3-opus-20240229",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return msg.content[0].text
