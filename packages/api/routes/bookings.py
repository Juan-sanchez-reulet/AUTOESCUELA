from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pathlib import Path
import json
import random
import string

router = APIRouter()

BOOKINGS_FILE = Path(__file__).parent.parent / "data" / "bookings.json"
BUSINESS_ID = "autoescuela-madrid-centro"


def _load_bookings() -> list:
    if not BOOKINGS_FILE.exists():
        return []
    try:
        return json.loads(BOOKINGS_FILE.read_text())
    except Exception:
        return []


def _save_bookings(bookings: list):
    BOOKINGS_FILE.write_text(json.dumps(bookings, indent=2, ensure_ascii=False))


def _generate_ref() -> str:
    """Genera referencia tipo MC-4729"""
    num = "".join(random.choices(string.digits, k=4))
    return f"MC-{num}"


class BookingCreate(BaseModel):
    business_id: str = BUSINESS_ID
    student_name: str
    student_phone: str
    student_email: Optional[str] = None
    class_type: str   # practica | teorica | consulta
    license_type: str  # B | A2 | A | AM | Microcar | B+E
    student_level: Optional[str] = None
    scheduled_at: str  # ISO datetime string


class BookingResponse(BaseModel):
    id: str
    booking_ref: str
    student_name: str
    student_phone: str
    student_email: Optional[str]
    class_type: str
    license_type: str
    student_level: Optional[str]
    scheduled_at: str
    status: str
    created_at: str


@router.post("", response_model=BookingResponse)
def create_booking(booking: BookingCreate):
    bookings = _load_bookings()

    new_booking = {
        "id": f"booking-{len(bookings) + 1:04d}",
        "booking_ref": _generate_ref(),
        "business_id": booking.business_id,
        "student_name": booking.student_name,
        "student_phone": booking.student_phone,
        "student_email": booking.student_email,
        "class_type": booking.class_type,
        "license_type": booking.license_type,
        "student_level": booking.student_level,
        "scheduled_at": booking.scheduled_at,
        "status": "confirmada",
        "calendar_event_id": None,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }

    bookings.append(new_booking)
    _save_bookings(bookings)

    return new_booking


@router.get("")
def list_bookings(business_id: str = BUSINESS_ID):
    bookings = _load_bookings()
    # Demo data: añadir algunas reservas de ejemplo si está vacío
    if not bookings:
        bookings = _get_demo_bookings()
    return {"bookings": bookings, "total": len(bookings)}


@router.get("/{booking_id}")
def get_booking(booking_id: str):
    bookings = _load_bookings()
    for b in bookings:
        if b["id"] == booking_id or b["booking_ref"] == booking_id:
            return b
    raise HTTPException(status_code=404, detail="Booking not found")


@router.patch("/{booking_id}/status")
def update_status(booking_id: str, status: str):
    if status not in ["pendiente", "confirmada", "cancelada", "completada"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    bookings = _load_bookings()
    for b in bookings:
        if b["id"] == booking_id:
            b["status"] = status
            b["updated_at"] = datetime.now().isoformat()
            _save_bookings(bookings)
            return b
    raise HTTPException(status_code=404, detail="Booking not found")


def _get_demo_bookings() -> list:
    from datetime import timedelta
    now = datetime.now()
    return [
        {
            "id": "booking-0001",
            "booking_ref": "MC-1834",
            "business_id": BUSINESS_ID,
            "student_name": "María García López",
            "student_phone": "612 345 678",
            "student_email": "maria.garcia@email.com",
            "class_type": "practica",
            "license_type": "B",
            "student_level": "sin_experiencia",
            "scheduled_at": (now + timedelta(days=2, hours=10)).isoformat(),
            "status": "confirmada",
            "calendar_event_id": None,
            "created_at": (now - timedelta(hours=3)).isoformat(),
            "updated_at": (now - timedelta(hours=3)).isoformat(),
        },
        {
            "id": "booking-0002",
            "booking_ref": "MC-2291",
            "business_id": BUSINESS_ID,
            "student_name": "Carlos Martínez Ruiz",
            "student_phone": "689 123 456",
            "student_email": "c.martinez@gmail.com",
            "class_type": "teorica",
            "license_type": "A2",
            "student_level": "algo_experiencia",
            "scheduled_at": (now + timedelta(days=1, hours=16)).isoformat(),
            "status": "confirmada",
            "calendar_event_id": None,
            "created_at": (now - timedelta(hours=6)).isoformat(),
            "updated_at": (now - timedelta(hours=6)).isoformat(),
        },
        {
            "id": "booking-0003",
            "booking_ref": "MC-3047",
            "business_id": BUSINESS_ID,
            "student_name": "Laura Sánchez Vega",
            "student_phone": "654 987 321",
            "student_email": None,
            "class_type": "consulta",
            "license_type": "B",
            "student_level": None,
            "scheduled_at": (now + timedelta(days=3, hours=11)).isoformat(),
            "status": "pendiente",
            "calendar_event_id": None,
            "created_at": (now - timedelta(days=1)).isoformat(),
            "updated_at": (now - timedelta(days=1)).isoformat(),
        },
    ]
