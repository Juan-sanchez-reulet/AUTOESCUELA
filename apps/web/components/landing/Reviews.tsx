const REVIEWS = [
  {
    name: "Alejandro Pérez M.",
    initials: "AP",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Aprobé el práctico al primer intento después de solo 14 clases. Mi instructor Javier es un crack — paciente, explica muy bien los errores y te da confianza. La app de test también es buenísima para repasar.",
    color: "bg-blue-600",
  },
  {
    name: "Sofía Ramírez T.",
    initials: "SR",
    rating: 5,
    date: "Hace 1 mes",
    text: "Llevaba años queriendo sacarme el carnet pero le tenía miedo. En Autoescuela Madrid Centro me lo hicieron muy fácil. Las clases online son comodísimas y el asistente de la web me resolvió mil dudas antes de matricularme.",
    color: "bg-purple-600",
  },
  {
    name: "Diego Martín V.",
    initials: "DM",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Vine de otra autoescuela donde perdí tiempo y dinero. Aquí desde el primer día notas la diferencia: profesionales, organizados y con buenas instalaciones. El proceso de reservar clases online es súper cómodo.",
    color: "bg-green-600",
  },
  {
    name: "Carmen Iglesias R.",
    initials: "CI",
    rating: 5,
    date: "Hace 5 días",
    text: "Me saqué el A2 en 3 meses sin haber montado nunca en moto. El instructor tiene mucha paciencia y vas progresando a tu ritmo. Las instalaciones de la sede de Chamberí son muy nuevas. 100% recomendable.",
    color: "bg-orange-600",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Reseñas de alumnos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Lo que dicen nuestros alumnos
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars count={5} />
            <span className="font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">· +340 reseñas en Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${r.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.date}</div>
                </div>
                <div className="ml-auto">
                  <Stars count={r.rating} />
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-3 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#4285F4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs text-gray-400">Google</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
