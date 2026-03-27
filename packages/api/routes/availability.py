from fastapi import APIRouter
from datetime import datetime, timedelta
import random

router = APIRouter()

# Slots bloqueados fijos para la demo (para que parezca real)
FIXED_BLOCKED = {
    # formato: "YYYY-MM-DD-HH"
}

TEACHERS = [
    {
        "id": "javier-moreno",
        "name": "Javier Moreno",
        "licenses": ["B", "A2"],
        # Works Mon-Fri 9-14, Mon/Wed/Fri 16-20
        "schedule": {
            0: list(range(9, 14)) + [16, 17, 18, 19],
            1: list(range(9, 14)),
            2: list(range(9, 14)) + [16, 17, 18, 19],
            3: list(range(9, 14)),
            4: list(range(9, 14)) + [16, 17, 18, 19],
            5: list(range(9, 13)),
        },
    },
    {
        "id": "ana-lopez",
        "name": "Ana López",
        "licenses": ["B", "AM"],
        # Works Tue-Sat 10-14, Tue/Thu 16-20
        "schedule": {
            1: list(range(10, 14)) + [16, 17, 18, 19],
            2: list(range(10, 14)),
            3: list(range(10, 14)) + [16, 17, 18, 19],
            4: list(range(10, 14)),
            5: list(range(10, 14)),
        },
    },
    {
        "id": "carlos-ruiz",
        "name": "Carlos Ruiz",
        "licenses": ["B", "B+E"],
        # Works Mon-Fri 12-20
        "schedule": {
            0: list(range(12, 20)),
            1: list(range(12, 20)),
            2: list(range(12, 20)),
            3: list(range(12, 20)),
            4: list(range(12, 20)),
        },
    },
    {
        "id": "elena-garcia",
        "name": "Elena García",
        "licenses": ["A", "A2"],
        # Works Mon/Wed/Fri 9-18, Sat 9-13
        "schedule": {
            0: list(range(9, 18)),
            2: list(range(9, 18)),
            4: list(range(9, 18)),
            5: list(range(9, 13)),
        },
    },
]


def _seed_for_day(date_str: str) -> int:
    """Semilla determinista por día para que los slots no cambien al recargar."""
    return sum(ord(c) for c in date_str)


def _get_available_teachers(weekday: int, hour: int, rng: random.Random) -> list[dict]:
    """
    Devuelve los profesores disponibles para un día de la semana y hora concretos.
    Usa el RNG determinista para simular que algunos profesores ya tienen clase.
    """
    available = []
    for teacher in TEACHERS:
        schedule = teacher["schedule"]
        if weekday in schedule and hour in schedule[weekday]:
            # ~70% de probabilidad de que el profesor esté libre en ese slot
            if rng.random() > 0.30:
                available.append(
                    {
                        "id": teacher["id"],
                        "name": teacher["name"],
                        "licenses": teacher["licenses"],
                    }
                )
    return available


@router.get("")
def get_availability(days: int = 14):
    """
    Retorna slots disponibles para los próximos N días.
    Lunes-Sábado, 9:00-20:00, slots de 1h.
    Disponibilidad determinista basada en profesores libres.
    """
    slots_by_day = {}
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    for i in range(1, days + 1):
        day = today + timedelta(days=i)

        # Saltar domingos (weekday() == 6)
        if day.weekday() == 6:
            continue

        date_str = day.strftime("%Y-%m-%d")
        rng = random.Random(_seed_for_day(date_str))

        # Sábados solo mañana (9-14)
        if day.weekday() == 5:
            hours = list(range(9, 14))
        else:
            hours = list(range(9, 20))

        day_slots = []
        for hour in hours:
            teachers_available = _get_available_teachers(day.weekday(), hour, rng)
            available = len(teachers_available) > 0
            day_slots.append(
                {
                    "time": f"{hour:02d}:00",
                    "datetime": f"{date_str}T{hour:02d}:00:00",
                    "available": available,
                    "teachers_available": teachers_available,
                }
            )

        slots_by_day[date_str] = {
            "date": date_str,
            "weekday": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][day.weekday()],
            "slots": day_slots,
        }

    return {"business_id": "autoescuela-madrid-centro", "availability": slots_by_day}


@router.get("/teachers")
def get_teachers():
    """Retorna la lista completa de profesores con sus horarios."""
    return {"teachers": TEACHERS}
