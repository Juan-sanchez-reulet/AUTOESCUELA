from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter()

BUSINESS_ID = "autoescuela-madrid-centro"

# Mock conversations para poblar el panel del dueño desde el primer momento
_MOCK_CONVERSATIONS = [
    {
        "id": "conv-001",
        "session_id": "sess-abc123",
        "business_id": BUSINESS_ID,
        "created_at": (datetime.now() - timedelta(hours=2)).isoformat(),
        "preview": "¿Cuánto cuesta el carnet B?",
        "message_count": 6,
        "last_message": "¡Muchas gracias! Voy a reservar una clase.",
        "last_role": "user",
    },
    {
        "id": "conv-002",
        "session_id": "sess-def456",
        "business_id": BUSINESS_ID,
        "created_at": (datetime.now() - timedelta(hours=5)).isoformat(),
        "preview": "¿Puedo hacer el teórico online?",
        "message_count": 4,
        "last_message": "Perfecto, me apunto a las clases online del miércoles.",
        "last_role": "user",
    },
    {
        "id": "conv-003",
        "session_id": "sess-ghi789",
        "business_id": BUSINESS_ID,
        "created_at": (datetime.now() - timedelta(days=1)).isoformat(),
        "preview": "Diferencia entre carnet A y A2",
        "message_count": 8,
        "last_message": "Entendido, entonces me conviene el A2 primero al tener 19 años.",
        "last_role": "user",
    },
    {
        "id": "conv-004",
        "session_id": "sess-jkl012",
        "business_id": BUSINESS_ID,
        "created_at": (datetime.now() - timedelta(days=1, hours=3)).isoformat(),
        "preview": "¿Qué documentos necesito para matricularme?",
        "message_count": 3,
        "last_message": "De acuerdo, vengo el lunes con el DNI y la foto.",
        "last_role": "user",
    },
    {
        "id": "conv-005",
        "session_id": "sess-mno345",
        "business_id": BUSINESS_ID,
        "created_at": (datetime.now() - timedelta(days=2)).isoformat(),
        "preview": "¿Tienen sede en Vallecas?",
        "message_count": 5,
        "last_message": "Genial, la sede de Vallecas me pilla mucho mejor. Gracias.",
        "last_role": "user",
    },
]

_MOCK_MESSAGES = {
    "conv-001": [
        {"role": "user", "content": "Hola, ¿cuánto cuesta sacar el carnet B?", "created_at": (datetime.now() - timedelta(hours=2, minutes=10)).isoformat()},
        {"role": "assistant", "content": "¡Hola! 😊 Encantado de ayudarte. El carnet B tiene los siguientes costes en Autoescuela Madrid Centro:\n\n**Matrícula**: 150 € (incluye tasas DGT, trámites y el examen teórico)\n**Clases prácticas**: 35 €/hora (también tenemos paquetes: 5 clases por 160 € o 10 clases por 300 €)\n**Uso del vehículo para el examen práctico**: 65 €\n\nEl coste total orientativo suele estar entre **550 € y 900 €** dependiendo de cuántas clases prácticas necesites. Si ya tienes algo de experiencia, lo normal es necesitar menos.\n\n¿Tienes alguna otra pregunta?", "created_at": (datetime.now() - timedelta(hours=2, minutes=9)).isoformat()},
        {"role": "user", "content": "¿Y cuántas clases prácticas necesito más o menos?", "created_at": (datetime.now() - timedelta(hours=2, minutes=5)).isoformat()},
        {"role": "assistant", "content": "Depende de tu nivel de partida:\n\n- **Sin experiencia**: la media es de **12-18 clases**\n- **Con algo de experiencia**: suelen necesitarse **8-12 clases**\n- **Casi listo para el examen**: pueden ser solo **3-6 clases** de repaso\n\nLa DGT solo exige un mínimo de 3 clases, pero es recomendable hacer las que el instructor considere necesarias para ir con garantías al examen.\n\nSi quieres, puedo orientarte mejor si me dices si has conducido antes.", "created_at": (datetime.now() - timedelta(hours=2, minutes=4)).isoformat()},
        {"role": "user", "content": "Nunca he conducido. ¿Cuándo puedo empezar?", "created_at": (datetime.now() - timedelta(hours=2, minutes=1)).isoformat()},
        {"role": "assistant", "content": "¡Perfecto, empezar desde cero no es ningún problema! 🚗\n\nPuedes matricularte **cuando quieras** — el proceso es muy sencillo: solo necesitas tu DNI, una foto de carnet y pasar el reconocimiento médico (que gestionamos nosotros por 35 €).\n\nUna vez matriculado, puedes empezar las clases teóricas de inmediato (online o presenciales) y reservar tus primeras clases prácticas.\n\nSi quieres reservar una clase o matricularte, usa el botón **\"Reservar clase\"** que aparece en la web. ¡Estaremos encantados de recibirte!", "created_at": (datetime.now() - timedelta(hours=2)).isoformat()},
        {"role": "user", "content": "¡Muchas gracias! Voy a reservar una clase.", "created_at": (datetime.now() - timedelta(hours=1, minutes=58)).isoformat()},
    ],
    "conv-002": [
        {"role": "user", "content": "¿Puedo hacer el teórico online?", "created_at": (datetime.now() - timedelta(hours=5, minutes=20)).isoformat()},
        {"role": "assistant", "content": "¡Sí! Ofrecemos clases teóricas online en directo a través de Zoom. Los horarios son:\n\n- **Martes y Jueves**: 10:00 a 12:00\n- **Miércoles y Viernes**: 19:00 a 21:00\n\nSon las mismas clases que las presenciales, con los mismos profesores. Además, tienes acceso gratuito a nuestra app **\"Test Madrid Centro\"** con +5.000 preguntas actualizadas para estudiar a tu ritmo.", "created_at": (datetime.now() - timedelta(hours=5, minutes=19)).isoformat()},
        {"role": "user", "content": "¿Y la app es de verdad gratis?", "created_at": (datetime.now() - timedelta(hours=5, minutes=15)).isoformat()},
        {"role": "assistant", "content": "¡Completamente gratis! La app \"Test Madrid Centro\" está disponible en App Store y Google Play sin ningún coste. Incluye simulacros cronometrados, estadísticas de progreso y modo repaso de fallos. Muchos alumnos aprueban el teórico en el primer o segundo intento usándola.", "created_at": (datetime.now() - timedelta(hours=5, minutes=14)).isoformat()},
        {"role": "user", "content": "Perfecto, me apunto a las clases online del miércoles.", "created_at": (datetime.now() - timedelta(hours=5, minutes=10)).isoformat()},
    ],
}


@router.get("")
def list_conversations(business_id: str = BUSINESS_ID):
    return {"conversations": _MOCK_CONVERSATIONS}


@router.get("/{conversation_id}/messages")
def get_messages(conversation_id: str):
    messages = _MOCK_MESSAGES.get(conversation_id)
    if messages is None:
        return {"messages": [], "conversation_id": conversation_id}
    return {"messages": messages, "conversation_id": conversation_id}
