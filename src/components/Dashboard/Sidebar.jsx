import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../../images/logo.png";

const Sidebar = ({ isOpen = false, onToggle = () => {}, isCollapsed = false, onToggleCollapse = () => {} }) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      icon: 'fas fa-home',
      label: 'Dashboard',
      link: '/dashboard',
      badge: null
    },
    {
      id: 'participantes',
      icon: 'fas fa-users',
      label: 'Participantes',
      link: null,
      badge: '12',
      submenu: [
        { label: 'Lista de Participantes', link: '/participantes' },
        { label: 'Nuevo Participante', link: '/participantes/nuevo' },
        { label: 'Calendario', link: '/participantes/calendario' },
        { label: 'Perfiles', link: '/participantes/perfiles' }
      ]
    },
    {
      id: 'profesionales',
      icon: 'fas fa-user-md',
      label: 'Profesionales',
      link: null,
      badge: null,
      submenu: [
        { label: 'Directorio', link: '/profesionales' },
        { label: 'Agenda', link: '/profesionales/agenda' },
        { label: 'Carga de Trabajo', link: '/profesionales/carga' }
      ]
    },
    {
      id: 'financiero',
      icon: 'fas fa-dollar-sign',
      label: 'Módulo Financiero',
      link: null,
      badge: '3',
      submenu: [
        { label: 'Mensualidades', link: '/financiero/mensualidades' },
        { label: 'Proyecciones', link: '/financiero/proyecciones' },
        { label: 'Reportes', link: '/financiero/reportes' },
        { label: 'Recordatorios', link: '/financiero/recordatorios' }
      ]
    },
    {
      id: 'formularios',
      icon: 'fas fa-clipboard-list',
      label: 'Formularios',
      link: null,
      badge: '5',
      submenu: [
        { label: 'Pendientes', link: '/formularios/pendientes' },
        { label: 'Progreso', link: '/formularios/progreso' },
        { label: 'Alertas', link: '/formularios/alertas' },
        { label: 'Exportar', link: '/formularios/exportar' }
      ]
    },
    {
      id: 'reportes',
      icon: 'fas fa-chart-bar',
      label: 'Reportes',
      link: null,
      badge: null,
      submenu: [
        { label: 'Estadísticas', link: '/reportes/estadisticas' },
        { label: 'Demográficos', link: '/reportes/demograficos' },
        { label: 'Ejecutivos', link: '/reportes/ejecutivos' },
        { label: 'Personalizados', link: '/reportes/personalizados' }
      ]
    },
    {
      id: 'configuracion',
      icon: 'fas fa-cog',
      label: 'Configuración',
      link: null,
      badge: null,
      submenu: [
        { label: 'Usuarios', link: '/configuracion/usuarios' },
        { label: 'Permisos', link: '/configuracion/permisos' },
        { label: 'Sistema', link: '/configuracion/sistema' },
        { label: 'Auditoría', link: '/configuracion/auditoria' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Toggle Button - Mobile */}
      {isMobile && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      )}
      
      {/* Toggle Button - Desktop */}
      {!isMobile && (
        <button
          onClick={onToggleCollapse}
          className="fixed top-4 left-4 z-50 hidden md:block bg-white text-gray-600 p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
          style={{ left: isCollapsed ? '4px' : '260px' }}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white z-40
        transform transition-all duration-300 ease-in-out shadow-2xl
        ${
          isCollapsed && !isMobile
            ? 'w-16 translate-x-0' 
            : isOpen || !isMobile
              ? 'w-64 translate-x-0' 
              : 'w-64 -translate-x-full'
        }
        ${isMobile ? 'md:relative md:z-auto' : ''}
      `}>
        {/* Header with Logo */}
        <div className="p-6 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Corporación Logo" 
              className="w-10 h-10 rounded-full object-cover bg-white p-1 flex-shrink-0"
            />
            <div className={`${isCollapsed && !isMobile ? 'hidden' : 'block'} transition-all duration-300`}>
              <h2 className="text-lg font-Lato font-bold">Corporación</h2>
              <p className="text-xs font-Poppins opacity-80">Todo por un Alma</p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.link ? (
                  <Link
                    to={item.link}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-200 group"
                    title={isCollapsed ? item.label : ''}
                  >
                    <i className={`${item.icon} text-lg group-hover:scale-110 transition-transform flex-shrink-0`}></i>
                    <span className={`font-Poppins ${isCollapsed && !isMobile ? 'hidden' : 'block'} transition-all duration-300`}>{item.label}</span>
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} w-full px-4 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-200 group`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={`${item.icon} text-lg group-hover:scale-110 transition-transform flex-shrink-0`}></i>
                        <span className={`font-Poppins ${isCollapsed && !isMobile ? 'hidden' : 'block'} transition-all duration-300`}>{item.label}</span>
                      </div>
                      <i className={`fas fa-chevron-down transition-transform duration-200 ${
                        expandedSections[item.id] ? 'rotate-180' : ''
                      } ${isCollapsed && !isMobile ? 'hidden' : 'block'}`}></i>
                    </button>
                    
                    {expandedSections[item.id] && (!isCollapsed || isMobile) && (
                      <ul className="ml-6 space-y-2 mt-2">
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              to={subItem.link}
                              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-5 transition-colors text-sm font-Poppins"
                              onClick={isMobile ? onToggle : undefined}
                            >
                              <i className="fas fa-circle text-xs"></i>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del Usuario */}
        <div className="p-4 border-t border-white border-opacity-20 mt-auto">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-3`}>
            <div className="relative">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Usuario"
                  className={`rounded-full border-2 border-white shadow-lg ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}
                />
              ) : (
                <div className={`rounded-full border-2 border-white shadow-lg bg-white flex items-center justify-center ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <i className="fas fa-user text-primary text-sm"></i>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-Poppins font-medium text-white truncate">
                  {currentUser?.displayName || currentUser?.email}
                </p>
                <p className="text-xs font-Poppins text-white text-opacity-70">Administrador</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-full px-4 py-2 text-sm text-white text-opacity-90 rounded-xl hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 font-Poppins font-medium group`}
          >
            <i className="fas fa-sign-out-alt mr-3 group-hover:scale-110 transition-transform"></i>
            {!isCollapsed && 'Cerrar Sesión'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
