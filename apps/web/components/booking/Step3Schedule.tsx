"use client";

import { useState, useEffect } from "react";

interface TeacherInfo {
  id: string;
  name: string;
  licenses: string[];
}

interface SlotItem {
  time: string;
  datetime: string;
  available: boolean;
  teachers_available?: TeacherInfo[];
}

interface DayData {
  date: string;
  weekday: string;
  slots: SlotItem[];
}

interface Props {
  data: Partial<{ classType: string; licenseType: string }>;
  onConfirm: (d: { scheduledAt: string; scheduledLabel: string }) => void;
  onBack: () => void;
}

function getTeacherShortName(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1][0]}.`;
  }
  return name;
}

export default function Step3Schedule({ data, onConfirm, onBack }: Props) {
  const [availability, setAvailability] = useState<Record<string, DayData>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => {
        setAvailability(d.availability || {});
        // Preseleccionar el primer día disponible
        const firstDay = Object.keys(d.availability || {})[0];
        if (firstDay) setSelectedDay(firstDay);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const days = Object.values(availability).slice(0, 14);
  const selectedDayData = availability[selectedDay];

  const CLASS_LABELS: Record<string, string> = {
    practica: "Clase práctica",
    teorica: "Clase teórica",
    consulta: "Consulta gratuita",
  };

  function formatDateLabel(dateStr: string, time: string) {
    const date = new Date(dateStr);
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${dayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()]} a las ${time}`;
  }

  function getSlotTeacherLabel(slot: SlotItem): string | null {
    const teachers = slot.teachers_available;
    if (!teachers || teachers.length === 0) return null;
    const firstName = getTeacherShortName(teachers[0].name);
    if (teachers.length === 1) return firstName;
    return `${firstName} +${teachers.length - 1} más`;
  }

  const selectedTeacher =
    selectedSlot?.teachers_available && selectedSlot.teachers_available.length > 0
      ? selectedSlot.teachers_available[0]
      : null;

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-700">Reservando:</span>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {CLASS_LABELS[data.classType || "practica"]} · {data.licenseType}
          </span>
        </div>
        <p className="text-xs text-gray-500">Sesiones de 1 hora · Lunes a Sábado</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Day selector */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Selecciona el día</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map((day) => {
                const [, , d] = day.date.split("-");
                const hasAvailable = day.slots.some((s) => s.available);
                return (
                  <button
                    key={day.date}
                    onClick={() => { setSelectedDay(day.date); setSelectedSlot(null); }}
                    disabled={!hasAvailable}
                    className={`flex-shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border-2 transition-all min-w-[58px] ${
                      selectedDay === day.date
                        ? "border-blue-600 bg-blue-50"
                        : hasAvailable
                        ? "border-gray-200 hover:border-blue-300"
                        : "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <span className={`text-xs font-medium ${selectedDay === day.date ? "text-blue-600" : "text-gray-500"}`}>
                      {day.weekday}
                    </span>
                    <span className={`text-lg font-bold leading-none mt-0.5 ${selectedDay === day.date ? "text-blue-700" : "text-gray-900"}`}>
                      {d}
                    </span>
                    <span className={`text-xs ${selectedDay === day.date ? "text-blue-500" : "text-gray-400"}`}>
                      {new Date(day.date).toLocaleString("es", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          {selectedDayData && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Horario disponible</h4>
              <div className="grid grid-cols-4 gap-2">
                {selectedDayData.slots.map((slot) => {
                  const teacherLabel = getSlotTeacherLabel(slot);
                  const isSelected = selectedSlot?.time === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={!slot.available}
                      className={`py-2 px-1 rounded-lg text-sm font-medium transition-all border flex flex-col items-center gap-0.5 min-h-[56px] justify-center ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : slot.available
                          ? "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
                          : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                      }`}
                    >
                      <span>{slot.time}</span>
                      {teacherLabel && slot.available && (
                        <span
                          className={`text-[10px] font-normal leading-tight truncate max-w-full px-0.5 ${
                            isSelected ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          {teacherLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected summary */}
          {selectedSlot && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-green-800 font-medium">
                  {formatDateLabel(selectedDay, selectedSlot.time)}
                </p>
                {selectedTeacher && (
                  <p className="text-xs text-green-600 mt-0.5">
                    Profesor: {selectedTeacher.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={() =>
            selectedSlot &&
            onConfirm({
              scheduledAt: selectedSlot.datetime,
              scheduledLabel: formatDateLabel(selectedDay, selectedSlot.time),
            })
          }
          disabled={!selectedSlot}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Confirmar reserva ✓
        </button>
      </div>
    </div>
  );
}
