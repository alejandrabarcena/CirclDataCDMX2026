import { motion } from "motion/react";
import { MapPin, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export function StadiumZoom() {
  const [pollutionWaves, setPollutionWaves] = useState<number[]>([]);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setPollutionWaves(prev => [...prev, Date.now()]);
    }, 1800);

    return () => clearInterval(waveInterval);
  }, []);

  const containers = [
    { color: "#EF4444", label: "Basura", x: 30, y: 35 },
    { color: "#10B981", label: "Plástico", x: 70, y: 35 },
    { color: "#3B82F6", label: "Latas", x: 30, y: 65 },
    { color: "#F59E0B", label: "Orgánico", x: 70, y: 65 },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl border-2 border-gray-300">
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-800 via-green-700 to-green-600">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="grid-stadium" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-stadium)" />
          </svg>
        </div>

        {pollutionWaves.map((waveId) => (
          <motion.div
            key={waveId}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, rgba(239, 68, 68, 0.3) 40%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{
              width: 600,
              height: 600,
              opacity: 0,
            }}
            transition={{
              duration: 5,
              ease: "easeOut"
            }}
            onAnimationComplete={() => {
              setPollutionWaves(prev => prev.filter(id => id !== waveId));
            }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 1, duration: 2 }}
          style={{
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0.3) 50%, rgba(239, 68, 68, 0.1) 80%, transparent 100%)',
            filter: 'blur(30px)',
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/40 blur-3xl rounded-full w-64 h-64 animate-pulse" />

            <div className="relative bg-gradient-to-br from-green-600/90 to-emerald-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-2 sm:border-4 border-white/40 min-w-[200px] sm:min-w-[280px]">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                <div className="text-white">
                  <div className="text-xs sm:text-sm opacity-90">Estadio</div>
                  <div className="font-bold text-lg sm:text-2xl">Azteca</div>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Contenedores: 4</span>
                </div>
                <div className="text-white/80 text-[10px] sm:text-xs">Cap.: 87,523 personas</div>
              </div>

              <div className="border-t border-white/20 pt-2 sm:pt-3">
                <div className="text-white/70 text-[10px] sm:text-xs mb-1 sm:mb-2">Ubicaciones:</div>
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  {containers.map((container, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-white flex items-center gap-1"
                    >
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{ backgroundColor: container.color }}
                      />
                      {container.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {containers.map((container, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 rounded-full shadow-lg border-2 border-white"
            style={{
              backgroundColor: container.color,
              left: `${container.x}%`,
              top: `${container.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + index * 0.15, duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: container.color }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ))}

        <motion.div
          className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-green-600/90 backdrop-blur-sm rounded px-2 py-1 sm:rounded-lg sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="hidden sm:inline">Zona: </span>Azteca
        </motion.div>

        <motion.div
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500/90 backdrop-blur-sm rounded px-2 py-1 sm:rounded-lg sm:px-3 sm:py-2 text-[10px] sm:text-xs text-white shadow-lg flex items-center gap-1 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
          <span className="hidden sm:inline">Expansión</span>
          <span className="sm:hidden">Exp.</span>
        </motion.div>

        <motion.div
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 sm:rounded-lg sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Zoom
        </motion.div>
      </div>
    </div>
  );
}
