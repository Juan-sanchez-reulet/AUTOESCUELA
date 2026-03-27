"use client";

import { BookingData } from "./BookingModal";

const CLASS_LABELS: Record<string, string> = {
  practica: "Clase práctica",
  teorica: "Clase teórica",
  consulta: "Primera consulta gratuita",
};

const LEVEL_LABELS: Record<string, string> = {
  sin_experiencia: "Sin experiencia",
  algo_experiencia: "Algo de experiencia",
  casi_listo: "Casi listo para el examen",
};

interface Props {
  bookingRef: string;
  data: BookingData;
  onClose: () => void;
}

export default function BookingConfirmation({ bookingRef, data, onClose }: Props) {
  return (
    <div className="p-8 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-2xl font-extrabold text-gray-900 mb-1">¡Reserva confirmada!</h3>
      <p className="text-gray-500 mb-6">Te esperamos. Recibirás un recordatorio por WhatsApp.</p>

      {/* Booking ref */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">Número de reserva</p>
        <p className="text-3xl font-extrabold text-blue-700">{bookingRef}</p>
        <p className="text-xs text-blue-500 mt-1">Guarda este número para consultas</p>
      </div>

      {/* Details */}
      <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
        <h4 className="font-semibold text-gray-700 text-sm mb-2">Resumen de tu reserva</h4>

        {[
          { label: "Alumno", value: data.studentName },
          { label: "Teléfono", value: data.studentPhone },
          { label: "Tipo de clase", value: CLASS_LABELS[data.classType] || data.classType },
          { label: "Carnet", value: data.licenseType },
          { label: "Fecha y hora", value: data.scheduledLabel },
          ...(data.studentLevel ? [{ label: "Nivel", value: LEVEL_LABELS[data.studentLevel] || data.studentLevel }] : []),
        ].map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <span className="text-gray-500 text-sm">{row.label}</span>
            <span className="text-gray-900 text-sm font-medium text-right">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-6 text-left flex gap-2">
        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-yellow-800">
          Si necesitas cambiar la cita llama al <strong>91 234 56 78</strong> con al menos 24h de antelación.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Cerrar
      </button>
    </div>
  );
}
