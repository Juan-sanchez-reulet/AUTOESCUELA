"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AlumnoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "alumno@madrid.com" && password === "alumno123") {
        localStorage.setItem("amc_student_token", "demo_token_maria_garcia");
        router.push("/alumno/dashboard");
      } else {
        setError("Correo o contraseña incorrectos. Usa las credenciales de demo.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base">
              A
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:block">
              Autoescuela Madrid Centro
            </span>
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </nav>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                A
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Portal del Alumno
              </h1>
              <p className="text-sm text-gray-500">
                Accede a tu progreso, clases y pagos
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">
                Credenciales de demo
              </p>
              <p className="text-sm text-blue-600">
                <span className="font-medium">Email:</span> alumno@madrid.com
              </p>
              <p className="text-sm text-blue-600">
                <span className="font-medium">Contraseña:</span> alumno123
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? "Entrando..." : "Acceder al portal"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              ¿Problemas para acceder?{" "}
              <a href="tel:912345678" className="text-blue-600 hover:underline">
                Llámanos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
