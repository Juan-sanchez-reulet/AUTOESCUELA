from fastapi import APIRouter
from datetime import datetime, timedelta
import random

router = APIRouter()

# Slots bloqueados fijos para la demo (para que parezca real)
FIXED_BLOCKED = {
    # formato: "YYYY-MM-DD-HH"
}

def _seed_for_day(date_str: str) -> int:
    """Semilla determinista por día para que los slots no cambien al recargar."""
    return sum(ord(c) for c in date_str)


@router.get("")
def get_availability(days: int = 14):
    """
    Retorna slots disponibles para los próximos N días.
    Lunes-Sábado, 9:00-20:00, slots de 1h.
    ~35% de slots bloqueados de forma determinista.
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
            slot_key = f"{date_str}-{hour:02d}"
            # 35% de probabilidad de estar ocupado
            available = rng.random() > 0.35
            day_slots.append({
                "time": f"{hour:02d}:00",
                "datetime": f"{date_str}T{hour:02d}:00:00",
                "available": available,
            })

        slots_by_day[date_str] = {
            "date": date_str,
            "weekday": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][day.weekday()],
            "slots": day_slots,
        }

    return {"business_id": "autoescuela-madrid-centro", "availability": slots_by_day}
