import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 md:ml-64 pt-20">
          <header className="fixed top-0 right-0 left-0 z-40 bg-white bg-opacity-95 backdrop-blur-md shadow border-b border-gray-200">
            <div className="px-4 md:px-6 py-4 md:ml-64">
              <h1 className="text-2xl font-Lato font-bold text-gray-800">Reportes y Analytics</h1>
              <p className="text-sm text-gray-600 font-Poppins">Indicadores y tableros</p>
            </div>
          </header>
          <section className="px-4 md:px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">KPIs de eficacia del tratamiento (placeholder)</div>
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">Demográficos y distribución (placeholder)</div>
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">Reportes para aliados/gobierno (placeholder)</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Reports;
