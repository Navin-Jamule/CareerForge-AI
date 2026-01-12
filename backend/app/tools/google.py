from langchain_community.utilities import GoogleSearchAPIWrapper
from langchain.tools import tool

@tool
def google_search(query: str) -> str:
    """
    Google search tool used by agents to fetch up-to-date information.
    This is invoked by the LLM via tool-calling.
    """
    return GoogleSearchAPIWrapper().run(query)
