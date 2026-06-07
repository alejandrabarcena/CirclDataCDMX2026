import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Home, BarChart3, MapPin, FileText, Settings, Info } from "lucide-react";
import logo from "../../imports/CirclData_CDMX.png";

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function Navigation({ onNavigate, currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { id: "simulacion", label: "Simulación", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "mapa", label: "Mapa de Calor", icon: <MapPin className="w-5 h-5" /> },
    { id: "reportes", label: "Reportes", icon: <FileText className="w-5 h-5" /> },
    { id: "configuracion", label: "Configuración", icon: <Settings className="w-5 h-5" /> },
    { id: "acerca", label: "Acerca de", icon: <Info className="w-5 h-5" /> },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CirclData CDMX" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-gray-600">Sistema Inteligente de Gestión</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {menuItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? "bg-emerald-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 overflow-hidden sticky top-16 z-40 shadow-lg"
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? "bg-emerald-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
