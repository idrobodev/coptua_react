import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Professionals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try { const v = localStorage.getItem('sidebarOpen'); return v ? JSON.parse(v) : false; } catch (_) { return false; }
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { const v = localStorage.getItem('sidebarCollapsed'); return v ? JSON.parse(v) : false; } catch (_) { return false; }
  });
  const toggleSidebarOpen = () => { const next = !sidebarOpen; setSidebarOpen(next); try { localStorage.setItem('sidebarOpen', JSON.stringify(next)); } catch (_) {} };
  const toggleSidebarCollapsed = () => { const next = !sidebarCollapsed; setSidebarCollapsed(next); try { localStorage.setItem('sidebarCollapsed', JSON.stringify(next)); } catch (_) {} };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
          <header className="fixed top-0 right-0 left-0 z-40 bg-white bg-opacity-95 backdrop-blur-md shadow border-b border-gray-200">
            <div className={`px-4 md:px-6 py-4 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
              <div className="flex items-center gap-3">
                <button onClick={() => { setSidebarOpen(true); try { localStorage.setItem('sidebarOpen', 'true'); } catch (_) {} }} className="md:hidden p-2 rounded-xl hover:bg-gray-100" aria-label="Abrir menú"><i className="fas fa-bars text-xl text-gray-700"></i></button>
                <button onClick={toggleSidebarCollapsed} className="hidden md:inline-flex p-2 rounded-xl hover:bg-gray-100" aria-label="Colapsar barra lateral"><i className={`fas ${sidebarCollapsed ? 'fa-angle-double-right' : 'fa-angle-double-left'} text-xl text-gray-700`}></i></button>
                <div>
                  <h1 className="text-2xl font-Lato font-bold text-gray-800">Profesionales</h1>
                  <p className="text-sm text-gray-600 font-Poppins">Directorio, agendas y carga de trabajo</p>
                </div>
              </div>
            </div>
          </header>
          <section className="px-4 md:px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">Directorio por sede y especialidad (placeholder)</div>
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">Agenda terapéutica (placeholder)</div>
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">Indicadores de carga de trabajo (placeholder)</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Professionals;
