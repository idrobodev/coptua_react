import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../../images/logo.png";

const Sidebar = ({ isOpen = false, onToggle = () => {}, isCollapsed = false, onToggleCollapse = () => {} }) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
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
      console.error('Error during logout:', error);
    }
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
      link: '/participantes',
      badge: '12'
    },
    {
      id: 'profesionales',
      icon: 'fas fa-user-md',
      label: 'Profesionales',
      link: '/profesionales',
      badge: null
    },
    {
      id: 'financiero',
      icon: 'fas fa-dollar-sign',
      label: 'Módulo Financiero',
      link: '/financiero',
      badge: '3'
    },
    {
      id: 'formularios',
      icon: 'fas fa-clipboard-list',
      label: 'Formularios',
      link: '/formularios',
      badge: '5'
    },
    {
      id: 'reportes',
      icon: 'fas fa-chart-bar',
      label: 'Reportes',
      link: '/reportes',
      badge: null
    },
    {
      id: 'configuracion',
      icon: 'fas fa-cog',
      label: 'Configuración',
      link: '/configuracion',
      badge: null
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
      
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full text-gray-700 z-50
          transform transition-all duration-300 ease-in-out shadow-2xl
          ${
            isCollapsed && !isMobile
              ? 'w-16 translate-x-0' 
              : isOpen || !isMobile
                ? 'w-64 translate-x-0' 
                : 'w-64 -translate-x-full'
          }
          ${isMobile ? 'md:relative md:z-auto' : ''}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header with Logo */}
        <div className={`${isCollapsed && !isMobile ? 'p-3' : 'p-6'} border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300`}>
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'space-x-3'}`}>
            <div className="relative">
              <img 
                src={logo} 
                alt="Corporación Logo" 
                className={`${isCollapsed && !isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl object-cover bg-white p-2 flex-shrink-0 shadow-md transition-all duration-300`}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className={`${isCollapsed && !isMobile ? 'hidden' : 'block'} transition-all duration-300`}>
              <h2 className="text-lg font-Lato font-bold text-gray-800">Corporación</h2>
              <p className="text-xs font-Poppins text-gray-600">Todo por un Alma</p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 hover:shadow-sm transition-all duration-200 group relative overflow-hidden"
                  title={isCollapsed ? item.label : ''}
                  onClick={isMobile ? onToggle : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-25/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <i className={`${item.icon} text-lg text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all flex-shrink-0 relative z-10`}></i>
                  <span className={`font-Poppins font-medium text-gray-700 group-hover:text-gray-900 ${isCollapsed && !isMobile ? 'hidden' : 'block'} transition-all duration-300 relative z-10`}>{item.label}</span>
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del Usuario */}
        <div className="p-4 border-t border-gray-200 mt-auto bg-gradient-to-r from-gray-50 to-gray-100">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-3`}>
            <div className="relative flex-shrink-0">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Usuario"
                  className={`rounded-full border-2 border-gray-300 shadow-md ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}
                />
              ) : (
                <div className={`rounded-full border-2 border-gray-300 shadow-md bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <i className="fas fa-user text-blue-600 text-sm"></i>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-Poppins font-semibold text-gray-800 truncate">
                  {currentUser?.displayName || currentUser?.email?.split('@')[0]}
                </p>
                <p className="text-xs font-Poppins text-gray-600">Administrador</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-full px-4 py-2 text-sm text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 hover:shadow-sm transition-all duration-200 font-Poppins font-medium group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-red-25/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <i className="fas fa-sign-out-alt mr-3 group-hover:scale-110 transition-transform relative z-10"></i>
            <span className="relative z-10">{!isCollapsed && 'Cerrar Sesión'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
