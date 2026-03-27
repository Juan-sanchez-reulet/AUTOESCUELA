# Autoescuela Madrid Centro — Demo SaaS

Demo funcional de asistente IA para autoescuelas. Stack: Next.js 14 + FastAPI + Claude API.

## 🚀 Arrancar en local

### 1. Backend (FastAPI)

```bash
cd packages/api
cp .env.example .env
# Edita .env y añade tu ANTHROPIC_API_KEY
source .venv/bin/activate    # o: python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API disponible en: http://localhost:8000
Docs interactivos: http://localhost:8000/docs

### 2. Frontend (Next.js)

```bash
cd apps/web
# .env.local ya está configurado para localhost:8000
npm run dev
```

Web disponible en: http://localhost:3000

## 🔑 Credenciales demo

- **Panel del dueño**: admin@autoescuelamadrid.com / demo2024
- URL: http://localhost:3000/admin

## 📁 Estructura

```
autoescuela-ai/
├── apps/web/           → Next.js (landing + admin + widget)
├── packages/api/       → FastAPI (chat con Claude + mock data)
├── supabase/migrations/→ Schema SQL (para integración futura)
└── docs/context/       → FAQs, tarifas, horarios (usados por Claude)
```

## 🎬 Flujo de la demo

1. **Landing** → http://localhost:3000 — web profesional completa
2. **Chat** → botón azul esquina inferior derecha → preguntar por precios/carnets
3. **Reserva** → botón "Reservar clase" → modal 3 pasos → confirmación
4. **Admin** → http://localhost:3000/admin → login → ver conversaciones + reservas

## ⚙️ Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `ANTHROPIC_API_KEY` | packages/api/.env | API key de Anthropic (obligatoria) |
| `NEXT_PUBLIC_API_URL` | apps/web/.env.local | URL del backend (default: localhost:8000) |
