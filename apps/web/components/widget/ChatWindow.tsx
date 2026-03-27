"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  onClose: () => void;
  onOpenBooking: () => void;
}

function TypingDots() {
  return (
    <div className="flex items-end gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  // Simple markdown: bold, listas, saltos de línea
  const lines = text.split("\n");
  return (
    <div className="chat-prose text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <p key={i} className="flex gap-1.5">
              <span className="text-blue-400 mt-0.5">•</span>
              <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </p>
          );
        }
        if (line === "") return <br key={i} />;
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
        );
      })}
    </div>
  );
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "¡Hola! 👋 Soy el asistente de **Autoescuela Madrid Centro**. Puedo ayudarte con:\n- Precios y tipos de carnet\n- Horarios y sedes\n- Proceso para sacar el carnet\n\n¿En qué te puedo ayudar?",
};

const QUICK_QUESTIONS = [
  "¿Cuánto cuesta el carnet B?",
  "¿Cuántas clases necesito?",
  "¿Hay clases online?",
];

export default function ChatWindow({ onClose, onOpenBooking }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingCta, setShowBookingCta] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // session_id persistido en localStorage
  const sessionId = useRef<string>("");
  useEffect(() => {
    let id = localStorage.getItem("amc_session_id");
    if (!id) {
      id = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("amc_session_id", id);
    }
    sessionId.current = id;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Mostrar CTA reserva tras 2+ respuestas del asistente
  useEffect(() => {
    const assistantCount = messages.filter((m) => m.role === "assistant").length;
    if (assistantCount >= 2) setShowBookingCta(true);
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId.current,
          business_id: "autoescuela-madrid-centro",
          message: content,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "Lo siento, no pude procesar tu mensaje. Intenta de nuevo." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Lo siento, hay un problema de conexión. Por favor, inténtalo de nuevo en unos momentos." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-700 px-4 py-3 flex items-center gap-3">
        <div className="bg-white/20 w-9 h-9 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Asistente Madrid Centro</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="text-blue-200 text-xs">En línea</span>
          </div>
        </div>
        <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors p-1 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-1 flex-shrink-0">
                A
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
              }`}
            >
              {msg.role === "assistant" ? (
                <MarkdownText text={msg.content} />
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-1 flex-shrink-0">
              A
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
              <TypingDots />
            </div>
          </div>
        )}

        {/* CTA Reserva */}
        {showBookingCta && !isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <p className="text-sm text-blue-800 font-medium mb-2">¿Quieres reservar una clase?</p>
            <button
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors w-full"
            >
              Reservar clase →
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-blue-200"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">Powered by Claude AI · Madrid Centro</p>
      </div>
    </div>
  );
}
