"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  booking_ref: string;
  student_name: string;
  student_phone: string;
  student_email?: string;
  class_type: string;
  license_type: string;
  student_level?: string;
  scheduled_at: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  confirmada: "bg-green-100 text-green-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  cancelada: "bg-red-100 text-red-700",
  completada: "bg-gray-100 text-gray-600",
};

const CLASS_LABELS: Record<string, string> = {
  practica: "🚗 Práctica",
  teorica: "📚 Teórica",
  consulta: "☕ Consulta",
};

const LEVEL_LABELS: Record<string, string> = {
  sin_experiencia: "Sin experiencia",
  algo_experiencia: "Algo de exp.",
  casi_listo: "Casi listo",
};

export default function ReservasPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Reservas</h1>
          <p className="text-gray-500 mt-1">Gestión de todas las clases reservadas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
          {["all", "confirmada", "pendiente", "cancelada"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === s ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "Todas" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", count: bookings.length, color: "text-gray-900" },
          { label: "Confirmadas", count: bookings.filter((b) => b.status === "confirmada").length, color: "text-green-600" },
          { label: "Pendientes", count: bookings.filter((b) => b.status === "pendiente").length, color: "text-yellow-600" },
          { label: "Canceladas", count: bookings.filter((b) => b.status === "cancelada").length, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className={`text-2xl font-extrabold ${s.color}`}>{loading ? "—" : s.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">No hay reservas{filter !== "all" ? ` ${filter}s` : ""}</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Ref.", "Alumno", "Tipo", "Carnet", "Fecha", "Estado", "Teléfono"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-mono font-semibold text-blue-700">{b.booking_ref}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                            {b.student_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{b.student_name}</p>
                            {b.student_level && <p className="text-xs text-gray-400">{LEVEL_LABELS[b.student_level] || b.student_level}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{CLASS_LABELS[b.class_type] || b.class_type}</td>
                      <td className="px-5 py-4">
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{b.license_type}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">
                        {new Date(b.scheduled_at).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}
                        <br />
                        <span className="text-xs text-gray-400">
                          {new Date(b.scheduled_at).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-600"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{b.student_phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((b) => (
                <div key={b.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{b.student_name}</p>
                      <p className="text-xs text-blue-600 font-mono">{b.booking_ref}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-600"}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span>{CLASS_LABELS[b.class_type]}</span>
                    <span>Carnet {b.license_type}</span>
                    <span>{b.student_phone}</span>
                    <span>{new Date(b.scheduled_at).toLocaleDateString("es")}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
