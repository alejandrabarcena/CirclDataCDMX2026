import { motion } from "motion/react";
import { Users, ShoppingBag, Clock } from "lucide-react";

interface EventParametersProps {
  attendance: number;
  setAttendance: (value: number) => void;
  foodPoints: number;
  setFoodPoints: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
}

export function EventParameters({
  attendance,
  setAttendance,
  foodPoints,
  setFoodPoints,
  duration,
  setDuration,
}: EventParametersProps) {
  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <h3 className="text-gray-800 text-base sm:text-lg font-medium mb-4">Parámetros del Evento</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <label className="text-sm font-medium text-gray-700">Aforo</label>
            </div>
            <span className="text-lg font-bold text-emerald-600">
              {attendance.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={attendance}
            onChange={(e) => setAttendance(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1,000</span>
            <span>100,000</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-electric-blue" />
              <label className="text-sm font-medium text-gray-700">Puntos de Venta</label>
            </div>
            <span className="text-lg font-bold text-electric-blue">{foodPoints}</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={foodPoints}
            onChange={(e) => setFoodPoints(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-electric-blue"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5</span>
            <span>100</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-lime-yellow" />
              <label className="text-sm font-medium text-gray-700">Duración (horas)</label>
            </div>
            <span className="text-lg font-bold text-lime-yellow">{duration}h</span>
          </div>
          <input
            type="range"
            min="2"
            max="24"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-yellow"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2h</span>
            <span>24h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
