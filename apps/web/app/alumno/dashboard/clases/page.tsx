"use client";

import Link from "next/link";

const today = new Date();
const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};

const COMPLETED_CLASSES = [
  { date: addDays(today, -28), time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "completada" },
  { date: addDays(today, -24), time: "16:00", teacher: "Ana López",     type: "Práctica", status: "completada" },
  { date: addDays(today, -20), time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "completada" },
  { date: addDays(today, -17), time: "18:00", teacher: "Ana López",     type: "Teórica",  status: "completada" },
  { date: addDays(today, -13), time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "completada" },
  { date: addDays(today, -10), time: "16:00", teacher: "Ana López",     type: "Práctica", status: "completada" },
  { date: addDays(today, -6),  time: "11:00", teacher: "Carlos Ruiz",   type: "Práctica", status: "completada" },
  { date: addDays(today, -2),  time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "completada" },
];

const UPCOMING_CLASSES = [
  { date: addDays(today, 2),  time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "confirmada" },
  { date: addDays(today, 5),  time: "16:00", teacher: "Ana López",     type: "Práctica", status: "confirmada" },
  { date: addDays(today, 8),  time: "10:00", teacher: "Javier Moreno", type: "Práctica", status: "confirmada" },
  { date: addDays(today, 12), time: "18:00", teacher: "Ana López",     type: "Práctica", status: "confirmada" },
];

const ALL_CLASSES = [
  ...UPCOMING_CLASSES.map((c) => ({ ...c, group: "upcoming" })),
  ...COMPLETED_CLASSES.map((c) => ({ ...c, group: "completed" })).reverse(),
];

const STATUS_STYLES: Record<string, string> = {
  completada: "bg-green-100 text-green-700",
  confirmada:  "bg-blue-100 text-blue-700",
  pendiente:   "bg-yellow-100 text-yellow-700",
};

const TYPE_STYLES: Record<string, string> = {
  "Práctica": "bg-orange-50 text-orange-700",
  "Teórica":  "bg-purple-50 text-purple-700",
};

function fmt(d: Date) {
  return d.toLocaleDateString("es", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function ClasesPage() {
  const total = 14;
  const completed = COMPLETED_CLASSES.length;
  const upcoming = UPCOMING_CLASSES.length;
  const pending = total - completed - upcoming;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Mis clases</h1>
          <p className="text-gray-500 mt-1">Historial y próximas sesiones programadas.</p>
        </div>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Reservar más clases
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-3xl font-extrabold text-green-600">{completed}</p>
          <p className="text-xs text-gray-500 mt-1">Completadas</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-3xl font-extrabold text-blue-600">{upcoming}</p>
          <p className="text-xs text-gray-500 mt-1">Programadas</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-3xl font-extrabold text-gray-400">{pending}</p>
          <p className="text-xs text-gray-500 mt-1">Por reservar</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Progreso total</span>
          <span className="text-gray-500">{completed} de {total} clases</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Media para el carnet B: {total} clases</p>
      </div>

      {/* Próximas clases */}
      {upcoming > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Próximas clases
          </h2>
          <div className="space-y-3">
            {UPCOMING_CLASSES.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {c.teacher.split(" ")[0][0]}{c.teacher.split(" ")[1]?.[0] || ""}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{fmt(c.date)} · {c.time}h</p>
                  <p className="text-xs text-gray-500">{c.teacher}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_STYLES[c.type]}`}>
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial completo */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Historial completo</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Fecha", "Hora", "Profesor", "Tipo", "Estado"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ALL_CLASSES.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gray-700">{fmt(c.date)}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{c.time}h</td>
                  <td className="px-5 py-4 text-sm text-gray-700">{c.teacher}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_STYLES[c.type]}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="md:hidden divide-y divide-gray-50">
          {ALL_CLASSES.map((c, i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{fmt(c.date)} · {c.time}h</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.teacher}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_STYLES[c.type]}`}>{c.type}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status]}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
