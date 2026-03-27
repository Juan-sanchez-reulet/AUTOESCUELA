export default function WhyUs() {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Profesores certificados DGT",
      desc: "Todo nuestro equipo tiene la acreditación oficial de la Dirección General de Tráfico y experiencia mínima de 5 años.",
      color: "blue",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
        </svg>
      ),
      title: "Clases online y presenciales",
      desc: "Estudia el teórico a tu ritmo, en horario de mañana o tarde, en nuestros centros o desde casa por Zoom.",
      color: "purple",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "App de test gratuita",
      desc: "Más de 5.000 preguntas DGT actualizadas, simulacros cronometrados y modo repaso. iOS y Android.",
      color: "green",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Resultados examen online",
      desc: "Consulta tus resultados el mismo día del examen en nuestra plataforma. Te notificamos por SMS y email.",
      color: "orange",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Grupos reducidos",
      desc: "Máximo 8 alumnos por clase teórica para garantizar atención personalizada y resolver todas tus dudas.",
      color: "teal",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Asistente IA 24/7",
      desc: "Resuelve tus dudas a cualquier hora con nuestro asistente virtual. Precios, requisitos, proceso… siempre disponible.",
      color: "indigo",
    },
  ];

  const colorMap: Record<string, string> = {
    blue:   "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green:  "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    teal:   "bg-teal-50 text-teal-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Por qué elegirnos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Todo lo que necesitas para aprobar
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Llevamos más de una década perfeccionando el proceso para que sacar el carnet sea lo más fácil posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className={`${colorMap[f.color]} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
