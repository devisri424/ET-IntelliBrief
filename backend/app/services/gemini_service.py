import google.generativeai as genai
import json
import re
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-2.5-flash-lite"


def call_gemini(prompt: str) -> str:
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error: {str(e)}"


def generate_deep_brief(topic: str, articles: list[str]) -> str:
    joined_articles = "\n\n".join(articles)

    prompt = f"""
You are ET IntelliBrief, an AI business news assistant.

Topic: {topic}

Using the following news article snippets, generate ONE structured intelligence briefing.

Return in this format:

Headline:
What Happened:
Why It Matters:
Who Is Affected:
Market Impact:
Contrarian View:
Beginner Explanation:

Articles:
{joined_articles}
"""
    return call_gemini(prompt)


def ask_story_ai(briefing_text: str, persona: str, question: str) -> str:
    prompt = f"""
You are ET IntelliBrief AI.

You are answering based on this business news briefing:

{briefing_text}

User Persona: {persona}

Question: {question}

Instructions:
- Answer clearly
- Keep it useful
- Personalize answer to the user's persona
- If user is a student, explain simply
- If user is an investor, include market relevance
- If user is a founder, include startup/business angle
- If user is a professional, include career/industry relevance
"""
    return call_gemini(prompt)


def generate_explainer(briefing_text: str, language: str) -> str:
    prompt = f"""
You are ET IntelliBrief Explainer.

Take the following business news briefing and explain it in simple, culturally understandable {language}.

Important:
- Do NOT do a literal translation
- Simplify business jargon
- Make it easy for Indian users to understand
- Use short, natural explanation style

Briefing:
{briefing_text}
"""
    return call_gemini(prompt)


def generate_timeline(topic: str, articles: list[str]) -> str:
    joined_articles = "\n\n".join(articles)

    prompt = f"""
You are ET IntelliBrief Timeline Engine.

Topic: {topic}

Based on these article snippets, create a timeline of how the story evolved.

Return ONLY JSON in this format:
[
  {{
    "date": "YYYY-MM-DD or Approx Date",
    "event": "short event summary"
  }}
]

Articles:
{joined_articles}
"""
    return call_gemini(prompt)


def extract_key_players(topic: str, briefing_text: str) -> str:
    prompt = f"""
You are ET IntelliBrief Entity Extractor.

Topic: {topic}

From this briefing, extract key people, companies, institutions, or groups involved.

Return ONLY JSON in this format:
[
  {{
    "name": "entity name",
    "role": "who they are",
    "impact": "why they matter in this story"
  }}
]

Briefing:
{briefing_text}
"""
    return call_gemini(prompt)


def clean_json_response(raw_text: str):
    """
    Tries to extract JSON from Gemini response
    """
    try:
        return json.loads(raw_text)
    except:
        pass

    try:
        match = re.search(r"```json(.*?)```", raw_text, re.DOTALL)
        if match:
            return json.loads(match.group(1).strip())
    except:
        pass

    return {"raw": raw_text}
