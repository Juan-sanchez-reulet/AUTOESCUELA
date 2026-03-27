from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routes.chat import router as chat_router
from routes.conversations import router as conversations_router
from routes.bookings import router as bookings_router
from routes.availability import router as availability_router

app = FastAPI(
    title="Autoescuela Madrid Centro API",
    description="Backend para el asistente IA y gestión de reservas",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/chat", tags=["Chat"])
app.include_router(conversations_router, prefix="/conversations", tags=["Conversations"])
app.include_router(bookings_router, prefix="/bookings", tags=["Bookings"])
app.include_router(availability_router, prefix="/availability", tags=["Availability"])


@app.get("/health")
def health():
    return {"status": "ok", "business": "autoescuela-madrid-centro"}
