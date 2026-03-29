from fastapi import APIRouter
from app.models.schemas import (
    BriefRequest,
    ChatRequest,
    ExplainerRequest,
    TimelineRequest,
    KeyPlayersRequest
)
from app.services.gemini_service import (
    generate_deep_brief,
    ask_story_ai,
    generate_explainer,
    generate_timeline,
    extract_key_players,
    clean_json_response
)

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/")
def ai_test():
    return {"message": "AI route working"}


@router.post("/generate-brief")
def generate_brief(data: BriefRequest):
    result = generate_deep_brief(data.topic, data.articles)
    return {
        "topic": data.topic,
        "briefing": result
    }


@router.post("/ask")
def ask_ai(data: ChatRequest):
    result = ask_story_ai(data.briefing_text, data.persona, data.question)
    return {
        "answer": result
    }


@router.post("/explainer")
def explainer(data: ExplainerRequest):
    result = generate_explainer(data.briefing_text, data.language)
    return {
        "language": data.language,
        "explainer": result
    }


@router.post("/timeline")
def timeline(data: TimelineRequest):
    result = generate_timeline(data.topic, data.articles)
    return {
        "topic": data.topic,
        "timeline": clean_json_response(result)
    }


@router.post("/key-players")
def key_players(data: KeyPlayersRequest):
    result = extract_key_players(data.topic, data.briefing_text)
    return {
        "topic": data.topic,
        "key_players": clean_json_response(result)
    }
