import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { dbService } from "../../services/databaseService";
import logo from "../../images/logo.png";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Initialize chartData with default values
  const [chartData, setChartData] = useState({
    formStatus: [
      { tipo: 'Ingreso', pendientes: 0 },
      { tipo: 'Seguimiento', pendientes: 0 },
      { tipo: 'Egreso', pendientes: 0 }
    ]
  });

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load basic stats
        const { data: stats } = await dbService.getDashboardStats();
        setDashboardData(stats);
        
        // Update chartData with actual data if available
        if (stats?.formStatus) {
          setChartData(prev => ({
            ...prev,
            formStatus: stats.formStatus
          }));
        }
        
        // Load sedes
        await dbService.getSedes();
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const v = localStorage.getItem('sidebarOpen');
      return v ? JSON.parse(v) : false;
    } catch (_) {
      return false;
    }
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const v = localStorage.getItem('sidebarCollapsed');
      return v ? JSON.parse(v) : window.innerWidth < 768 ? true : false; // Default to collapsed on mobile
    } catch (_) {
      return window.innerWidth < 768 ? true : false;
    }
  });

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebarOpen = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSidebarOpen(prev => {
      const next = !prev;
      try { localStorage.setItem('sidebarOpen', JSON.stringify(next)); } catch (_) {}
      return next;
    });
  }, []);

  const toggleSidebarCollapsed = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSidebarCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem('sidebarCollapsed', JSON.stringify(next)); } catch (_) {}
      return next;
    });
  }, []);

  // Close user menu on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await logout();
      setUserMenuOpen(false);
      history.push('/');
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    }
  }, [history, logout]);

  const handleCopyEmail = async () => {
    try {
      if (currentUser?.email) {
        await navigator.clipboard.writeText(currentUser.email);
        setUserMenuOpen(false);
      }
    } catch (e) {
      console.error('No se pudo copiar el correo', e);
    }
  };

  const alertas = [];
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner size="xl" text="Cargando dashboard..." />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} pt-20`}>
          {/* Header Superior */}
          <header className="fixed top-0 right-0 left-0 z-40 bg-white bg-opacity-90 backdrop-blur-lg shadow-md border-b border-gray-200">
            <div className={`px-6 py-3 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Botón hamburguesa */}
                  <button
                    onClick={toggleSidebarOpen}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Abrir menú"
                  >
                    <i className="fas fa-bars text-xl text-gray-700"></i>
                  </button>

                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <img 
                      src={logo}
                      alt="Todo por un Alma" 
                      className="h-10 w-10 rounded-lg shadow-sm"
                    />
                    <div>
                      <h1 className="text-2xl font-Lato font-bold text-gray-800">
                        Dashboard
                      </h1>
                      <p className="text-sm font-Poppins text-gray-600">Corporación Todo por un Alma</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Perfil de Usuario */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="flex items-center space-x-3 bg-gray-100 rounded-full pl-2 pr-3 py-1.5 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-haspopup="true">
                      <div className="relative">
                        {currentUser?.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt="Usuario"
                            className="w-8 h-8 rounded-full border-2 border-primary"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                            <i className="fas fa-user text-white text-sm"></i>
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-sm font-Poppins font-medium text-gray-700 hidden md:block">
                        {currentUser?.displayName || currentUser?.email}
                      </span>
                      <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'} text-gray-500 text-xs hidden md:block`}></i>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs text-gray-500 font-Poppins">Sesión iniciada como</p>
                          <p className="text-sm text-gray-800 truncate font-Poppins font-medium">{currentUser?.email}</p>
                        </div>
                        <ul className="py-1">
                          <li>
                            <button onClick={handleCopyEmail} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-Poppins">
                              <i className="fas fa-copy mr-2 text-gray-500"></i>
                              Copiar correo
                            </button>
                          </li>
                          <li>
                            <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-Poppins">
                              <i className="fas fa-sign-out-alt mr-2"></i>
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Alertas */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {alertas.map((alerta, index) => (
                <div key={index} className={`p-4 rounded-2xl border-l-4 ${
                  alerta.color === 'red' ? 'bg-red-50 border-red-500' :
                  alerta.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                  alerta.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                  'bg-green-50 border-green-500'
                } shadow-md hover:shadow-lg transition-shadow duration-300`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      alerta.color === 'red' ? 'bg-red-100' :
                      alerta.color === 'yellow' ? 'bg-yellow-100' :
                      alerta.color === 'blue' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      <i className={`${alerta.icon} text-sm ${
                        alerta.color === 'red' ? 'text-red-600' :
                        alerta.color === 'yellow' ? 'text-yellow-600' :
                        alerta.color === 'blue' ? 'text-blue-600' :
                        'text-green-600'
                      }`}></i>
                    </div>
                    <p className={`text-sm font-Poppins font-medium ${
                      alerta.color === 'red' ? 'text-red-800' :
                      alerta.color === 'yellow' ? 'text-yellow-800' :
                      alerta.color === 'blue' ? 'text-blue-800' :
                      'text-green-800'
                    }`}>{alerta.mensaje}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widgets de Resumen General */}
          <div className="px-6 py-6">
            <h2 className="text-2xl font-Lato font-bold text-gray-800 mb-6">Resumen General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Participantes Activos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Participantes Activos</p>
                    <p className="text-3xl font-Lato font-bold text-blue-600 mt-2">{dashboardData?.participantesActivos || 0}</p>
                    <p className="text-xs font-Poppins text-gray-500 mt-1">Capacidad: {dashboardData?.capacidadTotal || 0}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-users text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{width: `${dashboardData ? (dashboardData.ocupacionActual / dashboardData.capacidadTotal) * 100 : 0}%`}}
                    ></div>
                  </div>
                  <p className="text-xs font-Poppins text-gray-500 mt-2">
                    {dashboardData ? Math.round((dashboardData.ocupacionActual / dashboardData.capacidadTotal) * 100) : 0}% de ocupación
                  </p>
                </div>
              </div>

              {/* Estado Financiero */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Mensualidades</p>
                    <p className="text-3xl font-Lato font-bold text-green-600 mt-2">{dashboardData?.mensualidadesPagadas || 0}</p>
                    <p className="text-xs font-Poppins text-gray-500 mt-1">Pendientes: {dashboardData?.mensualidadesPendientes || 0}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-dollar-sign text-green-600 text-2xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-Poppins text-gray-500 mb-2">
                    <span>Pagadas</span>
                    <span>{dashboardData ? Math.round((dashboardData.mensualidadesPagadas / (dashboardData.mensualidadesPagadas + dashboardData.mensualidadesPendientes)) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${dashboardData ? Math.round((dashboardData.mensualidadesPagadas / (dashboardData.mensualidadesPagadas + dashboardData.mensualidadesPendientes)) * 100) : 0}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Formularios Pendientes */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Formularios Pendientes</p>
                    <p className="text-3xl font-Lato font-bold text-yellow-600 mt-2">{chartData.formStatus.reduce((sum, form) => sum + form.pendientes, 0)}</p>
                    <p className="text-xs font-Poppins text-gray-500 mt-1">Requieren atención</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-clipboard-list text-yellow-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              {/* Profesionales Activos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Profesionales</p>
                    <p className="text-3xl font-Lato font-bold text-purple-600 mt-2">{dashboardData?.profesionalesActivos || 0}</p>
                    <p className="text-xs font-Poppins text-gray-500 mt-1">En servicio</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-md text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          {/* Botones de Acceso Rápido */}
          <div className="px-6 py-6">
            <h3 className="text-xl font-Lato font-bold text-gray-800 mb-4">Acceso Rápido</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-plus text-blue-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Participante</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Registrar Pago</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-clipboard-list text-yellow-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Formulario</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-md text-purple-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Profesional</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-chart-bar text-indigo-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Ver Reportes</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-users text-pink-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Gestionar Acudientes</span>
                </div>
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
