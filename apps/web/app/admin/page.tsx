"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600)); // Simula llamada

    if (email === "admin@autoescuelamadrid.com" && password === "demo2024") {
      localStorage.setItem("amc_admin_token", "demo-token-2024");
      router.push("/admin/dashboard");
    } else {
      setError("Credenciales incorrectas. Usa admin@autoescuelamadrid.com / demo2024");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-3">A</div>
          <h1 className="font-bold text-gray-900 text-xl">Autoescuela Madrid Centro</h1>
          <p className="text-gray-500 text-sm mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@autoescuelamadrid.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Entrando...</>
            ) : (
              "Entrar al panel"
            )}
          </button>

          <p className="text-center text-xs text-gray-400 pt-1">
            Demo: admin@autoescuelamadrid.com · demo2024
          </p>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Volver a la web</a>
        </p>
      </div>
    </div>
  );
}
