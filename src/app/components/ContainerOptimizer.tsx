import { motion } from "motion/react";
import { Sparkles, Move } from "lucide-react";
import { useState, useRef } from "react";

interface Container {
  id: string;
  type: string;
  color: string;
  x: number;
  y: number;
}

export function ContainerOptimizer() {
  const [containers, setContainers] = useState<Container[]>([
    { id: "1", type: "Orgánico", color: "#F59E0B", x: 25, y: 30 },
    { id: "2", type: "Reciclable", color: "#10B981", x: 75, y: 30 },
    { id: "3", type: "No Reciclable", color: "#FF6B6B", x: 25, y: 70 },
    { id: "4", type: "Mixto", color: "#3B82F6", x: 75, y: 70 },
  ]);

  const [efficiency, setEfficiency] = useState(72);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDrag = (e: React.DragEvent, id: string) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      setContainers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, x, y } : c))
      );

      const newEfficiency = Math.min(95, 72 + Math.random() * 15);
      setEfficiency(Math.round(newEfficiency));
    }
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const optimizeWithAI = () => {
    setContainers([
      { id: "1", type: "Orgánico", color: "#F59E0B", x: 30, y: 25 },
      { id: "2", type: "Reciclable", color: "#10B981", x: 70, y: 25 },
      { id: "3", type: "No Reciclable", color: "#FF6B6B", x: 30, y: 75 },
      { id: "4", type: "Mixto", color: "#3B82F6", x: 70, y: 75 },
    ]);
    setEfficiency(92);
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-electric-blue" />
          <h3 className="text-gray-800 text-base sm:text-lg font-medium">Optimización con IA</h3>
        </div>
        <motion.button
          className="bg-electric-blue text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={optimizeWithAI}
        >
          Ajuste IA
        </motion.button>
      </div>

      <div
        ref={mapRef}
        className="relative w-full aspect-video bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-50 rounded-xl overflow-hidden border-2 border-gray-300 mb-4"
      >
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="heatGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="40%" r="30%" fill="url(#heatGradient)" />
            <circle cx="30%" cy="60%" r="25%" fill="url(#heatGradient)" />
            <circle cx="70%" cy="60%" r="25%" fill="url(#heatGradient)" />
          </svg>
        </div>

        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-800">
          Mapa de Calor - Estadio Azteca
        </div>

        {containers.map((container) => (
          <motion.div
            key={container.id}
            draggable
            onDragStart={() => handleDragStart(container.id)}
            onDrag={(e) => handleDrag(e as any, container.id)}
            onDragEnd={handleDragEnd}
            className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg cursor-move flex items-center justify-center"
            style={{
              backgroundColor: container.color,
              left: `${container.x}%`,
              top: `${container.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: draggingId === container.id ? 0.5 : 1,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <Move className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>
        ))}
      </div>

      <div className="bg-white/60 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Eficiencia de Recolección</span>
          <span className="text-lg font-bold text-emerald-600">{efficiency}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
            initial={{ width: 0 }}
            animate={{ width: `${efficiency}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 text-center">
        Arrastra los contenedores para optimizar su ubicación
      </div>
    </div>
  );
}
