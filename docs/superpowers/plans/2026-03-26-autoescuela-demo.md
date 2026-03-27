# Autoescuela Madrid Centro — Demo Full-Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una demo funcional de SaaS para autoescuelas: landing page real, chat widget con Claude, modal de reserva con slots simulados y panel del dueño con datos de demo.

**Architecture:** Opción B — Frontend 100% real (Next.js 14 + Tailwind), Backend FastAPI con mock data excepto el chat que usa Claude API real. Google Calendar simulado con slots hardcodeados para los próximos 14 días. Admin panel con auth simple (localStorage). Bookings persistidos en JSON en el servidor.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, FastAPI (Python 3.11), Anthropic Claude API (claude-opus-4-5), python-dotenv, shadcn/ui patterns manuales.

---

## Estructura de archivos

```
autoescuela-ai/
├── apps/web/                         # Next.js — landing + admin + widget
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── .env.local                    # NEXT_PUBLIC_API_URL, ADMIN_PASSWORD
│   ├── app/
│   │   ├── layout.tsx                # Root layout + fonts
│   │   ├── page.tsx                  # Landing page (compone secciones)
│   │   ├── globals.css
│   │   ├── admin/
│   │   │   ├── page.tsx              # Login del dueño
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx        # Sidebar layout
│   │   │       ├── page.tsx          # Overview con stats
│   │   │       ├── conversaciones/
│   │   │       │   ├── page.tsx      # Lista de chats
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx  # Historial completo
│   │   │       └── reservas/
│   │   │           └── page.tsx      # Tabla de bookings
│   │   └── api/
│   │       ├── chat/route.ts         # Proxy → FastAPI /chat
│   │       ├── bookings/route.ts     # Proxy → FastAPI /bookings
│   │       └── availability/route.ts # Proxy → FastAPI /availability
│   └── components/
│       ├── landing/
│       │   ├── Hero.tsx
│       │   ├── CarnetCards.tsx
│       │   ├── WhyUs.tsx
│       │   ├── Reviews.tsx
│       │   ├── Location.tsx
│       │   └── SiteFooter.tsx
│       ├── widget/
│       │   ├── ChatWidget.tsx        # Orquestador (bubble + window)
│       │   └── ChatWindow.tsx        # UI del chat
│       └── booking/
│           ├── BookingModal.tsx      # Modal container + stepper
│           ├── Step1Type.tsx
│           ├── Step2Data.tsx
│           ├── Step3Schedule.tsx     # Calendario + slots
│           └── BookingConfirmation.tsx
├── packages/api/                     # FastAPI backend
│   ├── requirements.txt
│   ├── .env
│   ├── main.py                       # App + CORS + routers
│   ├── data/
│   │   └── bookings.json             # Persistencia simple
│   └── routes/
│       ├── chat.py                   # Claude API real + context files
│       ├── conversations.py          # Mock data fixtures
│       ├── bookings.py               # CRUD en JSON
│       └── availability.py           # Slots hardcodeados 14 días
├── supabase/
│   └── migrations/
│       └── 001_init.sql
└── docs/
    └── context/
        ├── faqs.md
        ├── tarifas.md
        └── horarios.md
```

---

## Task 1: Monorepo base + context files

**Files:**
- Create: `autoescuela-ai/` (root del monorepo)
- Create: `docs/context/faqs.md`
- Create: `docs/context/tarifas.md`
- Create: `docs/context/horarios.md`
- Create: `supabase/migrations/001_init.sql`

- [ ] Crear estructura de directorios del monorepo
- [ ] Escribir `docs/context/faqs.md` con 8+ preguntas reales
- [ ] Escribir `docs/context/tarifas.md` con precios ficticios realistas
- [ ] Escribir `docs/context/horarios.md` con horarios y disponibilidad
- [ ] Escribir `supabase/migrations/001_init.sql` (businesses, conversations, messages, bookings)
- [ ] Commit: `chore: monorepo init + context files + supabase schema`

---

## Task 2: FastAPI backend

**Files:**
- Create: `packages/api/main.py`
- Create: `packages/api/requirements.txt`
- Create: `packages/api/.env`
- Create: `packages/api/routes/chat.py`
- Create: `packages/api/routes/conversations.py`
- Create: `packages/api/routes/bookings.py`
- Create: `packages/api/routes/availability.py`
- Create: `packages/api/data/bookings.json`

- [ ] Escribir `requirements.txt` (fastapi, uvicorn, anthropic, python-dotenv, pydantic)
- [ ] Escribir `main.py` con CORS configurado para localhost:3000
- [ ] Escribir `routes/availability.py` — genera slots de 9:00-20:00 L-S para próximos 14 días, bloquea 30% aleatoriamente
- [ ] Escribir `routes/chat.py` — lee archivos de context/, llama Claude API con system prompt base, guarda conversation en mock store
- [ ] Escribir `routes/conversations.py` — retorna mock conversations + mensajes de demo
- [ ] Escribir `routes/bookings.py` — POST crea booking en bookings.json, GET lista todos
- [ ] Test manual: `uvicorn main:app --reload` + curl a cada endpoint
- [ ] Commit: `feat: fastapi backend with claude chat + mock data`

---

