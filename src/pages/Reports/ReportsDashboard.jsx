import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { ParticipantsBySedeChart, PaymentStatusChart, MonthlyTrendChart, FormStatusChart } from '../../components/Charts/DashboardCharts';
import { dbService } from '../../services/databaseService';

const ReportsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('MENSUAL');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState({
    participantesBySede: [],
    paymentStatus: { pagadas: 0, pendientes: 0, vencidas: 0 },
    monthlyTrend: [],
    formStatus: [],
    generalStats: {}
  });

  useEffect(() => {
    loadReportData();
  }, [selectedPeriod, selectedYear]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      
      // Mock report data - in real implementation, this would come from Supabase
      const mockReportData = {
        participantesBySede: [
          { sede: 'Bello', activos: 28, inactivos: 5, total: 33 },
          { sede: 'Apartadó', activos: 18, inactivos: 2, total: 20 }
        ],
        paymentStatus: { pagadas: 42, pendientes: 8, vencidas: 3 },
        monthlyTrend: [
          { mes: 'Ene', ingresos: 6800000, nuevos: 5, egresos: 4200000 },
          { mes: 'Feb', ingresos: 7200000, nuevos: 3, egresos: 4500000 },
          { mes: 'Mar', ingresos: 6900000, nuevos: 4, egresos: 4300000 },
          { mes: 'Abr', ingresos: 7500000, nuevos: 6, egresos: 4600000 },
          { mes: 'May', ingresos: 7800000, nuevos: 2, egresos: 4800000 },
          { mes: 'Jun', ingresos: 8100000, nuevos: 4, egresos: 4900000 }
        ],
        formStatus: [
          { tipo: 'Médico', pendientes: 5, completados: 15, total: 20 },
          { tipo: 'Psicología', pendientes: 3, completados: 12, total: 15 },
          { tipo: 'Espiritual', pendientes: 2, completados: 18, total: 20 },
          { tipo: 'Enfermería', pendientes: 4, completados: 16, total: 20 },
          { tipo: 'Terapéutico', pendientes: 1, completados: 14, total: 15 },
          { tipo: 'T. Social', pendientes: 3, completados: 11, total: 14 }
        ],
        generalStats: {
          totalParticipantes: 53,
          totalProfesionales: 12,
          totalAcudientes: 35,
          totalIngresos: 45300000,
          promedioMensual: 7550000,
          tasaRetencion: 94.3,
          satisfaccionPromedio: 4.7
        }
      };
      
      setReportData(mockReportData);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportReport = (format) => {
    // TODO: Implementation for exporting reports
    alert(`Exportando reporte en formato ${format}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebarOpen} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-20`}>
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner size="xl" text="Generando reportes..." />
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
                    Reportes y Estadísticas
                  </h1>
                  <p className="text-sm font-Poppins text-gray-600 mt-1">
                    Análisis detallado del desempeño de la fundación
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="MENSUAL">Mensual</option>
                    <option value="TRIMESTRAL">Trimestral</option>
                    <option value="SEMESTRAL">Semestral</option>
                    <option value="ANUAL">Anual</option>
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-Poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => exportReport('PDF')}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg font-Poppins font-medium hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <i className="fas fa-file-pdf"></i>
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => exportReport('Excel')}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg font-Poppins font-medium hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <i className="fas fa-file-excel"></i>
                      <span>Excel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Total Participantes</p>
                    <p className="text-3xl font-Lato font-bold text-blue-600 mt-2">
                      {reportData.generalStats.totalParticipantes}
                    </p>
                    <p className="text-xs font-Poppins text-green-600 mt-1">
                      <i className="fas fa-arrow-up"></i> +5.2% vs mes anterior
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
                    <p className="text-sm font-Poppins font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-2xl font-Lato font-bold text-green-600 mt-2">
                      {formatCurrency(reportData.generalStats.totalIngresos)}
                    </p>
                    <p className="text-xs font-Poppins text-green-600 mt-1">
                      <i className="fas fa-arrow-up"></i> +8.1% vs mes anterior
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                    <i className="fas fa-dollar-sign text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Tasa de Retención</p>
                    <p className="text-3xl font-Lato font-bold text-purple-600 mt-2">
                      {reportData.generalStats.tasaRetencion}%
                    </p>
                    <p className="text-xs font-Poppins text-green-600 mt-1">
                      <i className="fas fa-arrow-up"></i> +1.3% vs mes anterior
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                    <i className="fas fa-chart-line text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-Poppins font-medium text-gray-600">Satisfacción</p>
                    <p className="text-3xl font-Lato font-bold text-yellow-600 mt-2">
                      {reportData.generalStats.satisfaccionPromedio}/5
                    </p>
                    <p className="text-xs font-Poppins text-green-600 mt-1">
                      <i className="fas fa-arrow-up"></i> +0.2 vs mes anterior
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                    <i className="fas fa-star text-yellow-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Participantes por Sede */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-Lato font-bold text-gray-800">Participantes por Sede</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <ParticipantsBySedeChart data={reportData.participantesBySede} />
              </div>
              
              {/* Estado de Pagos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-Lato font-bold text-gray-800">Estado de Mensualidades</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <PaymentStatusChart data={reportData.paymentStatus} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Tendencias Mensuales */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-Lato font-bold text-gray-800">Tendencias Financieras</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <MonthlyTrendChart data={reportData.monthlyTrend} />
              </div>
              
              {/* Estado de Formularios */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-Lato font-bold text-gray-800">Formularios por Especialidad</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <FormStatusChart data={reportData.formStatus} />
              </div>
            </div>

            {/* Detailed Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-Lato font-bold text-gray-800 mb-6">Resumen Financiero</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Ingresos por Mensualidades</span>
                    <span className="font-Poppins font-semibold text-gray-900">{formatCurrency(42000000)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Donaciones</span>
                    <span className="font-Poppins font-semibold text-gray-900">{formatCurrency(3300000)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Gastos Operacionales</span>
                    <span className="font-Poppins font-semibold text-red-600">-{formatCurrency(28000000)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Salarios</span>
                    <span className="font-Poppins font-semibold text-red-600">-{formatCurrency(15000000)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                    <span className="font-Lato font-bold text-gray-800">Balance Neto</span>
                    <span className="font-Lato font-bold text-green-600">{formatCurrency(2300000)}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-Lato font-bold text-gray-800 mb-6">Métricas de Desempeño</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Tiempo Promedio de Atención</span>
                    <span className="font-Poppins font-semibold text-gray-900">45 min</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Formularios Completados/Mes</span>
                    <span className="font-Poppins font-semibold text-gray-900">89</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Ausentismo Promedio</span>
                    <span className="font-Poppins font-semibold text-gray-900">12%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-Poppins text-gray-600">Nuevos Ingresos/Mes</span>
                    <span className="font-Poppins font-semibold text-gray-900">4.2</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                    <span className="font-Lato font-bold text-gray-800">Eficiencia General</span>
                    <span className="font-Lato font-bold text-green-600">87.5%</span>
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

export default ReportsDashboard;
