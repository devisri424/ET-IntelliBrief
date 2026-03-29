import requests
from app.config import NEWS_API_KEY


def fetch_business_news(query: str = "business OR economy OR startup OR stock market", page_size: int = 10):
    url = "https://newsapi.org/v2/everything"

    params = {
        "q": query,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": page_size,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        return {
            "status": "error",
            "message": f"News API failed with status {response.status_code}",
            "details": response.text
        }

    data = response.json()

    articles = []
    for article in data.get("articles", []):
        articles.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "source": article.get("source", {}).get("name"),
            "publishedAt": article.get("publishedAt"),
            "url": article.get("url"),
            "content": article.get("content")
        })

    return {
        "status": "success",
        "totalResults": data.get("totalResults", 0),
        "articles": articles
    }
