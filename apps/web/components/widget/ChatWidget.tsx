"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";

interface ChatWidgetProps {
  onOpenBooking: () => void;
}

export default function ChatWidget({ onOpenBooking }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  function handleOpen() {
    setIsOpen(true);
    setHasUnread(false);
  }

  function handleOpenBooking() {
    setIsOpen(false);
    onOpenBooking();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div className="w-[370px] h-[580px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col animate-fade-up">
          <ChatWindow onClose={() => setIsOpen(false)} onOpenBooking={handleOpenBooking} />
        </div>
      )}

      {/* Bubble + tooltip */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="bg-white rounded-xl shadow-lg px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-100 animate-fade-up flex items-center gap-2">
            <span>¿Tienes alguna duda?</span>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          className="relative bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg shadow-blue-500/40 hover:shadow-blue-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Abrir chat de asistencia"
        >
          {/* Ping animation */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
            </span>
          )}

          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
