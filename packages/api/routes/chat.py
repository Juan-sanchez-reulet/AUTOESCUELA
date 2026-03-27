from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import anthropic
import os
from pathlib import Path

router = APIRouter()

# In-memory conversation store: {session_id: [{"role": ..., "content": ...}]}
_conversations: dict[str, list[dict]] = {}

BUSINESS_ID = "autoescuela-madrid-centro"


def _load_context() -> str:
    """Lee todos los archivos .md de docs/context/ y los concatena."""
    context_dir = Path(os.getenv("CONTEXT_DIR", "../../docs/context"))
    if not context_dir.exists():
        # Intentar ruta relativa al archivo actual
        context_dir = Path(__file__).parent.parent.parent.parent / "docs" / "context"

    context_parts = []
    for md_file in sorted(context_dir.glob("*.md")):
        content = md_file.read_text(encoding="utf-8")
        context_parts.append(f"## {md_file.stem.upper()}\n\n{content}")

    return "\n\n---\n\n".join(context_parts) if context_parts else ""


def _build_system_prompt() -> str:
    context = _load_context()
    base = """Eres el asistente virtual de Autoescuela Madrid Centro, una autoescuela en Madrid con más de 10 años de experiencia y 4 sedes.

Tu objetivo es ayudar a los alumnos potenciales y actuales a:
- Resolver dudas sobre precios, horarios y proceso de obtención del carnet
- Informar sobre los diferentes tipos de carnet (B, A2, A, AM, Microcar, B+E)
- Responder preguntas sobre la autoescuela (ubicaciones, profesores, app de test)

IMPORTANTE: NO gestionas reservas directamente. Si el alumno quiere reservar una clase, indícale amablemente que puede hacerlo usando el botón "Reservar clase" que aparece en la web o al final de este chat. Tu rol es exclusivamente resolver dudas e informar.

Responde siempre en español, de forma amable y profesional.
Nunca inventes precios ni información — usa SOLO los documentos proporcionados a continuación.
Si no sabes algo, di que pueden llamar al 91 234 56 78 o escribir a info@autoescuelamadridcentro.es.

---
DOCUMENTOS DE LA AUTOESCUELA:

"""
    return base + context


class ChatRequest(BaseModel):
    session_id: str
    business_id: str = BUSINESS_ID
    message: str


class ChatResponse(BaseModel):
    response: str
    session_id: str
    message_count: int


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")

    # Recuperar o iniciar historial
    history = _conversations.get(req.session_id, [])

    # Añadir mensaje del usuario
    history.append({"role": "user", "content": req.message})

    client = anthropic.Anthropic(api_key=api_key)

    try:
        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            system=_build_system_prompt(),
            messages=history,
        )
        assistant_message = response.content[0].text
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Claude API error: {str(e)}")

    # Guardar respuesta en historial
    history.append({"role": "assistant", "content": assistant_message})
    _conversations[req.session_id] = history

    return ChatResponse(
        response=assistant_message,
        session_id=req.session_id,
        message_count=len(history),
    )


@router.get("/history/{session_id}")
def get_history(session_id: str):
    history = _conversations.get(session_id, [])
    return {"session_id": session_id, "messages": history}


@router.get("/sessions")
def list_sessions():
    """Lista todas las sesiones activas (para el panel del dueño)."""
    sessions = []
    for session_id, messages in _conversations.items():
        if not messages:
            continue
        # Último mensaje
        last = messages[-1]
        # Primer mensaje del usuario
        first_user = next((m for m in messages if m["role"] == "user"), None)
        sessions.append({
            "session_id": session_id,
            "message_count": len(messages),
            "last_message": last["content"][:120] + ("..." if len(last["content"]) > 120 else ""),
            "last_role": last["role"],
            "preview": first_user["content"][:80] if first_user else "",
        })
    return {"sessions": sessions}
