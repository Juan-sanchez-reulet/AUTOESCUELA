"use client";

import { useState } from "react";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface ClassItem {
  date: Date;
  time: string;
  teacher: string;
  type: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const UPCOMING_CLASSES: ClassItem[] = [
  { date: addDays(today, 2), time: "10:00", teacher: "Javier Moreno", type: "Práctica" },
  { date: addDays(today, 5), time: "16:00", teacher: "Ana López", type: "Práctica" },
  { date: addDays(today, 8), time: "10:00", teacher: "Javier Moreno", type: "Práctica" },
  { date: addDays(today, 12), time: "18:00", teacher: "Ana López", type: "Práctica" },
  { date: addDays(today, 15), time: "11:00", teacher: "Carlos Ruiz", type: "Teórica" },
];

const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  // Monday-first: getDay() returns 0=Sun, 1=Mon, ..., 6=Sat
  // We want Mon=0, so shift: (getDay() + 6) % 7
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  // Pad to complete the last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function MiniCalendar() {
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const cells = getCalendarDays(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedClass(null);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedClass(null);
  }

  function handleDayClick(day: Date) {
    const cls = UPCOMING_CLASSES.find((c) => isSameDay(c.date, day));
    if (cls) {
      setSelectedClass((prev) =>
        prev && isSameDay(prev.date, day) ? null : cls
      );
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Title */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Mis próximas clases
      </h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Mes anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Mes siguiente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-semibold text-gray-400 py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} />;
          }

          const isToday = isSameDay(day, today);
          const hasClass = UPCOMING_CLASSES.some((c) => isSameDay(c.date, day));
          const isSelected = selectedClass
            ? isSameDay(selectedClass.date, day)
            : false;

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={`flex flex-col items-center justify-center rounded-lg py-1 transition-colors ${
                hasClass ? "cursor-pointer hover:bg-blue-50" : "cursor-default"
              } ${isSelected ? "bg-blue-50" : ""}`}
            >
              <span
                className={`text-sm w-7 h-7 flex items-center justify-center rounded-full font-medium ${
                  isToday
                    ? "bg-gray-200 text-gray-800"
                    : isSelected
                    ? "text-blue-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                {day.getDate()}
              </span>
              {hasClass && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          <span className="text-xs text-gray-500">Clase programada</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-gray-200 inline-flex items-center justify-center">
            <span className="text-xs text-gray-600 leading-none">·</span>
          </span>
          <span className="text-xs text-gray-500">Hoy</span>
        </div>
      </div>

      {/* Class detail */}
      {selectedClass && (
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-800">
                {selectedClass.date.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                🕐 {selectedClass.time} — {selectedClass.type}
              </p>
              <p className="text-sm text-blue-600 mt-0.5">
                👤 {selectedClass.teacher}
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                selectedClass.type === "Teórica"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {selectedClass.type}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
