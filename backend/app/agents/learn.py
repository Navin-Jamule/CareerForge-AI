from langchain_core.prompts import ChatPromptTemplate
from app.utils.llm import run_chain
from app.tools.google import google_search

def learn_agent(query: str) -> str:
    """
    Learning agent:
    Generates tutorials or explanations for a given topic.
    """
    prompt = ChatPromptTemplate.from_template(
        "Write a clear and structured tutorial with examples.\nTopic: {query}"
    )

    return run_chain(prompt, {"query": query}, tools=[google_search])
