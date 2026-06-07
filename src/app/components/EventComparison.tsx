import { motion } from "motion/react";
import { TrendingDown, TrendingUp } from "lucide-react";

export function EventComparison() {
  const stats = [
    {
      event: "Mundial 2014 Brasil",
      waste: "1,200 toneladas",
      recycled: "25%",
      trend: "down",
      color: "text-red-500",
    },
    {
      event: "Mundial 2026 México",
      waste: "Meta: 400 toneladas",
      recycled: "Meta: 75%",
      trend: "up",
      color: "text-green-500",
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <motion.h3
        className="text-center mb-4 sm:mb-8 text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        Compromiso con el Medio Ambiente
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg"
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 + index * 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h4 className="text-gray-800 text-sm sm:text-base">{stat.event}</h4>
              {stat.trend === "up" ? (
                <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              ) : (
                <TrendingDown className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Residuos generados</div>
                <div className="text-base sm:text-xl font-bold text-gray-800">{stat.waste}</div>
              </div>

              <div>
                <div className="text-xs sm:text-sm text-gray-600">Material reciclado</div>
                <div className={`text-base sm:text-xl font-bold ${stat.color}`}>{stat.recycled}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
