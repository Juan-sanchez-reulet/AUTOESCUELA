"use client";

import { useState } from "react";

const LEVELS = [
  { id: "sin_experiencia", label: "Nunca he conducido", emoji: "🌱" },
  { id: "algo_experiencia", label: "Tengo algo de experiencia", emoji: "🚦" },
  { id: "casi_listo", label: "Solo me falta el examen", emoji: "🎯" },
];

interface Props {
  data: Partial<{ studentName: string; studentPhone: string; studentEmail: string; studentLevel: string }>;
  onNext: (d: { studentName: string; studentPhone: string; studentEmail: string; studentLevel: string }) => void;
  onBack: () => void;
}

export default function Step2Data({ data, onNext, onBack }: Props) {
  const [name, setName] = useState(data.studentName || "");
  const [phone, setPhone] = useState(data.studentPhone || "");
  const [email, setEmail] = useState(data.studentEmail || "");
  const [level, setLevel] = useState(data.studentLevel || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "El nombre es obligatorio";
    if (!phone.trim()) e.phone = "El teléfono es obligatorio";
    if (phone && !/^[6-9]\d{8}$/.test(phone.replace(/\s/g, ""))) e.phone = "Teléfono no válido";
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext({ studentName: name, studentPhone: phone, studentEmail: email, studentLevel: level });
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
          placeholder="Ej. María García López"
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: "" })); }}
          placeholder="6XX XXX XXX"
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email <span className="text-gray-400 text-xs font-normal">(opcional)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nivel actual <span className="text-gray-400 text-xs font-normal">(opcional)</span>
        </label>
        <div className="space-y-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                level === l.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">{l.emoji}</span>
              <span className={`text-sm font-medium ${level === l.id ? "text-blue-700" : "text-gray-700"}`}>
                {l.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
