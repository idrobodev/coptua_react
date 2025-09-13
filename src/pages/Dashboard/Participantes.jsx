import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Participantes = () => {
  const [filtros, setFiltros] = useState({
    sede: "Todas",
    estado: "Todos",
    busqueda: ""
  });

  // Estados para modales
  const [modalAbierto, setModalAbierto] = useState(null);
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState(null);

  // Funciones para manejar modales
  const abrirModal = (tipo, participante) => {
    setParticipanteSeleccionado(participante);
    setModalAbierto(tipo);
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    setParticipanteSeleccionado(null);
  };

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
                            <button 
                              onClick={() => abrirModal('ver', participante)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Ver detalles"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              onClick={() => abrirModal('editar', participante)}
                              className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                              title="Editar participante"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => abrirModal('progreso', participante)}
                              className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                              title="Ver progreso"
                            >
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

      {/* Modales */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {modalAbierto === 'ver' && (
              <ModalVerParticipante 
                participante={participanteSeleccionado} 
                onCerrar={cerrarModal} 
              />
            )}
            {modalAbierto === 'editar' && (
              <ModalEditarParticipante 
                participante={participanteSeleccionado} 
                onCerrar={cerrarModal} 
              />
            )}
            {modalAbierto === 'progreso' && (
              <ModalProgresoParticipante 
                participante={participanteSeleccionado} 
                onCerrar={cerrarModal} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente Modal para Ver Participante
const ModalVerParticipante = ({ participante, onCerrar }) => {
  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Detalles del Participante</h3>
        <button 
          onClick={onCerrar}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre Completo</label>
              <p className="text-lg font-semibold text-gray-800">{participante.nombre}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Edad</label>
              <p className="text-gray-800">{participante.edad} años</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
              <p className="text-gray-800">{participante.telefono}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sede</label>
              <p className="text-gray-800">{participante.sede}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                participante.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                participante.estado === 'Egresado' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {participante.estado}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de Ingreso</label>
              <p className="text-gray-800">{new Date(participante.fechaIngreso).toLocaleDateString('es-ES')}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Profesional Asignado</label>
              <p className="text-gray-800">{participante.profesional}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Progreso</label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      participante.progreso >= 80 ? 'bg-green-500' :
                      participante.progreso >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{width: `${participante.progreso}%`}}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">{participante.progreso}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
        <button 
          onClick={onCerrar}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

// Componente Modal para Editar Participante
const ModalEditarParticipante = ({ participante, onCerrar }) => {
  const [formData, setFormData] = useState({
    nombre: participante.nombre,
    edad: participante.edad,
    telefono: participante.telefono,
    sede: participante.sede,
    estado: participante.estado,
    profesional: participante.profesional
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando cambios:', formData);
    onCerrar();
  };

  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Editar Participante</h3>
        <button 
          onClick={onCerrar}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
            <input
              type="number"
              value={formData.edad}
              onChange={(e) => setFormData({...formData, edad: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sede</label>
            <select
              value={formData.sede}
              onChange={(e) => setFormData({...formData, sede: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Bello">Bello</option>
              <option value="Apartadó">Apartadó</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Egresado">Egresado</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profesional Asignado</label>
            <input
              type="text"
              value={formData.profesional}
              onChange={(e) => setFormData({...formData, profesional: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button 
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  );
};

// Componente Modal para Ver Progreso
const ModalProgresoParticipante = ({ participante, onCerrar }) => {
  // Datos de ejemplo para el progreso
  const progresoDetallado = [
    { area: 'Médico', progreso: 85, color: 'bg-green-500' },
    { area: 'Psicológico', progreso: 70, color: 'bg-blue-500' },
    { area: 'Espiritual', progreso: 90, color: 'bg-purple-500' },
    { area: 'Terapéutico', progreso: 60, color: 'bg-yellow-500' },
    { area: 'Trabajo Social', progreso: 75, color: 'bg-indigo-500' }
  ];

  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Progreso de {participante.nombre}</h3>
        <button 
          onClick={onCerrar}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800">Progreso General</span>
            <span className="text-2xl font-bold text-blue-600">{participante.progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                participante.progreso >= 80 ? 'bg-green-500' :
                participante.progreso >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{width: `${participante.progreso}%`}}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Progreso por Área</h4>
          {progresoDetallado.map((area, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{area.area}</span>
                <span className="font-semibold text-gray-800">{area.progreso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${area.color}`}
                  style={{width: `${area.progreso}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">Observaciones</h5>
          <p className="text-blue-700 text-sm">
            El participante muestra un excelente progreso en las áreas espiritual y médica. 
            Se recomienda reforzar el trabajo en el área terapéutica para alcanzar los objetivos establecidos.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
        <button 
          onClick={onCerrar}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

export default Participantes;
