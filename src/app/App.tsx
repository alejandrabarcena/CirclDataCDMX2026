import { motion } from "motion/react";
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { VenueSelector } from "./components/VenueSelector";
import { EventParameters } from "./components/EventParameters";
import { WastePrediction } from "./components/WastePrediction";
import { ContainerOptimizer } from "./components/ContainerOptimizer";
import { SustainabilityScore } from "./components/SustainabilityScore";
import { ReportExporter } from "./components/ReportExporter";
import logo from "../imports/CirclData_CDMX.png";

interface Venue {
  id: string;
  name: string;
  capacity: number;
  x: number;
  y: number;
}

export default function App() {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [attendance, setAttendance] = useState(50000);
  const [foodPoints, setFoodPoints] = useState(30);
  const [duration, setDuration] = useState(8);
  const [singleUsePlasticBan, setSingleUsePlasticBan] = useState(false);

  const wastePerPerson = 0.5;
  const foodPointFactor = 0.3;
  const durationFactor = 0.15;

  const totalWaste = (
    attendance * wastePerPerson +
    foodPoints * foodPointFactor * duration +
    duration * durationFactor * attendance * 0.001
  ).toFixed(2);

  let score = 50;
  if (singleUsePlasticBan) score += 20;
  const ratio = foodPoints / (attendance / 1000);
  if (ratio < 10) score += 15;
  else if (ratio < 20) score += 10;
  const wastePerPersonCalc = (attendance * 0.5) / attendance;
  if (wastePerPersonCalc < 0.6) score += 15;
  const sustainabilityScore = Math.min(100, score);

  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
      <Navigation onNavigate={setCurrentSection} currentSection={currentSection} />

      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <motion.div
          className="mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <img
              src={logo}
              alt="CirclData CDMX"
              className="h-16 sm:h-24 w-auto"
            />
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-medium">Sistema Inteligente de Gestión de Residuos - Mundial 2026</p>
          <p className="text-xs text-slate-500 mt-1">Inteligencia para la Economía Circular</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <VenueSelector
              onVenueSelect={setSelectedVenue}
              selectedVenue={selectedVenue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EventParameters
              attendance={attendance}
              setAttendance={setAttendance}
              foodPoints={foodPoints}
              setFoodPoints={setFoodPoints}
              duration={duration}
              setDuration={setDuration}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WastePrediction
              attendance={attendance}
              foodPoints={foodPoints}
              duration={duration}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SustainabilityScore
              attendance={attendance}
              foodPoints={foodPoints}
              singleUsePlasticBan={singleUsePlasticBan}
              setSingleUsePlasticBan={setSingleUsePlasticBan}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ContainerOptimizer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ReportExporter
              totalWaste={Number(totalWaste)}
              venueName={selectedVenue?.name || "Evento CDMX"}
              attendance={attendance}
              sustainabilityScore={sustainabilityScore}
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8 mb-6 text-slate-500 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-medium text-emerald-600">CirclData CDMX</p>
          <p className="mt-1">Powered by IA - Análisis de Ciclo de Vida</p>
          <p className="mt-1">© 2026 Mundial FIFA - Iniciativa de Sustentabilidad</p>
        </motion.div>
      </div>
    </div>
  );
}