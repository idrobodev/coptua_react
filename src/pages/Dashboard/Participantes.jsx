import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Participantes = () => {
  const [filtros, setFiltros] = useState({
    sede: "Todas",
    estado: "Todos",
    busqueda: ""
  });

  // Datos de ejemplo
  const participantes = [
    {
      id: 1,
      nombre: "María González",
      edad: 28,
      sede: "Bello",
      estado: "Activo",
      fechaIngreso: "2024-01-15",
      progreso: 75,
      telefono: "3001234567",
      profesional: "Juan Camilo Machado"
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      edad: 35,
      sede: "Apartadó",
      estado: "Activo",
      fechaIngreso: "2024-02-20",
      progreso: 60,
      telefono: "3007654321",
      profesional: "Luz Yasmin Estrada"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      edad: 42,
      sede: "Bello",
      estado: "Egresado",
      fechaIngreso: "2023-11-10",
      progreso: 100,
      telefono: "3009876543",
      profesional: "Mildrey Leonel Melo"
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Egresado": return "bg-blue-100 text-blue-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgresoColor = (progreso) => {
    if (progreso >= 80) return "bg-green-500";
    if (progreso >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Participantes</h1>
                <p className="text-gray-600">Administra los participantes de la fundación</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <i className="fas fa-plus mr-2"></i>
                Nuevo Participante
              </button>
            </div>
          </header>

          {/* Filtros */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
                <select
                  value={filtros.sede}
                  onChange={(e) => setFiltros({...filtros, sede: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Todas">Todas las Sedes</option>
                  <option value="Bello">Bello</option>
                  <option value="Apartadó">Apartadó</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Todos">Todos los Estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Egresado">Egresado</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Búsqueda</label>
                <input
                  type="text"
                  placeholder="Nombre, teléfono..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-end">
                <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  <i className="fas fa-search mr-2"></i>
                  Filtrar
                </button>
              </div>
            </div>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Participantes</p>
                    <p className="text-2xl font-bold text-blue-600">{participantes.length}</p>
                  </div>
                  <i className="fas fa-users text-blue-600 text-2xl"></i>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Activos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {participantes.filter(p => p.estado === "Activo").length}
                    </p>
                  </div>
                  <i className="fas fa-user-check text-green-600 text-2xl"></i>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Egresados</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {participantes.filter(p => p.estado === "Egresado").length}
                    </p>
                  </div>
                  <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round(participantes.reduce((acc, p) => acc + p.progreso, 0) / participantes.length)}%
                    </p>
                  </div>
                  <i className="fas fa-chart-line text-purple-600 text-2xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Participantes */}
          <div className="px-6 py-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Lista de Participantes</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sede
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profesional
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {participantes.map((participante) => (
                      <tr key={participante.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-user text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {participante.nombre}
                              </div>
                              <div className="text-sm text-gray-500">
                                {participante.edad} años • {participante.telefono}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participante.sede}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(participante.estado)}`}>
                            {participante.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${getProgresoColor(participante.progreso)}`}
                                style={{width: `${participante.progreso}%`}}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{participante.progreso}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participante.profesional}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <i className="fas fa-chart-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Participantes;
