import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autoescuela Madrid Centro — Tu carnet sin complicaciones",
  description:
    "Más de 10 años formando conductores en Madrid. 4 sedes, clases online y presenciales, app de test gratuita. Carnet B, A, AM, Microcar y más.",
  keywords: "autoescuela madrid, carnet de conducir madrid, carnet b madrid, clases practicas madrid",
  openGraph: {
    title: "Autoescuela Madrid Centro",
    description: "Tu carnet de conducir en Madrid, sin complicaciones.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
