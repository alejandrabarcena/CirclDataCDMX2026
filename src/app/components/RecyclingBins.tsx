import { motion } from "motion/react";

interface Bin {
  accentColor: string;
  label: string;
  type: string;
  delay: number;
  fillLevel: number;
}

export function RecyclingBins() {
  const bins: Bin[] = [
    {
      accentColor: "#EF4444",
      label: "Basura",
      type: "General",
      delay: 0,
      fillLevel: 65,
    },
    {
      accentColor: "#10B981",
      label: "Plástico",
      type: "Reciclable",
      delay: 0.1,
      fillLevel: 45,
    },
    {
      accentColor: "#3B82F6",
      label: "Latas",
      type: "Metal",
      delay: 0.2,
      fillLevel: 30,
    },
    {
      accentColor: "#F59E0B",
      label: "Orgánico",
      type: "Compostable",
      delay: 0.3,
      fillLevel: 55,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
      {bins.map((bin, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + bin.delay, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-2xl border-2 sm:border-4 border-gray-600 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-2 sm:h-3 rounded-t"
              style={{ backgroundColor: bin.accentColor }}
            />

            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1" />
              <motion.div
                className="bg-gradient-to-t from-gray-900 to-gray-800"
                initial={{ height: 0 }}
                animate={{ height: `${bin.fillLevel}%` }}
                transition={{ delay: 2 + bin.delay, duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full opacity-40"
                style={{ backgroundColor: bin.accentColor }}
              />
            </div>

            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-white/60 text-[10px] sm:text-xs font-mono">
              {bin.fillLevel}%
            </div>
          </div>

          <div className="text-center space-y-0.5 sm:space-y-1">
            <div
              className="font-bold text-sm sm:text-lg"
              style={{ color: bin.accentColor }}
            >
              {bin.label}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">{bin.type}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
