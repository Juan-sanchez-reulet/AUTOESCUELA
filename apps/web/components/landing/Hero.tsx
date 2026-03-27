"use client";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1800&q=80"
          alt="Conducción en Madrid"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/75 to-blue-800/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Asistente disponible ahora
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Tu carnet de conducir
            <br />
            <span className="text-blue-300">en Madrid,</span>
            <br />
            sin complicaciones
          </h1>

          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Más de 10 años formando conductores.{" "}
            <strong className="text-white">4 sedes en Madrid</strong>, clases online y
            presenciales, y el apoyo de nuestro asistente IA 24/7.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="group bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar clase
            </button>
            <a
              href="#precios"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Ver precios
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14">
            {[
              { value: "+2.500", label: "Alumnos formados" },
              { value: "94%", label: "Aprueban al 1er intento" },
              { value: "4", label: "Sedes en Madrid" },
              { value: "10+", label: "Años de experiencia" },
            ].map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-200 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
