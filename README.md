# Autoescuela Madrid Centro — Demo SaaS

Demo funcional de asistente IA para autoescuelas. Stack: Next.js 14 + FastAPI + Claude API.

## 🚀 Arrancar en local

### 1. Backend (FastAPI) — puerto 8001

Abre una terminal y ejecuta estos comandos **uno a uno**:

```bash
cd /AUTOESCUELA/packages/api
source .venv/bin/activate
uvicorn main:app --reload --port 8001
```

API disponible en: http://localhost:8001
Docs interactivos: http://localhost:8001/docs

### 2. Frontend (Next.js) — puerto 3000

Abre **otra terminal** y ejecuta:

```bash
cd /AUTOESCUELA/apps/web
npm run dev
```

Web disponible en: http://localhost:3000

---

## 🔑 Credenciales demo

- **Panel del dueño**: `admin@autoescuelamadrid.com` / `demo2024`
- URL: http://localhost:3000/admin

---

## 📁 Estructura

```
autoescuela-ai/
├── apps/web/             → Next.js (landing + admin + widget)
├── packages/api/         → FastAPI (chat con Claude + mock data)
├── supabase/migrations/  → Schema SQL (para integración futura)
└── docs/context/         → FAQs, tarifas, horarios (usados por Claude)
```

---

## 🎬 Flujo de la demo

1. **Landing** → http://localhost:3000 — web profesional completa
2. **Chat** → botón azul esquina inferior derecha → preguntar por precios/carnets
3. **Reserva** → botón "Reservar clase" → modal 3 pasos → confirmación con nº `MC-XXXX`
4. **Admin** → http://localhost:3000/admin → login → ver conversaciones + reservas

---

## ⚙️ Variables de entorno

| Archivo | Variable | Valor |
|---|---|---|
| `packages/api/.env` | `ANTHROPIC_API_KEY` | Tu key de Anthropic |
| `apps/web/.env.local` | `NEXT_PUBLIC_API_URL` | `http://localhost:8001` |

---

## 🐛 Problemas comunes

**Puerto ocupado:**
```bash
lsof -ti :8001 | xargs kill -9
lsof -ti :3000 | xargs kill -9
```

**Reinstalar dependencias Python:**
```bash
cd packages/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
