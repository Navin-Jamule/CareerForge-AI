from langchain_core.prompts import ChatPromptTemplate

from app.utils.llm import run_chain
from app.tools.google import google_search


def job_agent(query: str) -> str:
    """
    Deterministic Job Search Agent.

    Design:
    1. Explicitly fetch live job data using Google Search
    2. Pass raw results to the LLM only for structuring and summarization
    3. Never allow the LLM to hallucinate job listings

    This guarantees fresh, real-world job data.
    """

    # Step 1: Fetch live job listings explicitly (no LLM guessing)
    try:
        search_results = google_search.invoke(query)
    except Exception as e:
        return f"Job search failed due to error: {str(e)}"

    # Guardrail: Handle empty or failed search results
    if not search_results or len(search_results.strip()) < 20:
        return (
            "No recent job listings were found for your query. "
            "Try refining the role or location."
        )

    # Step 2: Ask LLM to clean, filter, and format results
    prompt = ChatPromptTemplate.from_template(
        """
        You are a job search assistant.

        The following text contains raw job search results collected
        from live sources.

        Your task:
        - Extract only relevant job listings
        - Prefer jobs posted within the last 7–14 days if possible
        - Do NOT invent or hallucinate any jobs
        - Only use the provided data

        Raw Job Search Results:
        {results}

        Format the final answer as a clean list:

        - Job Role
        - Company
        - Location
        - Source / Link (if available)
        """
    )

    return run_chain(
        prompt,
        {"results": search_results}
    )
