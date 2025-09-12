import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Sidebar';
import DataTable from '../../components/UI/DataTable';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { dbService } from '../../services/databaseService';

const GuardiansList = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadGuardians();
  }, []);

  const loadGuardians = async () => {
    try {
      setLoading(true);
      // Mock data for guardians - in real implementation, this would come from Supabase
      const mockGuardians = [
        {
          id: 1,
          documento: '43123456',
          nombreCompleto: 'Ana María González',
          telefono: '3001234567',
          email: 'ana.gonzalez@email.com',
          direccion: 'Calle 45 #23-12, Bello',
          parentesco: 'MADRE',
          participantes: ['María González', 'Pedro González'],
          estado: 'ACTIVO',
          fechaRegistro: '2024-01-15'
        },
        {
          id: 2,
          documento: '71234567',
          nombreCompleto: 'Carlos Rodríguez Pérez',
          telefono: '3109876543',
          email: 'carlos.rodriguez@email.com',
          direccion: 'Carrera 30 #15-45, Apartadó',
          parentesco: 'PADRE',
          participantes: ['Luis Rodríguez'],
          estado: 'ACTIVO',
          fechaRegistro: '2024-01-10'
        },
        {
          id: 3,
          documento: '52987654',
          nombreCompleto: 'Isabel Martínez López',
          telefono: '3205551234',
          email: 'isabel.martinez@email.com',
          direccion: 'Avenida 80 #12-34, Bello',
          parentesco: 'ABUELA',
          participantes: ['Laura Martínez'],
          estado: 'ACTIVO',
          fechaRegistro: '2024-01-20'
        }
      ];
      setGuardians(mockGuardians);
    } catch (error) {
      console.error('Error loading guardians:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
      key: 'parentesco',
      label: 'Parentesco',
      render: (value) => {
        const parentescoColors = {
          'MADRE': 'bg-pink-100 text-pink-800',
          'PADRE': 'bg-blue-100 text-blue-800',
          'ABUELO': 'bg-purple-100 text-purple-800',
          'ABUELA': 'bg-purple-100 text-purple-800',
          'TIO': 'bg-green-100 text-green-800',
          'TIA': 'bg-green-100 text-green-800',
          'HERMANO': 'bg-yellow-100 text-yellow-800',
          'HERMANA': 'bg-yellow-100 text-yellow-800',
          'OTRO': 'bg-gray-100 text-gray-800'
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-Poppins font-medium ${parentescoColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'participantes',
      label: 'Participantes a Cargo',
      render: (value) => (
        <div className="space-y-1">
          {value.map((participante, index) => (
            <span key={index} className="block text-xs font-Poppins text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {participante}
            </span>
          ))}
        </div>
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
            to={`/dashboard/guardians/${row.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Ver perfil"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <Link
            to={`/dashboard/guardians/${row.id}/edit`}
            className="text-green-600 hover:text-green-800 transition-colors"
            title="Editar"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <button
            onClick={() => handleContactGuardian(row)}
            className="text-purple-600 hover:text-purple-800 transition-colors"
            title="Contactar"
          >
            <i className="fas fa-phone"></i>
          </button>
        </div>
      )
    }
  ];

  const handleContactGuardian = (guardian) => {
    // Implementation for contacting guardian (phone/email)
    console.log('Contacting guardian:', guardian);
  };

  const getStats = () => {
    const totalParticipants = guardians.reduce((sum, g) => sum + g.participantes.length, 0);
    
    return {
      total: guardians.length,
      activos: guardians.filter(g => g.estado === 'ACTIVO').length,
      totalParticipants,
      byParentesco: guardians.reduce((acc, g) => {
        acc[g.parentesco] = (acc[g.parentesco] || 0) + 1;
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
              <LoadingSpinner size="xl" text="Cargando acudientes..." />
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
                    Gestión de Acudientes
                  </h1>
                  <p className="text-sm font-Poppins text-gray-600 mt-1">
                    Administra los acudientes responsables de los participantes
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard/guardians/new"
                    className="bg-primary text-white px-4 py-2 rounded-xl font-Poppins font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-plus"></i>
                    <span>Nuevo Acudiente</span>
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
                    <p className="text-sm font-Poppins font-medium text-gray-600">Total Acudientes</p>
                    <p className="text-3xl font-Lato font-bold text-blue-600 mt-2">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <i className="fas fa-users text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Activos</p>
                    <p className="text-3xl font-Lato font-bold text-green-600 mt-2">
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
                    <p className="text-sm font-Poppins font-medium text-gray-600">Participantes a Cargo</p>
                    <p className="text-3xl font-Lato font-bold text-purple-600 mt-2">
                      {stats.totalParticipants}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                    <i className="fas fa-child text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Promedio por Acudiente</p>
                    <p className="text-3xl font-Lato font-bold text-orange-600 mt-2">
                      {stats.total > 0 ? (stats.totalParticipants / stats.total).toFixed(1) : 0}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                    <i className="fas fa-chart-line text-orange-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Parentesco Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              <h3 className="text-xl font-Lato font-bold text-gray-800 mb-6">Distribución por Parentesco</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(stats.byParentesco).map(([parentesco, count]) => (
                  <div key={parentesco} className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-Lato font-bold text-gray-800">
                      {count}
                    </p>
                    <p className="text-xs font-Poppins text-gray-600 mt-1">
                      {parentesco}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guardians Table */}
            <DataTable
              data={guardians}
              columns={columns}
              searchable={true}
              sortable={true}
              pagination={true}
              pageSize={15}
              onRowClick={(guardian) => {
                window.location.href = `/dashboard/guardians/${guardian.id}`;
              }}
              className="mb-8"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuardiansList;
