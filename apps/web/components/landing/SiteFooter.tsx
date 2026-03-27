export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg">A</div>
              <span className="text-white font-bold text-lg">Autoescuela Madrid Centro</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Más de 10 años formando conductores seguros en Madrid. Centro autorizado por la DGT.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:912345678" className="hover:text-white transition-colors">91 234 56 78</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@autoescuelamadridcentro.es" className="hover:text-white transition-colors">
                  info@autoescuelamadridcentro.es
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Carnets</h4>
            <ul className="space-y-2 text-sm">
              {["Carnet B", "Carnet A2", "Carnet A", "Carnet AM", "Microcar", "Carnet B+E"].map((item) => (
                <li key={item}>
                  <a href="#precios" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Información</h4>
            <ul className="space-y-2 text-sm">
              {["Sobre nosotros", "Nuestros profesores", "Blog de conducción", "Preguntas frecuentes", "Política de privacidad", "Aviso legal"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold mt-6 mb-3 text-sm">Síguenos</h4>
            <div className="flex gap-3">
              {["Instagram", "Facebook", "TikTok"].map((red) => (
                <a key={red} href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-xs font-bold text-gray-300 hover:text-white transition-colors" title={red}>
                  {red[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2024 Autoescuela Madrid Centro. Todos los derechos reservados.</p>
          <p>Centro DGT autorizado nº 28-001234-B</p>
        </div>
      </div>
    </footer>
  );
}