## Task 3: Next.js setup

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/.env.local`
- Create: `apps/web/app/api/chat/route.ts`
- Create: `apps/web/app/api/bookings/route.ts`
- Create: `apps/web/app/api/availability/route.ts`

- [ ] Init Next.js con `npx create-next-app@latest`
- [ ] Configurar Tailwind, fuentes (Inter + fuente display)
- [ ] Escribir API routes como proxy al backend FastAPI
- [ ] Escribir `app/layout.tsx` con metadata de la autoescuela
- [ ] Commit: `chore: next.js setup + api proxy routes`

---

## Task 4: Landing page

**Files:**
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/components/landing/Hero.tsx`
- Create: `apps/web/components/landing/CarnetCards.tsx`
- Create: `apps/web/components/landing/WhyUs.tsx`
- Create: `apps/web/components/landing/Reviews.tsx`
- Create: `apps/web/components/landing/Location.tsx`
- Create: `apps/web/components/landing/SiteFooter.tsx`

- [ ] **Hero**: headline, subheadline, imagen Unsplash Madrid, 2 CTAs (Reservar + Ver precios)
- [ ] **CarnetCards**: B, A/A2, AM, Microcar, B+E — cards con icono SVG, precio, hover effect
- [ ] **WhyUs**: 4 bullets con iconos — DGT, online, app test, resultados
- [ ] **Reviews**: 3 reseñas ficticias estilo Google — avatar inicial, estrellas, texto
- [ ] **Location**: dirección ficticia Madrid + Google Maps iframe (zona Sol/Gran Vía)
- [ ] **SiteFooter**: logo, tel, email, links, redes
- [ ] `app/page.tsx`: compone todas las secciones + estado global `bookingOpen`
- [ ] Commit: `feat: landing page completa`

---

## Task 5: Chat Widget

**Files:**
- Create: `apps/web/components/widget/ChatWidget.tsx`
- Create: `apps/web/components/widget/ChatWindow.tsx`

- [ ] **ChatWidget**: botón bubble (esquina inferior derecha), icono chat SVG, animación ping
- [ ] **ChatWindow**: header con logo, lista de mensajes, input con send, indicador de escritura (dots animados)
- [ ] Soporte markdown en respuestas (simple: bold, listas)
- [ ] session_id persistido en localStorage
- [ ] Llamada real a `POST /api/chat`
- [ ] CTA al final: "¿Quieres reservar? →" después de cada respuesta Claude
- [ ] Integrar ChatWidget en `app/page.tsx`
- [ ] Commit: `feat: chat widget con claude integration`

---

## Task 6: Modal de Reserva

**Files:**
- Create: `apps/web/components/booking/BookingModal.tsx`
- Create: `apps/web/components/booking/Step1Type.tsx`
- Create: `apps/web/components/booking/Step2Data.tsx`
- Create: `apps/web/components/booking/Step3Schedule.tsx`
- Create: `apps/web/components/booking/BookingConfirmation.tsx`

- [ ] **BookingModal**: overlay oscuro, modal centrado, stepper visual (3 pasos), close button
- [ ] **Step1Type**: selector tipo clase (práctica/teórica/consulta), selector carnet (B/A2/A/AM/Microcar/B+E)
- [ ] **Step2Data**: inputs nombre, teléfono, email, nivel actual (radio)
- [ ] **Step3Schedule**: fetch a `/api/availability`, renderiza calendario mini con días, al click día muestra slots, slot ocupado = gris desactivado
- [ ] **BookingConfirmation**: resumen datos + número de reserva generado (MD-XXXX), mensaje de éxito
- [ ] `POST /api/bookings` al confirmar, mostrar confirmation
- [ ] Commit: `feat: modal de reserva 3 pasos con slots`

---

## Task 7: Panel del Dueño

**Files:**
- Create: `apps/web/app/admin/page.tsx`
- Create: `apps/web/app/admin/dashboard/layout.tsx`
- Create: `apps/web/app/admin/dashboard/page.tsx`
- Create: `apps/web/app/admin/dashboard/conversaciones/page.tsx`
- Create: `apps/web/app/admin/dashboard/conversaciones/[id]/page.tsx`
- Create: `apps/web/app/admin/dashboard/reservas/page.tsx`

- [ ] **Login** (`/admin`): email + password, hardcodeado `admin@autoescuelamadrid.com` / `demo2024`, guarda token en localStorage
- [ ] **Dashboard layout**: sidebar con logo, nav links (Overview, Conversaciones, Reservas), logout
- [ ] **Overview** (`/dashboard`): 3 stat cards (total chats, reservas hoy, tasa conversión mock)
- [ ] **Conversaciones** (`/dashboard/conversaciones`): lista con avatar inicial, preview último mensaje, timestamp — fetch a `/api/conversations`
- [ ] **Detalle conversación** (`/[id]`): historial completo tipo iMessage — burbujas azul/gris
- [ ] **Reservas** (`/dashboard/reservas`): tabla con nombre, teléfono, tipo carnet, fecha, estado (badge color)
- [ ] Auth guard en dashboard layout (redirect a /admin si no hay token)
- [ ] Commit: `feat: admin panel completo`

---

## Task 8: Polish + .env files + README

- [ ] Añadir `.env.example` en `apps/web/` y `packages/api/`
- [ ] Añadir animaciones de entrada (fade-in) en landing sections
- [ ] Verificar flujo demo completo de principio a fin
- [ ] Commit: `chore: env examples + polish final`

---

## Flujo demo a verificar

1. `cd apps/web && npm run dev` → landing en localhost:3000
2. `cd packages/api && uvicorn main:app --reload` → API en localhost:8000
3. Abrir landing — aspecto profesional y completo
4. Chat widget → preguntar "¿Cuánto cuesta el carnet B?" → responde con datos de tarifas.md
5. Botón "Reservar clase" → modal abre, seleccionar tipo + datos + fecha disponible → confirmar
6. Ir a `localhost:3000/admin` → login → dashboard → ver conversación + reserva recién creada
