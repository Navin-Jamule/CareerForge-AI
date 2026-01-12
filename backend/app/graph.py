from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.prompts import ChatPromptTemplate

from app.agents.learn import learn_agent
from app.agents.resume import resume_agent
from app.agents.interview import interview_agent
from app.agents.job import job_agent
from app.utils.llm import run_chain

# -------------------------------
# State definition for LangGraph
# -------------------------------
class State(TypedDict):
    query: str
    category: str
    response: str

# -------------------------------
# Query categorization node
# -------------------------------
def categorize(state: State):
    """
    Classifies user intent into a fixed category.
    Structured output avoids fragile string matching.
    """
    prompt = ChatPromptTemplate.from_template(
        """
        Classify the user query into ONE category only:
        - learn
        - resume
        - interview
        - job

        Respond ONLY with the category name.

        Query: {query}
        """
    )

    category = run_chain(prompt, {"query": state["query"]}).strip().lower()
    return {"category": category}

# -------------------------------
# Routing logic
# -------------------------------
def route_query(state: State):
    if state["category"] == "learn":
        return "learn"
    if state["category"] == "resume":
        return "resume"
    if state["category"] == "interview":
        return "interview"
    if state["category"] == "job":
        return "job"
    return END

# -------------------------------
# LangGraph construction
# -------------------------------
graph = StateGraph(State)

graph.add_node("categorize", categorize)
graph.add_node("learn", lambda s: {"response": learn_agent(s["query"])})
graph.add_node("resume", lambda s: {"response": resume_agent(s["query"])})
graph.add_node("interview", lambda s: {"response": interview_agent(s["query"])})
graph.add_node("job", lambda s: {"response": job_agent(s["query"])})

graph.set_entry_point("categorize")
graph.add_conditional_edges("categorize", route_query)

graph.add_edge("learn", END)
graph.add_edge("resume", END)
graph.add_edge("interview", END)
graph.add_edge("job", END)

# Compiled LangGraph app
app = graph.compile()
