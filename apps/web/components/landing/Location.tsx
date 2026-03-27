const SEDES = [
  { name: "Sede Centro", address: "Calle Gran Vía 45, 28013 Madrid", metro: "Gran Vía (L1, L5)", hours: "L-V 9-14h / 16-20h · S 9-14h" },
  { name: "Sede Chamberí", address: "Calle Fuencarral 110, 28010 Madrid", metro: "Bilbao (L1, L4)", hours: "L-V 9-14h / 16-20h · S 9-14h" },
  { name: "Sede Vallecas", address: "Av. de la Albufera 55, 28018 Madrid", metro: "Vinateros (L5)", hours: "L-V 9-14h / 16-20h" },
  { name: "Sede Móstoles", address: "Calle Ángel 12, 28931 Móstoles", metro: "Móstoles Central (C5)", hours: "L-V 9-14h / 16-20h · S 9-14h" },
];

export default function Location() {
  return (
    <section id="ubicacion" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Dónde estamos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            4 sedes en Madrid
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Siempre cerca de ti. Matricúlate en cualquier sede y puedes hacer las clases en cualquiera de ellas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-96">
            <iframe
              title="Ubicación Autoescuela Madrid Centro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12145.439939283398!2d-3.7037902!3d40.4200028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sGran%20V%C3%ADa%2C%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Lista sedes */}
          <div className="space-y-4">
            {SEDES.map((sede, i) => (
              <div key={sede.name} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{sede.name}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">{sede.address}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Metro {sede.metro}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {sede.hours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
