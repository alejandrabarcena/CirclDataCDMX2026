import { motion } from "motion/react";
import { MapPin, Users, Calendar, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface Venue {
  id: string;
  name: string;
  capacity: number;
  x: number;
  y: number;
}

interface VenueSelectorProps {
  onVenueSelect: (venue: Venue) => void;
  selectedVenue: Venue | null;
}

export function VenueSelector({ onVenueSelect, selectedVenue }: VenueSelectorProps) {
  const venues: Venue[] = [
    { id: "foro-sol", name: "Foro Sol", capacity: 65000, x: 55, y: 52 },
    { id: "zocalo", name: "Zócalo", capacity: 100000, x: 48, y: 48 },
    { id: "azteca", name: "Estadio Azteca", capacity: 87523, x: 45, y: 58 },
    { id: "palacio", name: "Palacio de los Deportes", capacity: 26000, x: 52, y: 50 },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-emerald-600" />
        <h3 className="text-gray-800 text-base sm:text-lg font-medium">Selecciona el Recinto</h3>
      </div>

      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 rounded-xl overflow-hidden border-2 border-gray-300">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <pattern id="venue-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#venue-grid)" />
          </svg>
        </div>

        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-800">
          Ciudad de México
        </div>

        {venues.map((venue) => (
          <motion.button
            key={venue.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              selectedVenue?.id === venue.id
                ? "bg-emerald-500 border-white"
                : "bg-electric-blue/80 border-white/60"
            } border-2 rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all`}
            style={{
              left: `${venue.x}%`,
              top: `${venue.y}%`,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVenueSelect(venue)}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
        ))}

        {selectedVenue && (
          <motion.div
            className="absolute bg-white/95 backdrop-blur-md rounded-lg p-3 shadow-xl border border-emerald-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              left: `${selectedVenue.x}%`,
              top: `${selectedVenue.y}%`,
              transform: "translate(20px, -50%)",
            }}
          >
            <div className="text-sm font-bold text-gray-800">{selectedVenue.name}</div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <Users className="w-3 h-3" />
              <span>Capacidad: {selectedVenue.capacity.toLocaleString()}</span>
            </div>
          </motion.div>
        )}
      </div>

      {selectedVenue && (
        <motion.div
          className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm font-medium text-emerald-800">
            Recinto seleccionado: {selectedVenue.name}
          </div>
        </motion.div>
      )}
    </div>
  );
}
