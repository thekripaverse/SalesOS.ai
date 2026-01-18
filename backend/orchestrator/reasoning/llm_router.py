from reasoning.llm_providers.groq_client import run_groq

LLMS = [
    ("groq", run_groq)
]

def run_llm(prompt):
    """
    Unified LLM entrypoint.
    Currently forced to GROQ only.
    """
    try:
        response = run_groq(prompt)
        return response, "groq"
    except Exception as e:
        raise RuntimeError(f"GROQ failed: {e}")