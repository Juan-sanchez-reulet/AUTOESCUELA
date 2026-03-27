"use client";

import { useEffect, useState } from "react";

function getExamDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 45);
  d.setHours(10, 0, 0, 0);
  return d;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calculateTimeLeft(examDate: Date): TimeLeft {
  const diff = examDate.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function ExamCountdown() {
  const [examDate] = useState<Date>(getExamDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(getExamDate())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(examDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  if (timeLeft.expired) {
    return (
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <p className="text-sm font-medium text-green-100 mb-2">Examen teórico</p>
        <p className="text-2xl font-bold">¡Examen completado! 🎉</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
      <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-4">
        Tiempo hasta tu examen teórico
      </p>

      {/* Days — large */}
      <div className="flex items-end gap-4 mb-4">
        <div className="text-center">
          <div className="text-7xl font-black leading-none tabular-nums">
            {timeLeft.days}
          </div>
          <div className="text-blue-300 text-xs font-semibold uppercase tracking-widest mt-1">
            días
          </div>
        </div>

        {/* Separator */}
        <div className="text-blue-400 text-3xl font-thin mb-4">:</div>

        {/* Hours / Minutes / Seconds — smaller */}
        <div className="flex items-end gap-2 mb-1">
          <div className="text-center">
            <div className="text-3xl font-bold tabular-nums leading-none">
              {pad(timeLeft.hours)}
            </div>
            <div className="text-blue-300 text-xs font-medium uppercase tracking-wider mt-1">
              h
            </div>
          </div>
          <div className="text-blue-400 text-xl font-thin mb-3">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold tabular-nums leading-none">
              {pad(timeLeft.minutes)}
            </div>
            <div className="text-blue-300 text-xs font-medium uppercase tracking-wider mt-1">
              min
            </div>
          </div>
          <div className="text-blue-400 text-xl font-thin mb-3">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold tabular-nums leading-none">
              {pad(timeLeft.seconds)}
            </div>
            <div className="text-blue-300 text-xs font-medium uppercase tracking-wider mt-1">
              seg
            </div>
          </div>
        </div>
      </div>

      {/* Exam date hint */}
      <div className="bg-blue-700/50 rounded-xl px-4 py-2 mt-2 inline-block">
        <p className="text-xs text-blue-200">
          Fecha del examen:{" "}
          <span className="font-semibold text-white">
            {examDate.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
