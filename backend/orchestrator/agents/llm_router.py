"""
Unified LLM router for agents.
HuggingFace removed.
Groq used as the backend LLM.
"""

from reasoning.llm_router import run_llm


def generate(prompt: str, system: str | None = None) -> str:
    """
    Generate text using Groq LLM.
    Compatible with existing agents.
    """
    if system:
        full_prompt = f"{system}\n{prompt}"
    else:
        full_prompt = prompt

    response, provider = run_llm(full_prompt)
    return response
