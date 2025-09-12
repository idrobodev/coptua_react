import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/Context/AuthContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { ParticipantsBySedeChart, PaymentStatusChart, MonthlyTrendChart, FormStatusChart } from "../../components/Charts/DashboardCharts";
import { dbService } from "../../services/databaseService";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [selectedSede, setSelectedSede] = useState("Todas");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sedes, setSedes] = useState([]);
  const [chartData, setChartData] = useState({
    participantesBySede: [],
    paymentStatus: { pagadas: 0, pendientes: 0, vencidas: 0 },
    monthlyTrend: [],
    formStatus: []
  });

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load basic stats
        const { data: stats } = await dbService.getDashboardStats();
        setDashboardData(stats);
        
        // Load sedes
        const { data: sedesData } = await dbService.getSedes();
        setSedes(sedesData || []);
        
        // Load chart data
        setChartData({
          participantesBySede: [
            { sede: 'Bello', activos: 28 },
            { sede: 'Apartadó', activos: 18 }
          ],
          paymentStatus: { pagadas: 38, pendientes: 7, vencidas: 3 },
          monthlyTrend: [
            { mes: 'Ene', ingresos: 6800000, nuevos: 5 },
            { mes: 'Feb', ingresos: 7200000, nuevos: 3 },
            { mes: 'Mar', ingresos: 6900000, nuevos: 4 },
            { mes: 'Abr', ingresos: 7500000, nuevos: 6 },
            { mes: 'May', ingresos: 7800000, nuevos: 2 },
            { mes: 'Jun', ingresos: 8100000, nuevos: 4 }
          ],
          formStatus: [
            { tipo: 'Médico', pendientes: 5, completados: 15 },
            { tipo: 'Psicología', pendientes: 3, completados: 12 },
            { tipo: 'Espiritual', pendientes: 2, completados: 18 },
            { tipo: 'Enfermería', pendientes: 4, completados: 16 },
            { tipo: 'Terapéutico', pendientes: 1, completados: 14 },
            { tipo: 'T. Social', pendientes: 3, completados: 11 }
          ]
        });
        
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
      return v ? JSON.parse(v) : false;
    } catch (_) {
      return false;
    }
  });

  const toggleSidebarOpen = () => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    try { localStorage.setItem('sidebarOpen', JSON.stringify(next)); } catch (_) {}
  };

  const toggleSidebarCollapsed = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    try { localStorage.setItem('sidebarCollapsed', JSON.stringify(next)); } catch (_) {}
  };

  const alertas = [
    { tipo: "urgente", mensaje: "3 mensualidades vencidas", color: "red", icon: "fas fa-exclamation-circle" },
    { tipo: "atencion", mensaje: "5 formularios atrasados", color: "yellow", icon: "fas fa-clock" },
    { tipo: "info", mensaje: "2 cumpleaños esta semana", color: "blue", icon: "fas fa-birthday-cake" },
    { tipo: "info", mensaje: "Reunión de equipo mañana", color: "green", icon: "fas fa-users" }
  ];
  
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
          {/* Header Superior */}
          <header className="fixed top-0 right-0 left-0 z-40 bg-white bg-opacity-95 backdrop-blur-md shadow-lg border-b border-gray-200">
            <div className={`px-4 md:px-6 py-4 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Botón hamburguesa */}
                  <button
                    onClick={() => { setSidebarOpen(true); try { localStorage.setItem('sidebarOpen', 'true'); } catch (_) {} }}
                    className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    aria-label="Abrir menú"
                  >
                    <i className="fas fa-bars text-xl text-gray-700"></i>
                  </button>
                  {/* Toggle colapso desktop */}
                  <button
                    onClick={toggleSidebarCollapsed}
                    className="hidden md:inline-flex p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    aria-label="Colapsar barra lateral"
                    title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
                  >
                    <i className={`fas ${sidebarCollapsed ? 'fa-angle-double-right' : 'fa-angle-double-left'} text-xl text-gray-700`}></i>
                  </button>
                  <div>
                    <h1 className="text-2xl font-Montserrat font-bold text-gray-800">
                      Dashboard
                    </h1>
                    <p className="text-sm font-Poppins text-gray-600">Corporación Todo por un Alma</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-Poppins text-gray-600">Sede:</span>
                    <select 
                      value={selectedSede} 
                      onChange={(e) => setSelectedSede(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Todas">Todas las Sedes</option>
                      {sedes.map(sede => (
                        <option key={sede.id} value={sede.nombre}>{sede.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Buscador Global */}
                  <div className="relative hidden lg:block">
                    <input
                      type="text"
                      placeholder="Buscar participantes, profesionales..."
                      className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                  
                  {/* Notificaciones */}
                  <div className="relative">
                    <button className="p-3 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-all duration-200 relative">
                      <i className="fas fa-bell text-xl"></i>
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-Poppins font-medium">
                        {alertas.length}
                      </span>
                    </button>
                  </div>
                  
                  {/* Perfil de Usuario */}
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2">
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
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Alertas */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {alertas.map((alerta, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  alerta.color === 'red' ? 'bg-red-50 border-red-500' :
                  alerta.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                  alerta.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                  'bg-green-50 border-green-500'
                } shadow-sm hover:shadow-md transition-shadow duration-300`}>
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
            <h2 className="text-2xl font-Montserrat font-bold text-gray-800 mb-6">Resumen General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Participantes Activos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Participantes Activos</p>
                    <p className="text-3xl font-Montserrat font-bold text-blue-600 mt-2">{dashboardData?.participantesActivos || 0}</p>
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
                    <p className="text-3xl font-Montserrat font-bold text-green-600 mt-2">{dashboardData?.mensualidadesPagadas || 0}</p>
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
                    <p className="text-3xl font-Montserrat font-bold text-yellow-600 mt-2">{chartData.formStatus.reduce((sum, form) => sum + form.pendientes, 0)}</p>
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
                    <p className="text-3xl font-Montserrat font-bold text-purple-600 mt-2">{dashboardData?.profesionalesActivos || 0}</p>
                    <p className="text-xs font-Poppins text-gray-500 mt-1">En servicio</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-md text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="px-6 py-6">
            <h2 className="text-2xl font-Montserrat font-bold text-gray-800 mb-6">Estadísticas y Análisis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Participantes por Sede */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <ParticipantsBySedeChart data={chartData.participantesBySede} />
              </div>
              
              {/* Estado de Pagos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <PaymentStatusChart data={chartData.paymentStatus} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tendencias Mensuales */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <MonthlyTrendChart data={chartData.monthlyTrend} />
              </div>
              
              {/* Estado de Formularios */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <FormStatusChart data={chartData.formStatus} />
              </div>
            </div>
          </div>

          {/* Botones de Acceso Rápido */}
          <div className="px-6 py-6">
            <h3 className="text-xl font-Montserrat font-bold text-gray-800 mb-4">Acceso Rápido</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-plus text-blue-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Participante</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Registrar Pago</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-clipboard-list text-yellow-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Formulario</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-md text-purple-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Nuevo Profesional</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-chart-bar text-indigo-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Ver Reportes</span>
                </div>
              </button>
              
              <button className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-users text-pink-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-Poppins font-medium text-gray-700">Gestionar Acudientes</span>
                </div>
              </button>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="px-6 py-6 pb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-Montserrat font-bold text-gray-800">Actividad Reciente</h3>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm font-Poppins text-gray-700">Nuevo participante registrado: <span className="font-semibold">María González</span></span>
                      <div className="text-xs font-Poppins text-gray-400 mt-1">Hace 2 horas</div>
                    </div>
                    <i className="fas fa-user-plus text-green-500"></i>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm font-Poppins text-gray-700">Pago registrado: <span className="font-semibold">Juan Pérez - $150,000</span></span>
                      <div className="text-xs font-Poppins text-gray-400 mt-1">Hace 4 horas</div>
                    </div>
                    <i className="fas fa-dollar-sign text-blue-500"></i>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm font-Poppins text-gray-700">Formulario completado: <span className="font-semibold">Evaluación Psicológica</span></span>
                      <div className="text-xs font-Poppins text-gray-400 mt-1">Hace 6 horas</div>
                    </div>
                    <i className="fas fa-clipboard-check text-yellow-500"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
