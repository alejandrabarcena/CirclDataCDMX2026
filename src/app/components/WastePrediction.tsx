import { motion } from "motion/react";
import { Trash2, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface WastePredictionProps {
  attendance: number;
  foodPoints: number;
  duration: number;
}

export function WastePrediction({ attendance, foodPoints, duration }: WastePredictionProps) {
  const wastePerPerson = 0.5;
  const foodPointFactor = 0.3;
  const durationFactor = 0.15;

  const totalWaste = (
    attendance * wastePerPerson +
    foodPoints * foodPointFactor * duration +
    duration * durationFactor * attendance * 0.001
  ).toFixed(2);

  const organic = (Number(totalWaste) * 0.35).toFixed(2);
  const recyclable = (Number(totalWaste) * 0.45).toFixed(2);
  const nonRecyclable = (Number(totalWaste) * 0.2).toFixed(2);

  const data = [
    { name: "Orgánico", value: Number(organic), color: "#F59E0B" },
    { name: "Reciclable", value: Number(recyclable), color: "#10B981" },
    { name: "No Reciclable", value: Number(nonRecyclable), color: "#FF6B6B" },
  ];

  const monumentComparison = Number(totalWaste) > 5000
    ? "Equivalente a 2 Ángeles de la Independencia"
    : Number(totalWaste) > 2000
    ? "Equivalente a 1 Ángel de la Independencia"
    : "Equivalente a medio Ángel de la Independencia";

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Trash2 className="w-5 h-5 text-coral-orange" />
        <h3 className="text-gray-800 text-base sm:text-lg font-medium">Predicción de Residuos</h3>
      </div>

      <motion.div
        className="bg-gradient-to-br from-coral-orange/10 to-lime-yellow/10 rounded-xl p-4 mb-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        key={totalWaste}
      >
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Total Estimado</div>
          <div className="text-4xl sm:text-5xl font-bold text-coral-orange mb-2">
            {totalWaste} <span className="text-2xl">kg</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>{monumentComparison}</span>
          </div>
        </div>
      </motion.div>

      <div className="mb-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-lime-yellow/20 rounded-lg p-2 text-center border border-lime-yellow/30">
          <div className="text-xs text-gray-600">Orgánico</div>
          <div className="text-sm font-bold text-lime-yellow">{organic} kg</div>
        </div>
        <div className="bg-emerald-500/20 rounded-lg p-2 text-center border border-emerald-500/30">
          <div className="text-xs text-gray-600">Reciclable</div>
          <div className="text-sm font-bold text-emerald-600">{recyclable} kg</div>
        </div>
        <div className="bg-coral-orange/20 rounded-lg p-2 text-center border border-coral-orange/30">
          <div className="text-xs text-gray-600">No Recicl.</div>
          <div className="text-sm font-bold text-coral-orange">{nonRecyclable} kg</div>
        </div>
      </div>
    </div>
  );
}
