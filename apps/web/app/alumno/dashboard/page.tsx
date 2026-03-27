import ExamCountdown from "@/components/student/ExamCountdown";
import MiniCalendar from "@/components/student/MiniCalendar";
import ClassesProgress from "@/components/student/ClassesProgress";
import PaymentCard from "@/components/student/PaymentCard";

export default function DashboardPage() {
  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Hola, María 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Aquí tienes el resumen de tu progreso en Autoescuela Madrid Centro.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam countdown — spans full width on its own row for emphasis */}
        <div className="lg:col-span-2">
          <ExamCountdown />
        </div>

        {/* Calendar */}
        <MiniCalendar />

        {/* Classes progress */}
        <ClassesProgress />

        {/* Payment tracker — full width */}
        <div className="lg:col-span-2">
          <PaymentCard />
        </div>
      </div>
    </div>
  );
}
