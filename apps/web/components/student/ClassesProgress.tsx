"use client";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const UPCOMING_CLASSES = [
  { date: addDays(today, 2), time: "10:00", teacher: "Javier Moreno", type: "Práctica" },
  { date: addDays(today, 5), time: "16:00", teacher: "Ana López", type: "Práctica" },
  { date: addDays(today, 8), time: "10:00", teacher: "Javier Moreno", type: "Práctica" },
  { date: addDays(today, 12), time: "18:00", teacher: "Ana López", type: "Práctica" },
  { date: addDays(today, 15), time: "11:00", teacher: "Carlos Ruiz", type: "Teórica" },
];

const COMPLETED = 8;
const UPCOMING_SCHEDULED = 4;
const REMAINING = 6;
const TOTAL = COMPLETED + UPCOMING_SCHEDULED + REMAINING; // 18, but display 14 planned

const DISPLAY_TOTAL = 14; // "Media: 14 clases para el carnet B"
const PROGRESS_PERCENT = Math.round((COMPLETED / DISPLAY_TOTAL) * 100);

interface StatBadgeProps {
  value: number;
  label: string;
  color: "green" | "blue" | "gray";
}

function StatBadge({ value, label, color }: StatBadgeProps) {
  const colorMap = {
    green: "bg-green-50 text-green-700 border-green-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };
  const numColorMap = {
    green: "text-green-600",
    blue: "text-blue-600",
    gray: "text-gray-500",
  };

  return (
    <div className={`flex flex-col items-center border rounded-xl px-4 py-3 ${colorMap[color]}`}>
      <span className={`text-2xl font-black ${numColorMap[color]}`}>{value}</span>
      <span className="text-xs font-medium mt-0.5 text-center leading-tight">{label}</span>
    </div>
  );
}

export default function ClassesProgress() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Progreso de clases</h2>
        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full font-medium">
          Carnet B
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatBadge value={COMPLETED} label="Completadas" color="green" />
        <StatBadge value={UPCOMING_SCHEDULED} label="Programadas" color="blue" />
        <StatBadge value={REMAINING} label="Por planificar" color="gray" />
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-600">
            {COMPLETED} de {DISPLAY_TOTAL} clases realizadas
          </span>
          <span className="text-xs font-bold text-green-600">{PROGRESS_PERCENT}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${PROGRESS_PERCENT}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          Media: {DISPLAY_TOTAL} clases para el carnet B
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-50 my-4" />

      {/* Next classes list */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Próximas clases
        </p>
        <ul className="space-y-2">
          {UPCOMING_CLASSES.slice(0, 3).map((cls, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 text-xs font-bold">
                    {cls.date.getDate()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {cls.date.toLocaleDateString("es-ES", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-500">{cls.teacher}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-700">{cls.time}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    cls.type === "Teórica"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {cls.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
