from fastapi import APIRouter, Query
from app.services.news_service import fetch_business_news

router = APIRouter(prefix="/news", tags=["News"])


@router.get("/")
def get_news(
    query: str = Query("business OR economy OR startup OR stock market", description="Search topic"),
    page_size: int = Query(10, description="Number of articles")
):
    return fetch_business_news(query=query, page_size=page_size)
