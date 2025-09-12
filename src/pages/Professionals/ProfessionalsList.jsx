import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Sidebar';
import DataTable from '../../components/UI/DataTable';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { dbService } from '../../services/databaseService';

const ProfessionalsList = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSede, setFilterSede] = useState('TODAS');
  const [filterEspecialidad, setFilterEspecialidad] = useState('TODAS');

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      setLoading(true);
      const { data } = await dbService.getProfesionales();
      setProfessionals(data || []);
    } catch (error) {
      console.error('Error loading professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  const filteredProfessionals = professionals.filter(professional => {
    if (filterSede !== 'TODAS' && professional.sede !== filterSede) return false;
    if (filterEspecialidad !== 'TODAS' && professional.especialidad !== filterEspecialidad) return false;
    return true;
  });

  const especialidades = [
    'MEDICINA', 'PSICOLOGIA', 'ENFERMERIA', 'TRABAJO_SOCIAL', 
    'TERAPIA_OCUPACIONAL', 'FISIOTERAPIA', 'FONOAUDIOLOGIA', 'NUTRICION'
  ];

  const columns = [
    {
      key: 'documento',
      label: 'Documento',
      render: (value) => (
        <span className="font-Poppins font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'nombreCompleto',
      label: 'Nombre Completo',
      render: (value) => (
        <span className="font-Poppins font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'especialidad',
      label: 'Especialidad',
      render: (value) => {
        const especialidadColors = {
          'MEDICINA': 'bg-red-100 text-red-800',
          'PSICOLOGIA': 'bg-blue-100 text-blue-800',
          'ENFERMERIA': 'bg-green-100 text-green-800',
          'TRABAJO_SOCIAL': 'bg-purple-100 text-purple-800',
          'TERAPIA_OCUPACIONAL': 'bg-yellow-100 text-yellow-800',
          'FISIOTERAPIA': 'bg-indigo-100 text-indigo-800',
          'FONOAUDIOLOGIA': 'bg-pink-100 text-pink-800',
          'NUTRICION': 'bg-orange-100 text-orange-800'
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-Poppins font-medium ${especialidadColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value?.replace('_', ' ')}
          </span>
        );
      }
    },
    {
      key: 'sede',
      label: 'Sede',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-Poppins font-medium">
          {value}
        </span>
      )
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      render: (value) => (
        <span className="font-Poppins text-gray-700">{value}</span>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <span className="font-Poppins text-gray-700 text-sm">{value}</span>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-Poppins font-medium ${
          value === 'ACTIVO' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (_, row) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/professionals/${row.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Ver perfil"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <Link
            to={`/dashboard/professionals/${row.id}/edit`}
            className="text-green-600 hover:text-green-800 transition-colors"
            title="Editar"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <Link
            to={`/dashboard/professionals/${row.id}/schedule`}
            className="text-purple-600 hover:text-purple-800 transition-colors"
            title="Horarios"
          >
            <i className="fas fa-calendar-alt"></i>
          </Link>
        </div>
      )
    }
  ];

  const getStats = () => {
    return {
      total: professionals.length,
      activos: professionals.filter(p => p.estado === 'ACTIVO').length,
      bello: professionals.filter(p => p.sede === 'Bello').length,
      apartado: professionals.filter(p => p.sede === 'Apartadó').length,
      byEspecialidad: especialidades.reduce((acc, esp) => {
        acc[esp] = professionals.filter(p => p.especialidad === esp).length;
        return acc;
      }, {})
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner size="xl" text="Cargando profesionales..." />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebarOpen} 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={toggleSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-Montserrat font-bold text-gray-800">
                    Gestión de Profesionales
                  </h1>
                  <p className="text-sm font-Poppins text-gray-600 mt-1">
                    Administra el equipo profesional de la fundación
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterSede}
                    onChange={(e) => setFilterSede(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="TODAS">Todas las Sedes</option>
                    <option value="Bello">Bello</option>
                    <option value="Apartadó">Apartadó</option>
                  </select>
                  <select
                    value={filterEspecialidad}
                    onChange={(e) => setFilterEspecialidad(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="TODAS">Todas las Especialidades</option>
                    {especialidades.map(esp => (
                      <option key={esp} value={esp}>{esp.replace('_', ' ')}</option>
                    ))}
                  </select>
                  <Link
                    to="/dashboard/professionals/new"
                    className="bg-primary text-white px-4 py-2 rounded-xl font-Poppins font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-plus"></i>
                    <span>Nuevo Profesional</span>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Total Profesionales</p>
                    <p className="text-3xl font-Montserrat font-bold text-blue-600 mt-2">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <i className="fas fa-user-md text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Activos</p>
                    <p className="text-3xl font-Montserrat font-bold text-green-600 mt-2">
                      {stats.activos}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                    <i className="fas fa-user-check text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Sede Bello</p>
                    <p className="text-3xl font-Montserrat font-bold text-purple-600 mt-2">
                      {stats.bello}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                    <i className="fas fa-building text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Sede Apartadó</p>
                    <p className="text-3xl font-Montserrat font-bold text-orange-600 mt-2">
                      {stats.apartado}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                    <i className="fas fa-building text-orange-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Especialidades Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              <h3 className="text-xl font-Montserrat font-bold text-gray-800 mb-6">Distribución por Especialidad</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {especialidades.map(esp => (
                  <div key={esp} className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-Montserrat font-bold text-gray-800">
                      {stats.byEspecialidad[esp] || 0}
                    </p>
                    <p className="text-xs font-Poppins text-gray-600 mt-1">
                      {esp.replace('_', ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professionals Table */}
            <DataTable
              data={filteredProfessionals}
              columns={columns}
              searchable={true}
              sortable={true}
              pagination={true}
              pageSize={15}
              onRowClick={(professional) => {
                window.location.href = `/dashboard/professionals/${professional.id}`;
              }}
              className="mb-8"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalsList;
