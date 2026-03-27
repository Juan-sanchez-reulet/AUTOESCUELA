"use client";

const PAID = [
  { date: "2026-01-15", concepto: "Matrícula (incluye examen teórico y trámites DGT)", importe: 150 },
  { date: "2026-01-22", concepto: "Clase práctica #1 — Javier Moreno",  importe: 35 },
  { date: "2026-01-29", concepto: "Clase práctica #2 — Ana López",       importe: 35 },
  { date: "2026-02-05", concepto: "Clase práctica #3 — Javier Moreno",  importe: 35 },
  { date: "2026-02-12", concepto: "Clase práctica #4 — Ana López",       importe: 35 },
  { date: "2026-02-19", concepto: "Clase práctica #5 — Javier Moreno",  importe: 35 },
  { date: "2026-02-26", concepto: "Clase práctica #6 — Ana López",       importe: 35 },
  { date: "2026-03-05", concepto: "Clase práctica #7 — Carlos Ruiz",     importe: 35 },
  { date: "2026-03-19", concepto: "Clase práctica #8 — Javier Moreno",  importe: 35 },
];

const PENDING = [
  { concepto: "Clase práctica #9",          importe: 35 },
  { concepto: "Clase práctica #10",         importe: 35 },
  { concepto: "Clase práctica #11",         importe: 35 },
  { concepto: "Clase práctica #12",         importe: 35 },
  { concepto: "Clase práctica #13",         importe: 35 },
  { concepto: "Clase práctica #14",         importe: 35 },
  { concepto: "Uso del vehículo para examen práctico", importe: 65 },
  { concepto: "Tasas examen práctico DGT (aprox.)",    importe: 94 },
];

const totalPaid    = PAID.reduce((s, r) => s + r.importe, 0);
const totalPending = PENDING.reduce((s, r) => s + r.importe, 0);
const totalCourse  = totalPaid + totalPending;
const paidPct      = Math.round((totalPaid / totalCourse) * 100);

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
}

export default function PagosPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Mis pagos</h1>
        <p className="text-gray-500 mt-1">Resumen de pagos realizados y pendientes.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <p className="text-3xl font-extrabold text-green-600">{totalPaid} €</p>
          <p className="text-xs text-green-700 font-medium mt-1">Total pagado</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-center">
          <p className="text-3xl font-extrabold text-yellow-600">{totalPending} €</p>
          <p className="text-xs text-yellow-700 font-medium mt-1">Total pendiente</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
          <p className="text-3xl font-extrabold text-gray-900">{totalCourse} €</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Total del curso</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Progreso de pago</span>
          <span className="text-gray-500">{paidPct}% abonado</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${paidPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Pagado: {totalPaid} €</span>
          <span>Pendiente: {totalPending} €</span>
        </div>
      </div>

      {/* Pagos realizados */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <h2 className="font-bold text-gray-900">Pagos realizados</h2>
          <span className="ml-auto text-sm font-semibold text-green-600">{totalPaid} €</span>
        </div>
        <div className="divide-y divide-gray-50">
          {PAID.map((row, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <div className="text-xs text-gray-400 w-24 flex-shrink-0">{fmtDate(row.date)}</div>
              <p className="text-sm text-gray-700 flex-1 min-w-0">{row.concepto}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900">{row.importe} €</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Pagado</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagos pendientes */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
          <h2 className="font-bold text-gray-900">Pagos pendientes</h2>
          <span className="ml-auto text-sm font-semibold text-yellow-600">{totalPending} €</span>
        </div>
        <div className="divide-y divide-gray-50">
          {PENDING.map((row, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <p className="text-sm text-gray-700 flex-1 min-w-0">{row.concepto}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900">{row.importe} €</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">Pendiente</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA pago */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-blue-900">¿Quieres abonar algún pago?</p>
          <p className="text-sm text-blue-700 mt-0.5">
            Llámanos al <a href="tel:912345678" className="font-bold underline">91 234 56 78</a> o escríbenos a{" "}
            <a href="mailto:info@autoescuelamadridcentro.es" className="font-bold underline">info@autoescuelamadridcentro.es</a>.
            Aceptamos tarjeta, transferencia y efectivo.
          </p>
        </div>
      </div>
    </div>
  );
}
