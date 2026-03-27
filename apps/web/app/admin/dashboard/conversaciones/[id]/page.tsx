"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export default function ConversationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Intentar cargar de mock conversations o de sesión viva
    Promise.any([
      fetch(`${API}/conversations/${id}/messages`).then((r) => r.json()),
      fetch(`${API}/chat/history/${id}`).then((r) => r.json()),
    ])
      .then((data) => {
        const msgs = data.messages || [];
        setMessages(msgs);
      })
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, [id]);

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/conversaciones" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Conversación</h1>
          <p className="text-xs text-gray-400 font-mono">{id}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`h-16 w-64 rounded-2xl animate-pulse ${i % 2 === 0 ? "bg-blue-100" : "bg-gray-100"}`} />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <p className="text-3xl mb-2">🔍</p>
            <p>No hay mensajes para esta conversación.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                    IA
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-gray-100 text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">
                    {msg.created_at ? formatTime(msg.created_at) : ""}
                  </span>
                </div>
                {msg.role === "user" && (
                  <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                    A
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
