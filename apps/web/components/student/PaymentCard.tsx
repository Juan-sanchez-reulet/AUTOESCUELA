"use client";

interface PaymentItem {
  label: string;
  amount: number;
}

const PAID_ITEMS: PaymentItem[] = [
  { label: "Matrícula", amount: 150 },
  { label: "8 clases prácticas (×35€)", amount: 280 },
];

const PENDING_ITEMS: PaymentItem[] = [
  { label: "6 clases prácticas (×35€)", amount: 210 },
  { label: "Uso vehículo examen", amount: 65 },
  { label: "Tasas DGT examen práctico", amount: 94 },
];

const TOTAL_PAID = PAID_ITEMS.reduce((s, i) => s + i.amount, 0);
const TOTAL_PENDING = PENDING_ITEMS.reduce((s, i) => s + i.amount, 0);
const GRAND_TOTAL = TOTAL_PAID + TOTAL_PENDING;
const PAID_PERCENT = Math.round((TOTAL_PAID / GRAND_TOTAL) * 100);

function formatEur(amount: number): string {
  return `${amount.toLocaleString("es-ES")}€`;
}

export default function PaymentCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Estado de pagos</h2>
        <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
          {PAID_PERCENT}% pagado
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${PAID_PERCENT}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-green-600 font-semibold">
            Pagado: {formatEur(TOTAL_PAID)}
          </span>
          <span className="text-xs text-amber-600 font-semibold">
            Pendiente: {formatEur(TOTAL_PENDING)}
          </span>
        </div>
      </div>

      {/* Two columns: paid + pending */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Paid section */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-green-800">Pagado</h3>
          </div>

          <ul className="space-y-2 mb-3">
            {PAID_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start justify-between gap-2">
                <span className="text-xs text-green-700 leading-relaxed">{item.label}</span>
                <span className="text-xs font-semibold text-green-700 shrink-0">
                  {formatEur(item.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-green-200 pt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-green-800">Total pagado</span>
            <span className="text-base font-black text-green-700">{formatEur(TOTAL_PAID)}</span>
          </div>
        </div>

        {/* Pending section */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-amber-800">Pendiente</h3>
          </div>

          <ul className="space-y-2 mb-3">
            {PENDING_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start justify-between gap-2">
                <span className="text-xs text-amber-700 leading-relaxed">{item.label}</span>
                <span className="text-xs font-semibold text-amber-700 shrink-0">
                  {formatEur(item.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-amber-200 pt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-amber-800">Total pendiente</span>
            <span className="text-base font-black text-amber-600">{formatEur(TOTAL_PENDING)}</span>
          </div>
        </div>
      </div>

      {/* Grand total */}
      <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Coste total del proceso</span>
        <span className="text-lg font-black text-gray-900">{formatEur(GRAND_TOTAL)}</span>
      </div>

      {/* CTA hint */}
      <p className="text-xs text-gray-400 mt-3 text-center">
        Para realizar un pago, contacta con la autoescuela en{" "}
        <a href="tel:912345678" className="text-blue-600 hover:underline font-medium">
          91 234 56 78
        </a>
      </p>
    </div>
  );
}
