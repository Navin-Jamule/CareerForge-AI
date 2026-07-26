# backend/app/agents/resume.py

from langchain_core.prompts import ChatPromptTemplate
from app.utils.llm import run_chain


def resume_agent(query: str) -> str:
    """
    Resume agent:
    Generates a complete, ATS-friendly resume in LaTeX format
    from the candidate details provided in the query.

    Follows the same pattern as learn_agent/interview_agent:
    single prompt -> run_chain -> string response.
    No external tools needed (resume writing doesn't require
    live web data like job_agent does).
    """
    prompt = ChatPromptTemplate.from_template(
        """
        You are an expert resume writer and LaTeX typesetter.

        Using ONLY the candidate details provided below, generate a
        complete, compilable LaTeX resume. Requirements:

        - Standalone .tex document (\\documentclass{{article}}),
          using only common packages: geometry, enumitem, titlesec,
          hyperref. No external .cls files.
        - Single column, clean, ATS-friendly layout.
        - Include only the sections supported by the given details
          (e.g. Contact, Summary, Skills, Experience, Projects,
          Education) — skip sections with no data.
        - Bullet points: concise, action-verb-led, quantified where
          the input supports it.
        - Do NOT invent companies, dates, numbers, or skills not
          present in the input.
        - Output ONLY raw LaTeX code — no explanations, no markdown
          fences, no commentary before or after.

        Candidate Details:
        {query}
        """
    )

    return run_chain(prompt, {"query": query})
