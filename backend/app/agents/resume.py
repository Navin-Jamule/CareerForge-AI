from langchain_core.prompts import ChatPromptTemplate
from app.utils.llm import run_chain
from app.tools.google import google_search

def resume_agent(query: str) -> str:
    """
    Resume agent:
    Generates an ATS-friendly resume in Markdown format.
    """
    prompt = ChatPromptTemplate.from_template(
        "You are a resume expert. Generate a professional resume in markdown.\nDetails: {query}"
    )

    return run_chain(prompt, {"query": query}, tools=[google_search])
