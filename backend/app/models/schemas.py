from pydantic import BaseModel
from typing import List, Optional


class BriefRequest(BaseModel):
    topic: str
    articles: List[str]


class ChatRequest(BaseModel):
    briefing_text: str
    persona: str
    question: str


class ExplainerRequest(BaseModel):
    briefing_text: str
    language: str  # tamil or hindi


class TimelineRequest(BaseModel):
    topic: str
    articles: List[str]


class KeyPlayersRequest(BaseModel):
    topic: str
    briefing_text: str
