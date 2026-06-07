import { motion } from "motion/react";
import { FileText, Download, Database } from "lucide-react";

interface ReportExporterProps {
  totalWaste: number;
  venueName: string;
  attendance: number;
  sustainabilityScore: number;
}

export function ReportExporter({
  totalWaste,
  venueName,
  attendance,
  sustainabilityScore,
}: ReportExporterProps) {
  const exportGovernmentReport = () => {
    const reportContent = `
REPORTE EJECUTIVO - SEDEMA CDMX
CirclData - Sistema de Gestión de Residuos

DATOS DEL EVENTO
Recinto: ${venueName}
Aforo: ${attendance.toLocaleString()} personas
Puntaje de Sostenibilidad: ${sustainabilityScore}%

PROYECCIÓN DE RESIDUOS
Total Estimado: ${totalWaste} kg
- Orgánicos: ${(Number(totalWaste) * 0.35).toFixed(2)} kg (35%)
- Reciclables: ${(Number(totalWaste) * 0.45).toFixed(2)} kg (45%)
- No Reciclables: ${(Number(totalWaste) * 0.2).toFixed(2)} kg (20%)

PLAN DE MANEJO
- Contenedores instalados: 4 unidades estratégicas
- Sistema de optimización: IA CirclData
- Cumplimiento normativo: ${sustainabilityScore >= 75 ? "APROBADO" : "REQUIERE AJUSTES"}

Fecha de generación: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Reporte_SEDEMA_${venueName.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportACVDataset = () => {
    const dataset = {
      evento: venueName,
      fecha: new Date().toISOString(),
      aforo: attendance,
      residuos_totales_kg: Number(totalWaste),
      desagregacion: {
        organicos_kg: Number((Number(totalWaste) * 0.35).toFixed(2)),
        reciclables_kg: Number((Number(totalWaste) * 0.45).toFixed(2)),
        no_reciclables_kg: Number((Number(totalWaste) * 0.2).toFixed(2)),
      },
      puntuacion_sostenibilidad: sustainabilityScore,
      metodologia: "CirclData ACV v1.0",
    };

    const blob = new Blob([JSON.stringify(dataset, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dataset_ACV_${venueName.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/60 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-5 h-5 text-electric-blue" />
        <h3 className="text-gray-800 text-base sm:text-lg font-medium">Exportar Reportes</h3>
      </div>

      <div className="space-y-3">
        <motion.button
          className="w-full bg-emerald-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between hover:bg-emerald-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportGovernmentReport}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Reporte SEDEMA</div>
              <div className="text-xs opacity-90">PDF Ejecutivo para trámites</div>
            </div>
          </div>
          <Download className="w-4 h-4" />
        </motion.button>

        <motion.button
          className="w-full bg-blue-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportACVDataset}
        >
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Dataset ACV</div>
              <div className="text-xs opacity-90">JSON para Análisis de Ciclo de Vida</div>
            </div>
          </div>
          <Download className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
