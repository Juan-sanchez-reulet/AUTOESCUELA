"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalConversations: number;
  totalBookings: number;
  todayBookings: number;
  conversionRate: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({ totalConversations: 0, totalBookings: 0, todayBookings: 0, conversionRate: 0 });
  const [recentBookings, setRecentBookings] = useState<{id: string; booking_ref: string; student_name: string; class_type: string; license_type: string; scheduled_at: string; status: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/conversations").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
    ])
      .then(([convData, bookingData]) => {
        const conversations = convData.conversations || [];
        const bookings = bookingData.bookings || [];
        const today = new Date().toDateString();
        const todayBookings = bookings.filter((b: {created_at: string}) => new Date(b.created_at).toDateString() === today);

        setStats({
          totalConversations: conversations.length,
          totalBookings: bookings.length,
          todayBookings: todayBookings.length,
          conversionRate: conversations.length > 0 ? Math.round((bookings.length / conversations.length) * 100) : 0,
        });
        setRecentBookings(bookings.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const STATUS_COLORS: Record<string, string> = {
    confirmada: "bg-green-100 text-green-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    cancelada: "bg-red-100 text-red-700",
    completada: "bg-gray-100 text-gray-600",
  };

  const CLASS_LABELS: Record<string, string> = {
    practica: "Práctica",
    teorica: "Teórica",
    consulta: "Consulta",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Bienvenido 👋</h1>
        <p className="text-gray-500 mt-1">Aquí tienes un resumen de la actividad de hoy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Conversaciones totales", value: stats.totalConversations, icon: "💬", color: "text-blue-600" },
          { label: "Reservas totales", value: stats.totalBookings, icon: "📅", color: "text-green-600" },
          { label: "Reservas hoy", value: stats.todayBookings, icon: "🔥", color: "text-orange-600" },
          { label: "Tasa de conversión", value: `${stats.conversionRate}%`, icon: "📈", color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-extrabold ${stat.color}`}>{loading ? "—" : stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Últimas reservas</h2>
          <Link href="/admin/dashboard/reservas" className="text-sm text-blue-600 hover:text-blue-700">
            Ver todas →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">No hay reservas aún.</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                  {b.student_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{b.student_name}</p>
                  <p className="text-xs text-gray-500">
                    {CLASS_LABELS[b.class_type]} · {b.license_type} · {new Date(b.scheduled_at).toLocaleDateString("es", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-600"}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/dashboard/conversaciones" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl p-5 flex items-center gap-4 transition-colors">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Ver conversaciones</p>
            <p className="text-sm text-blue-600">Historial completo del chat IA</p>
          </div>
        </Link>
        <Link href="/admin/dashboard/reservas" className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-5 flex items-center gap-4 transition-colors">
          <div className="bg-green-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-green-900">Gestionar reservas</p>
            <p className="text-sm text-green-600">Tabla completa de bookings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
