"use client";

interface CarnetCardsProps {
  onOpenBooking: () => void;
}

const CARNETS = [
  {
    id: "B",
    name: "Carnet B",
    subtitle: "Turismo y furgoneta",
    price: "desde 150€",
    description: "El más solicitado. Conduce coches, furgonetas y vehículos hasta 3.500 kg.",
    age: "Desde 18 años",
    color: "blue",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M6 30L9 18h30l3 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="4" y="30" width="40" height="10" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="13" cy="40" r="3.5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="35" cy="40" r="3.5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M12 24h6M22 24h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "A2",
    name: "Carnet A2",
    subtitle: "Moto hasta 35 kW",
    price: "desde 380€",
    description: "Para motos de hasta 47 CV. El paso previo al A sin restricciones.",
    age: "Desde 18 años",
    color: "purple",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 32c0-6 4-10 10-10h4l6-8h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="10" cy="35" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="38" cy="35" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M30 18l4 6-4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "A",
    name: "Carnet A",
    subtitle: "Moto sin restricciones",
    price: "desde 280€",
    description: "Conduce cualquier moto. Acceso directo con 24 años o 2 años con A2.",
    age: "Desde 24 años",
    color: "orange",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 32c0-6 4-10 10-10h4l6-9h9l2 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="35" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="38" cy="35" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M34 14a3 3 0 110-6 3 3 0 010 6z" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: "AM",
    name: "Carnet AM",
    subtitle: "Ciclomotor y scooter",
    price: "desde 220€",
    description: "Ciclomotores de 2 y 3 ruedas hasta 50cc. El primer carnet de muchos.",
    age: "Desde 15 años",
    color: "green",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M14 32c0-4 3-7 7-7h4l4-7h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="35" r="4" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="36" cy="35" r="4" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: "Microcar",
    name: "Microcar",
    subtitle: "Cuadriciclo ligero",
    price: "desde 180€",
    description: "Conduce un vehículo de 4 ruedas sin necesitar el carnet B. Hasta 80 km/h.",
    age: "Desde 16 años",
    color: "teal",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="18" width="36" height="16" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M12 18v-4a4 4 0 014-4h16a4 4 0 014 4v4" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="14" cy="34" r="3" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="34" cy="34" r="3" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: "B+E",
    name: "Carnet B+E",
    subtitle: "Remolque pesado",
    price: "desde 320€",
    description: "Arrastra remolques de más de 750 kg. Requiere tener el carnet B.",
    age: "Con carnet B",
    color: "red",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M4 30L7 20h18l3 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="2" y="30" width="28" height="8" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="9" cy="38" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="23" cy="38" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="30" y="24" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="37" cy="38" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M30 31h-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; badge: string; btn: string }> = {
  blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   badge: "bg-blue-100 text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-100 text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700", btn: "bg-orange-600 hover:bg-orange-700" },
  green:  { bg: "bg-green-50",  icon: "text-green-600",  badge: "bg-green-100 text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  teal:   { bg: "bg-teal-50",   icon: "text-teal-600",   badge: "bg-teal-100 text-teal-700",   btn: "bg-teal-600 hover:bg-teal-700" },
  red:    { bg: "bg-red-50",    icon: "text-red-600",    badge: "bg-red-100 text-red-700",    btn: "bg-red-600 hover:bg-red-700" },
};

export default function CarnetCards({ onOpenBooking }: CarnetCardsProps) {
  return (
    <section id="precios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Nuestros carnets</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            ¿Qué carnet necesitas?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Ofrecemos todos los tipos de carnet. Elige el tuyo y reserva una consulta gratuita.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARNETS.map((carnet) => {
            const c = COLOR_MAP[carnet.color];
            return (
              <div
                key={carnet.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* Icon */}
                <div className={`${c.bg} ${c.icon} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                  {carnet.icon}
                </div>

                {/* Info */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{carnet.name}</h3>
                    <p className="text-sm text-gray-500">{carnet.subtitle}</p>
                  </div>
                  <span className={`${c.badge} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                    {carnet.age}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 flex-1">{carnet.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">{carnet.price}</span>
                  <button
                    onClick={onOpenBooking}
                    className={`${c.btn} text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors`}
                  >
                    Reservar →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA consulta gratuita */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">¿No sabes qué carnet te conviene?</p>
          <button
            onClick={onOpenBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            Primera consulta gratuita →
          </button>
        </div>
      </div>
    </section>
  );
}
