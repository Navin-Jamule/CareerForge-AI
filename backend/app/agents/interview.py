from langchain_core.prompts import ChatPromptTemplate
from app.utils.llm import run_chain
from app.tools.google import google_search

def interview_agent(query: str) -> str:
    """
    Interview agent:
    Generates interview questions and preparation material.
    """
    prompt = ChatPromptTemplate.from_template(
        "Generate interview questions and preparation points for:\n{query}"
    )

    return run_chain(prompt, {"query": query}, tools=[google_search])
