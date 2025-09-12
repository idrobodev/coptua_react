import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Sidebar';
import DataTable from '../../components/UI/DataTable';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { dbService, FORM_TYPES } from '../../services/databaseService';

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterType, setFilterType] = useState('TODOS');
  const [filterStatus, setFilterStatus] = useState('TODOS');

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      // Mock data for forms - in real implementation, this would come from Supabase
      const mockForms = [
        {
          id: 1,
          participante: 'María González',
          participanteId: 1,
          tipo: FORM_TYPES.MEDICO,
          estado: 'PENDIENTE',
          fechaCreacion: '2024-01-15',
          fechaCompletado: null,
          profesional: 'Dr. Juan Pérez',
          profesionalId: 1,
          sede: 'Bello'
        },
        {
          id: 2,
          participante: 'Carlos Rodríguez',
          participanteId: 2,
          tipo: FORM_TYPES.PSICOLOGIA,
          estado: 'COMPLETADO',
          fechaCreacion: '2024-01-10',
          fechaCompletado: '2024-01-12',
          profesional: 'Dra. Ana López',
          profesionalId: 2,
          sede: 'Apartadó'
        },
        {
          id: 3,
          participante: 'Laura Martínez',
          participanteId: 3,
          tipo: FORM_TYPES.ENFERMERIA,
          estado: 'EN_PROCESO',
          fechaCreacion: '2024-01-20',
          fechaCompletado: null,
          profesional: 'Enf. Carmen Silva',
          profesionalId: 3,
          sede: 'Bello'
        }
      ];
      setForms(mockForms);
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  const filteredForms = forms.filter(form => {
    if (filterType !== 'TODOS' && form.tipo !== filterType) return false;
    if (filterStatus !== 'TODOS' && form.estado !== filterStatus) return false;
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFormTypeLabel = (type) => {
    const labels = {
      [FORM_TYPES.MEDICO]: 'Médico',
      [FORM_TYPES.PSICOLOGIA]: 'Psicología',
      [FORM_TYPES.ESPIRITUAL]: 'Espiritual',
      [FORM_TYPES.ENFERMERIA]: 'Enfermería',
      [FORM_TYPES.TERAPEUTICO]: 'Terapéutico',
      [FORM_TYPES.TRABAJO_SOCIAL]: 'Trabajo Social',
      [FORM_TYPES.FONOAUDIOLOGIA]: 'Fonoaudiología',
      [FORM_TYPES.NUTRICION]: 'Nutrición'
    };
    return labels[type] || type;
  };

  const columns = [
    {
      key: 'participante',
      label: 'Participante',
      render: (value) => (
        <span className="font-Poppins font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'tipo',
      label: 'Tipo de Formulario',
      render: (value) => {
        const typeColors = {
          [FORM_TYPES.MEDICO]: 'bg-red-100 text-red-800',
          [FORM_TYPES.PSICOLOGIA]: 'bg-blue-100 text-blue-800',
          [FORM_TYPES.ESPIRITUAL]: 'bg-purple-100 text-purple-800',
          [FORM_TYPES.ENFERMERIA]: 'bg-green-100 text-green-800',
          [FORM_TYPES.TERAPEUTICO]: 'bg-yellow-100 text-yellow-800',
          [FORM_TYPES.TRABAJO_SOCIAL]: 'bg-indigo-100 text-indigo-800',
          [FORM_TYPES.FONOAUDIOLOGIA]: 'bg-pink-100 text-pink-800',
          [FORM_TYPES.NUTRICION]: 'bg-orange-100 text-orange-800'
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-Poppins font-medium ${typeColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {getFormTypeLabel(value)}
          </span>
        );
      }
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => {
        const statusConfig = {
          'PENDIENTE': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'fas fa-clock' },
          'EN_PROCESO': { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'fas fa-spinner' },
          'COMPLETADO': { bg: 'bg-green-100', text: 'text-green-800', icon: 'fas fa-check-circle' },
          'CANCELADO': { bg: 'bg-red-100', text: 'text-red-800', icon: 'fas fa-times-circle' }
        };
        const config = statusConfig[value] || statusConfig['PENDIENTE'];
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-Poppins font-medium ${config.bg} ${config.text} flex items-center space-x-1 w-fit`}>
            <i className={`${config.icon} text-xs`}></i>
            <span>{value}</span>
          </span>
        );
      }
    },
    {
      key: 'profesional',
      label: 'Profesional',
      render: (value) => (
        <span className="font-Poppins text-gray-700">{value}</span>
      )
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
      key: 'fechaCreacion',
      label: 'Fecha Creación',
      render: (value) => (
        <span className="font-Poppins text-gray-700">{formatDate(value)}</span>
      )
    },
    {
      key: 'fechaCompletado',
      label: 'Fecha Completado',
      render: (value) => (
        <span className="font-Poppins text-gray-700">{formatDate(value)}</span>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (_, row) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/forms/${row.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Ver formulario"
          >
            <i className="fas fa-eye"></i>
          </Link>
          {row.estado !== 'COMPLETADO' && (
            <Link
              to={`/dashboard/forms/${row.id}/edit`}
              className="text-green-600 hover:text-green-800 transition-colors"
              title="Editar"
            >
              <i className="fas fa-edit"></i>
            </Link>
          )}
          <button
            onClick={() => handlePrintForm(row.id)}
            className="text-purple-600 hover:text-purple-800 transition-colors"
            title="Imprimir"
          >
            <i className="fas fa-print"></i>
          </button>
        </div>
      )
    }
  ];

  const handlePrintForm = (formId) => {
    console.log('Printing form:', formId);
    // Implementation for printing form
  };

  const getStats = () => {
    const stats = {
      total: forms.length,
      pendientes: forms.filter(f => f.estado === 'PENDIENTE').length,
      enProceso: forms.filter(f => f.estado === 'EN_PROCESO').length,
      completados: forms.filter(f => f.estado === 'COMPLETADO').length
    };

    const byType = Object.values(FORM_TYPES).reduce((acc, type) => {
      acc[type] = forms.filter(f => f.tipo === type).length;
      return acc;
    }, {});

    return { ...stats, byType };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner size="xl" text="Cargando formularios..." />
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
                  <h1 className="text-2xl font-Lato font-bold text-gray-800">
                    Gestión de Formularios
                  </h1>
                  <p className="text-sm font-Poppins text-gray-600 mt-1">
                    Administra los formularios de evaluación por especialidad
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="TODOS">Todos los Tipos</option>
                    {Object.values(FORM_TYPES).map(type => (
                      <option key={type} value={type}>{getFormTypeLabel(type)}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="TODOS">Todos los Estados</option>
                    <option value="PENDIENTE">Pendientes</option>
                    <option value="EN_PROCESO">En Proceso</option>
                    <option value="COMPLETADO">Completados</option>
                    <option value="CANCELADO">Cancelados</option>
                  </select>
                  <Link
                    to="/dashboard/forms/new"
                    className="bg-primary text-white px-4 py-2 rounded-xl font-Poppins font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-plus"></i>
                    <span>Nuevo Formulario</span>
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
                    <p className="text-sm font-Poppins font-medium text-gray-600">Total Formularios</p>
                    <p className="text-3xl font-Lato font-bold text-blue-600 mt-2">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <i className="fas fa-clipboard-list text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Pendientes</p>
                    <p className="text-3xl font-Lato font-bold text-yellow-600 mt-2">
                      {stats.pendientes}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                    <i className="fas fa-clock text-yellow-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">En Proceso</p>
                    <p className="text-3xl font-Lato font-bold text-blue-600 mt-2">
                      {stats.enProceso}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <i className="fas fa-spinner text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Completados</p>
                    <p className="text-3xl font-Lato font-bold text-green-600 mt-2">
                      {stats.completados}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Forms by Type Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              <h3 className="text-xl font-Lato font-bold text-gray-800 mb-6">Formularios por Especialidad</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {Object.values(FORM_TYPES).map(type => (
                  <div key={type} className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-Lato font-bold text-gray-800">
                      {stats.byType[type] || 0}
                    </p>
                    <p className="text-xs font-Poppins text-gray-600 mt-1">
                      {getFormTypeLabel(type)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Forms Table */}
            <DataTable
              data={filteredForms}
              columns={columns}
              searchable={true}
              sortable={true}
              pagination={true}
              pageSize={15}
              onRowClick={(form) => {
                window.location.href = `/dashboard/forms/${form.id}`;
              }}
              className="mb-8"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FormsList;
