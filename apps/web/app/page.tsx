"use client";

import { useState } from "react";
import Hero from "@/components/landing/Hero";
import CarnetCards from "@/components/landing/CarnetCards";
import WhyUs from "@/components/landing/WhyUs";
import Reviews from "@/components/landing/Reviews";
import Location from "@/components/landing/Location";
import SiteFooter from "@/components/landing/SiteFooter";
import ChatWidget from "@/components/widget/ChatWidget";
import BookingModal from "@/components/booking/BookingModal";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base">A</div>
            <span className="font-bold text-gray-900 text-sm hidden sm:block">Autoescuela Madrid Centro</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#precios" className="hover:text-blue-600 transition-colors font-medium">Carnets</a>
            <a href="#ubicacion" className="hover:text-blue-600 transition-colors font-medium">Sedes</a>
            <a href="tel:912345678" className="hover:text-blue-600 transition-colors font-medium">91 234 56 78</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700 hidden sm:block">
              Acceso dueño →
            </a>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Reservar clase
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <CarnetCards onOpenBooking={() => setBookingOpen(true)} />
        <WhyUs />
        <Reviews />
        <Location />
      </main>

      <SiteFooter />

      {/* Floating chat widget */}
      <ChatWidget onOpenBooking={() => setBookingOpen(true)} />

      {/* Booking modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
