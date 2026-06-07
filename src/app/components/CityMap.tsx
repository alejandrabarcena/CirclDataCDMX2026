import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function CityMap() {
  const [heatPoints, setHeatPoints] = useState<Array<{ x: number; y: number; intensity: number }>>([]);
  const [pollutionWaves, setPollutionWaves] = useState<number[]>([]);

  useEffect(() => {
    const cityPoints = [
      { x: 35, y: 40, intensity: 0.9 },
      { x: 50, y: 45, intensity: 0.95 },
      { x: 45, y: 50, intensity: 0.85 },
      { x: 60, y: 35, intensity: 0.8 },
      { x: 40, y: 55, intensity: 0.7 },
      { x: 55, y: 60, intensity: 0.75 },
      { x: 30, y: 50, intensity: 0.65 },
      { x: 65, y: 45, intensity: 0.6 },
      { x: 48, y: 48, intensity: 1.0 },
    ];

    const randomPoints = Array.from({ length: 20 }, () => ({
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 50,
      intensity: 0.3 + Math.random() * 0.4,
    }));

    setHeatPoints([...cityPoints, ...randomPoints]);

    const waveInterval = setInterval(() => {
      setPollutionWaves(prev => [...prev, Date.now()]);
    }, 2000);

    return () => clearInterval(waveInterval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl border-2 border-gray-300">
      <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <pattern id="grid-city" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-city)" />
          </svg>
        </div>

        {heatPoints.map((point, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${60 + point.intensity * 120}px`,
              height: `${60 + point.intensity * 120}px`,
              background: `radial-gradient(circle,
                rgba(239, 68, 68, ${0.4 + point.intensity * 0.4}) 0%,
                rgba(251, 191, 36, ${0.3 + point.intensity * 0.3}) 40%,
                rgba(34, 197, 94, ${0.2 + point.intensity * 0.2}) 70%,
                transparent 100%)`,
              filter: 'blur(20px)',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 4 + point.intensity * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}

        {pollutionWaves.map((waveId, index) => (
          <motion.div
            key={waveId}
            className="absolute left-[48%] top-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-red-500"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: 400,
              height: 400,
              opacity: 0,
            }}
            transition={{
              duration: 4,
              ease: "easeOut"
            }}
            onAnimationComplete={() => {
              setPollutionWaves(prev => prev.filter(id => id !== waveId));
            }}
          />
        ))}

        <motion.div
          className="absolute left-[48%] top-[48%] rounded-full"
          style={{
            width: '300px',
            height: '300px',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(239, 68, 68, 0.4) 30%, rgba(239, 68, 68, 0.2) 60%, transparent 100%)',
              filter: 'blur(25px)',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute left-[48%] top-[48%] -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/70 blur-xl rounded-full w-16 h-16" />
            <div className="relative w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 sm:rounded-lg sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-800 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          CDMX
        </motion.div>

        <motion.div
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500/90 backdrop-blur-sm rounded px-2 py-1 sm:rounded-lg sm:px-3 sm:py-2 text-[10px] sm:text-xs text-white shadow-lg flex items-center gap-1 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
          <span className="hidden sm:inline">Propagación</span>
          <span className="sm:hidden">Contam.</span>
        </motion.div>

        <motion.div
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 sm:rounded-lg sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Vista General
        </motion.div>
      </div>
    </div>
  );
}
