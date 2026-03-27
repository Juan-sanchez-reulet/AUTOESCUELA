"use client";

import { useState } from "react";

const CLASS_TYPES = [
  { id: "practica", label: "Clase práctica", desc: "Al volante con tu instructor", icon: "🚗" },
  { id: "teorica", label: "Clase teórica", desc: "Preparación del examen teórico", icon: "📚" },
  { id: "consulta", label: "Primera consulta", desc: "Gratuita · 30 min orientativos", icon: "☕" },
];

const LICENSE_TYPES = [
  { id: "B", label: "Carnet B", sub: "Turismo" },
  { id: "A2", label: "Carnet A2", sub: "Moto 35 kW" },
  { id: "A", label: "Carnet A", sub: "Moto libre" },
  { id: "AM", label: "Carnet AM", sub: "Ciclomotor" },
  { id: "Microcar", label: "Microcar", sub: "Cuadriciclo" },
  { id: "B+E", label: "Carnet B+E", sub: "Remolque" },
];

interface Props {
  data: Partial<{ classType: string; licenseType: string }>;
  onNext: (d: { classType: string; licenseType: string }) => void;
}

export default function Step1Type({ data, onNext }: Props) {
  const [classType, setClassType] = useState(data.classType || "");
  const [licenseType, setLicenseType] = useState(data.licenseType || "B");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Tipo de clase</h3>
        <div className="space-y-2">
          {CLASS_TYPES.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setClassType(ct.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                classType === ct.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-2xl">{ct.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${classType === ct.id ? "text-blue-700" : "text-gray-900"}`}>
                  {ct.label}
                </p>
                <p className="text-xs text-gray-500">{ct.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                classType === ct.id ? "border-blue-600 bg-blue-600" : "border-gray-300"
              }`}>
                {classType === ct.id && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Tipo de carnet</h3>
        <div className="grid grid-cols-3 gap-2">
          {LICENSE_TYPES.map((lt) => (
            <button
              key={lt.id}
              onClick={() => setLicenseType(lt.id)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                licenseType === lt.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className={`font-semibold text-sm ${licenseType === lt.id ? "text-blue-700" : "text-gray-900"}`}>
                {lt.label}
              </p>
              <p className="text-xs text-gray-400">{lt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNext({ classType, licenseType })}
        disabled={!classType}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Siguiente →
      </button>
    </div>
  );
}
