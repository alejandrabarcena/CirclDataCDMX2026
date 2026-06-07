import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface HeatMapProps {
  isZoomed: boolean;
}

export function HeatMap({ isZoomed }: HeatMapProps) {
  const [heatPoints, setHeatPoints] = useState<Array<{ x: number; y: number; intensity: number }>>([]);

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
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl border-2 border-gray-300">
      <motion.div
        className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"
        animate={{
          scale: isZoomed ? 2.8 : 1,
          x: isZoomed ? "-18%" : "0%",
          y: isZoomed ? "-16%" : "0%",
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
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

        <motion.div
          className="absolute"
          style={{
            left: "48%",
            top: "48%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: isZoomed ? 1.2 : 0.4,
            opacity: isZoomed ? 1 : 0.7,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

            <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 shadow-2xl border-4 border-white/40 backdrop-blur-md min-w-[180px]">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-6 h-6 text-white" />
                <div className="text-white">
                  <div className="text-xs opacity-90">Estadio</div>
                  <div className="font-bold text-lg">Azteca</div>
                </div>
              </div>
              <div className="text-white/80 text-xs">Ciudad de México</div>
              <div className="mt-2 pt-2 border-t border-white/20 text-white/70 text-xs">
                Contenedores activos: 4
              </div>
            </div>
          </div>
        </motion.div>

        {!isZoomed && (
          <motion.div
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-800 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Mapa de Calor - Ciudad de México
          </motion.div>
        )}

        {isZoomed && (
          <motion.div
            className="absolute top-4 left-4 bg-green-600/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            Zona: Estadio Azteca
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
