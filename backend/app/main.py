from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.schemas.request import QueryRequest
from app.graph import app as agent_graph

load_dotenv()

app = FastAPI(title="Career Guide AI Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query")
def run_query(req: QueryRequest):
    """
    Single entry point for frontend.
    Accepts user query and returns agent response.
    """
    return agent_graph.invoke({"query": req.query})
