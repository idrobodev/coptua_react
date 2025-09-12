import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Reports = () => {
  return (
    <div className="container ">
      <div className="flex">
        <Sidebar />
        <main className="bg-gray-100 w-full p-8">
          <h1 className="text-2xl font-semibold mb-6">Reportes y Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">KPIs de eficacia del tratamiento (placeholder)</div>
            <div className="bg-white rounded-lg shadow p-6">Demográficos y distribución (placeholder)</div>
            <div className="bg-white rounded-lg shadow p-6">Reportes para aliados/gobierno (placeholder)</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
