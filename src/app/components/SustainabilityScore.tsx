import { motion } from "motion/react";
import { Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SustainabilityScoreProps {
  attendance: number;
  foodPoints: number;
  singleUsePlasticBan: boolean;
  setSingleUsePlasticBan: (value: boolean) => void;
}

export function SustainabilityScore({
  attendance,
  foodPoints,
  singleUsePlasticBan,
  setSingleUsePlasticBan,
}: SustainabilityScoreProps) {
  const [score, setScore] = useState(50);

  useEffect(() => {
    let calculatedScore = 50;

    if (singleUsePlasticBan) calculatedScore += 20;

    const ratio = foodPoints / (attendance / 1000);
    if (ratio < 10) calculatedScore += 15;
    else if (ratio < 20) calculatedScore += 10;

    const wastePerPerson = (attendance * 0.5) / attendance;
    if (wastePerPerson < 0.6) calculatedScore += 15;

    setScore(Math.min(100, calculatedScore));
  }, [attendance, foodPoints, singleUsePlasticBan]);

  const getScoreColor = () => {
    if (score >= 75) return "from-emerald-500 to-green-600";
    if (score >= 50) return "from-lime-yellow to-emerald-500";
    return "from-coral-orange to-red-500";
  };

  const getScoreIcon = () => {
    if (score >= 75) return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    if (score >= 50) return <Leaf className="w-6 h-6 text-lime-yellow" />;
    return <AlertTriangle className="w-6 h-6 text-coral-orange" />;
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        {getScoreIcon()}
        <h3 className="text-gray-800 text-base sm:text-lg font-medium">Semáforo de Sostenibilidad</h3>
      </div>

      <div className="relative mb-6">
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getScoreColor()} flex items-center justify-end pr-3`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white font-bold text-sm">{score}%</span>
          </motion.div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="plastic-ban"
              checked={singleUsePlasticBan}
              onChange={(e) => setSingleUsePlasticBan(e.target.checked)}
              className="w-4 h-4 accent-emerald-500"
            />
            <label htmlFor="plastic-ban" className="text-sm text-gray-700 cursor-pointer">
              Prohibir plásticos de un solo uso
            </label>
          </div>
          <span className="text-emerald-600 text-xs font-medium">+20%</span>
        </div>

        {score < 75 && (
          <motion.div
            className="bg-lime-yellow/10 border border-lime-yellow/30 rounded-lg p-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-lime-yellow mt-0.5" />
              <div className="text-xs text-gray-700">
                <strong>Sugerencia SEDEMA:</strong> Para este aforo, considera aumentar un 20% la recolección de orgánicos en zonas de alta densidad.
              </div>
            </div>
          </motion.div>
        )}

        {score >= 75 && (
          <motion.div
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div className="text-xs text-emerald-800">
                <strong>¡Excelente!</strong> Tu evento cumple con los estándares de sostenibilidad de la CDMX.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
