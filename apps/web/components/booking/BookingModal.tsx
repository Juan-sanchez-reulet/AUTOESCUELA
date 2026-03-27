"use client";

import { useState } from "react";
import Step1Type from "./Step1Type";
import Step2Data from "./Step2Data";
import Step3Schedule from "./Step3Schedule";
import BookingConfirmation from "./BookingConfirmation";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BookingData {
  classType: string;
  licenseType: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  studentLevel: string;
  scheduledAt: string;
  scheduledLabel: string;
}

const STEPS = ["Tipo de clase", "Tus datos", "Fecha y hora"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});
  const [confirmation, setConfirmation] = useState<{ bookingRef: string; data: BookingData } | null>(null);

  if (!isOpen) return null;

  function handleClose() {
    setStep(0);
    setBookingData({});
    setConfirmation(null);
    onClose();
  }

  async function handleConfirm(finalData: BookingData) {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: "autoescuela-madrid-centro",
          student_name: finalData.studentName,
          student_phone: finalData.studentPhone,
          student_email: finalData.studentEmail || null,
          class_type: finalData.classType,
          license_type: finalData.licenseType,
          student_level: finalData.studentLevel || null,
          scheduled_at: finalData.scheduledAt,
        }),
      });
      const data = await res.json();
      setConfirmation({ bookingRef: data.booking_ref || "MC-0000", data: finalData });
    } catch {
      setConfirmation({ bookingRef: `MC-${Math.floor(1000 + Math.random() * 9000)}`, data: finalData });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Reservar clase</h2>
            <button onClick={handleClose} className="text-blue-200 hover:text-white p-1 rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stepper */}
          {!confirmation && (
            <div className="flex items-center gap-0">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i < step
                          ? "bg-green-400 text-white"
                          : i === step
                          ? "bg-white text-blue-700"
                          : "bg-blue-600 text-blue-300"
                      }`}
                    >
                      {i < step ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-white" : "text-blue-300"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-2 ${i < step ? "bg-green-400" : "bg-blue-600"}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {confirmation ? (
            <BookingConfirmation
              bookingRef={confirmation.bookingRef}
              data={confirmation.data}
              onClose={handleClose}
            />
          ) : step === 0 ? (
            <Step1Type
              data={bookingData}
              onNext={(d) => { setBookingData((prev) => ({ ...prev, ...d })); setStep(1); }}
            />
          ) : step === 1 ? (
            <Step2Data
              data={bookingData}
              onNext={(d) => { setBookingData((prev) => ({ ...prev, ...d })); setStep(2); }}
              onBack={() => setStep(0)}
            />
          ) : (
            <Step3Schedule
              data={bookingData}
              onConfirm={(d) => handleConfirm({ ...bookingData, ...d } as BookingData)}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
