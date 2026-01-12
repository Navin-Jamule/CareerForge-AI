import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.5
)

def run_chain(prompt, variables, tools=None) -> str:
    """
    Shared helper to execute prompt → LLM → response.
    Tool binding is optional.
    """
    model = llm.bind_tools(tools) if tools else llm
    chain = prompt | model
    return chain.invoke(variables).content
