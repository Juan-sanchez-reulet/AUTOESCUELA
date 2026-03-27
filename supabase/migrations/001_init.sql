-- ============================================================
-- Autoescuela AI — Initial Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- BUSINESSES
-- One row per autoescuela cliente (multi-tenant)
-- ============================================================
CREATE TABLE businesses (
  id            TEXT PRIMARY KEY DEFAULT 'autoescuela-madrid-centro',
  name          TEXT NOT NULL,
  city          TEXT NOT NULL DEFAULT 'Madrid',
  phone         TEXT,
  email         TEXT,
  system_prompt TEXT,                          -- personalizable por negocio
  config        JSONB DEFAULT '{}'::jsonb,     -- colores, logo_url, etc.
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed demo business
INSERT INTO businesses (id, name, city, phone, email, system_prompt)
VALUES (
  'autoescuela-madrid-centro',
  'Autoescuela Madrid Centro',
  'Madrid',
  '91 234 56 78',
  'info@autoescuelamadridcentro.es',
  'Eres el asistente virtual de Autoescuela Madrid Centro, una autoescuela en Madrid con más de 10 años de experiencia y 4 sedes. Tu objetivo es ayudar a los alumnos potenciales y actuales a resolver dudas sobre precios, horarios y proceso de obtención del carnet. NO gestionas reservas directamente — para reservar, indica al alumno que use el botón "Reservar clase" en la web. Responde siempre en español, de forma amable y profesional. Nunca inventes precios ni información — usa solo los documentos proporcionados.'
);

-- ============================================================
-- CONVERSATIONS
-- Una por sesión de chat (session_id = localStorage key)
-- ============================================================
CREATE TABLE conversations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id   TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  session_id    TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(business_id, session_id)
);

CREATE INDEX idx_conversations_business_id ON conversations(business_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- ============================================================
-- MESSAGES
-- Historial completo de cada conversación
-- ============================================================
CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- ============================================================
-- BOOKINGS
-- Reservas creadas a través del modal de la landing
-- ============================================================
CREATE TABLE bookings (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id        TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  booking_ref        TEXT NOT NULL UNIQUE,           -- e.g. "MC-2847"
  student_name       TEXT NOT NULL,
  student_phone      TEXT NOT NULL,
  student_email      TEXT,
  class_type         TEXT NOT NULL CHECK (class_type IN ('practica', 'teorica', 'consulta')),
  license_type       TEXT NOT NULL CHECK (license_type IN ('B', 'A2', 'A', 'AM', 'Microcar', 'B+E')),
  student_level      TEXT CHECK (student_level IN ('sin_experiencia', 'algo_experiencia', 'casi_listo')),
  scheduled_at       TIMESTAMPTZ NOT NULL,
  status             TEXT NOT NULL DEFAULT 'confirmada' CHECK (status IN ('pendiente', 'confirmada', 'cancelada', 'completada')),
  calendar_event_id  TEXT,                           -- Google Calendar event ID (cuando esté integrado)
  notes              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_business_id ON bookings(business_id);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX idx_bookings_status ON bookings(status);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE businesses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings       ENABLE ROW LEVEL SECURITY;

-- Para la demo: política permisiva (en producción, limitar por auth.uid())
CREATE POLICY "Allow all for demo" ON businesses    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON messages      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON bookings      FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
