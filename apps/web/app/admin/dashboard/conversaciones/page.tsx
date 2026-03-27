"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Conversation {
  id: string;
  session_id: string;
  created_at: string;
  preview: string;
  message_count: number;
  last_message: string;
  last_role: string;
  isLive?: boolean;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  return `Hace ${Math.floor(hrs / 24)} días`;
}

export default function ConversacionesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((d) => setConversations(d.conversations || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Conversaciones</h1>
        <p className="text-gray-500 mt-1">Historial de chats con el asistente IA.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">💬</p>
            <p className="font-medium">No hay conversaciones aún</p>
            <p className="text-sm mt-1">Las conversaciones del chat aparecerán aquí.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {conversations.map((conv, i) => (
              <Link
                key={conv.id || i}
                href={`/admin/dashboard/conversaciones/${conv.id}`}
                className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                <div className="bg-blue-100 text-blue-700 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {conv.preview?.charAt(0).toUpperCase() || "?"}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-gray-900 truncate">{conv.preview}</p>
                    {conv.isLive && (
                      <span className="flex-shrink-0 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        En vivo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.last_role === "assistant" ? "🤖 " : "👤 "}
                    {conv.last_message}
                  </p>
                </div>

                {/* Meta */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">{timeAgo(conv.created_at)}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.message_count} mensajes</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
