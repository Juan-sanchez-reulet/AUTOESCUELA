"use client";

import { useEffect, useState } from "react";

interface Teacher {
  id: string;
  name: string;
  licenses: string[];
  schedule: Record<string, number[]>;
}

interface TeachersResponse {
  teachers: Teacher[];
}

const LICENSE_COLORS: Record<string, string> = {
  B: "bg-blue-100 text-blue-700",
  A2: "bg-purple-100 text-purple-700",
  A: "bg-orange-100 text-orange-700",
  AM: "bg-green-100 text-green-700",
  "B+E": "bg-red-100 text-red-700",
};

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-orange-500",
];

const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Morning: 9-13 (hours 9,10,11,12,13), Afternoon: 14-19 (hours 14,15,16,17,18,19)
const MORNING_HOURS = [9, 10, 11, 12, 13];
const AFTERNOON_HOURS = [14, 15, 16, 17, 18, 19];

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ScheduleGrid({ schedule }: { schedule: Record<string, number[]> }) {
  // Weekdays 0-5 (Mon-Sat), skip Sunday (6)
  const weekdays = [0, 1, 2, 3, 4, 5];

  function hasHours(weekday: number, hours: number[]): boolean {
    const dayHours: number[] = schedule[String(weekday)] ?? [];
    return hours.some((h) => dayHours.includes(h));
  }

  return (
    <div className="mt-3">
      {/* Header row */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        <div className="col-span-1" /> {/* empty label cell */}
        {weekdays.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase">
            {WEEKDAY_LABELS[d]}
          </div>
        ))}
      </div>

      {/* Morning row */}
      <div className="grid grid-cols-7 gap-1 mb-1 items-center">
        <div className="text-[10px] text-gray-400 font-medium text-right pr-1 leading-tight">
          Mañ.
        </div>
        {weekdays.map((d) => {
          const active = hasHours(d, MORNING_HOURS);
          return (
            <div
              key={d}
              title={active ? `Mañana disponible` : `No trabaja`}
              className={`h-5 rounded-sm ${active ? "bg-emerald-400" : "bg-gray-100"}`}
            />
          );
        })}
      </div>

      {/* Afternoon row */}
      <div className="grid grid-cols-7 gap-1 items-center">
        <div className="text-[10px] text-gray-400 font-medium text-right pr-1 leading-tight">
          Tarde
        </div>
        {weekdays.map((d) => {
          const active = hasHours(d, AFTERNOON_HOURS);
          return (
            <div
              key={d}
              title={active ? `Tarde disponible` : `No trabaja`}
              className={`h-5 rounded-sm ${active ? "bg-emerald-400" : "bg-gray-100"}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-[10px] text-gray-400">Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100" />
          <span className="text-[10px] text-gray-400">No trabaja</span>
        </div>
      </div>
    </div>
  );
}

function TeacherCard({ teacher, index }: { teacher: Teacher; index: number }) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  function handleEdit() {
    alert("Funcionalidad disponible en versión completa");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`${avatarColor} w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
        >
          {getInitials(teacher.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{teacher.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {teacher.licenses.map((lic) => (
              <span
                key={lic}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  LICENSE_COLORS[lic] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {lic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule grid */}
      <ScheduleGrid schedule={teacher.schedule} />

      {/* Edit button */}
      <button
        onClick={handleEdit}
        className="mt-4 w-full border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
      >
        Editar horario
      </button>
    </div>
  );
}

export default function ProfesoresPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/teachers")
      .then((r) => r.json())
      .then((data: TeachersResponse) => {
        setTeachers(data.teachers || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de profesores</h1>
        <p className="text-sm text-gray-500 mt-1">Horarios y disponibilidad del equipo</p>
      </div>

      {/* Stats bar */}
      {!loading && !error && teachers.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-600 w-9 h-9 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{teachers.length}</p>
              <p className="text-xs text-gray-400 leading-none">Profesores activos</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-100" />
          <div>
            <p className="text-sm text-gray-500">
              Licencias:{" "}
              {Array.from(new Set(teachers.flatMap((t) => t.licenses)))
                .sort()
                .join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">No se pudo cargar la lista de profesores.</p>
          <p className="text-red-400 text-sm mt-1">Verifica que el servidor está activo en localhost:8001</p>
        </div>
      )}

      {/* Teacher cards grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {teachers.map((teacher, i) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && teachers.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-400 font-medium">No hay profesores registrados</p>
        </div>
      )}
    </div>
  );
}
