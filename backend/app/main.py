from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health, news, ai

app = FastAPI(title="ET IntelliBrief API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router)
app.include_router(news.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "ET IntelliBrief Backend Running 🚀"}
