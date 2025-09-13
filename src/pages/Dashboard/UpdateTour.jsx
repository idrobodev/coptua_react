import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Message from "../../components/Message/Message";
import logo from "../../images/logo.png";
const axios = require("axios");

const UpdateTour = () => {
  const [data, setData] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const { id } = useParams();
  const history = useHistory();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  
  // Sidebar state management
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

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      history.push('/');
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    }
  };

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

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .get(`https://shocking-cheateau-10764.herokuapp.com/tour/${id}`)
      .then((result) => {
        if (result.data) {
          setData(result.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error loading tour:', error);
        setLoading(false);
      });
  }, [id]);

  const create_by = currentUser.displayName || currentUser.email;
  const create_at = new Date().toLocaleDateString();
  const handleSubmit = (e) => {
    e.preventDefault();
    data.create_by = create_by;
    data.create_at = create_at;

    // insert tour data
    axios
      .put(
        `https://shocking-cheateau-10764.herokuapp.com/update-tour/${id}`,
        data
      )
      .then((result) => {
        if (result.data.modifiedCount > 0) {
          setMessage("Tour Package updated success!");
        }
      })
      .catch((error) => console.error('Error updating tour:', error));
  };
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
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <img 
                      src={logo}
                      alt="Todo por un Alma" 
                      className="h-10 w-10 rounded-lg shadow-sm"
                    />
                    <div>
                      <h1 className="text-2xl font-Lato font-bold text-gray-800">
                        {isLoading ? 'Actualizando...' : `Actualizar Tour: ${data?.title || ''}`}
                      </h1>
                      <p className="text-sm font-Poppins text-gray-600">Gestión de Paquetes Turísticos</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Perfil de Usuario */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors"
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                    >
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

          {/* Message */}
          {message && (
            <div className="px-6 py-4">
              <div className="max-w-md ml-auto">
                <Message message={message} />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="px-6 py-8">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600 font-Poppins">Cargando información del tour...</span>
              </div>
            </div>
          )}

          {/* Form Content */}
          {!isLoading && (
            <div className="px-6 py-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="title">
                        Título del Tour
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                        placeholder="Ingrese el título del tour"
                        value={data?.title || ''}
                        onChange={onChange}
                        name="title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="tour_date">
                        Fecha del Tour
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                        type="date"
                        value={data?.tour_date || ''}
                        onChange={onChange}
                        name="tour_date"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="image_url">
                        URL de la Imagen
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                        type="url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={data?.image_url || ''}
                        onChange={onChange}
                        name="image_url"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="package_price">
                        Precio del Paquete
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                        type="number"
                        placeholder="0"
                        value={data?.package_price || ''}
                        onChange={onChange}
                        name="package_price"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="description">
                      Descripción
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins resize-none"
                      rows="4"
                      placeholder="Descripción detallada del tour"
                      value={data?.description || ''}
                      onChange={onChange}
                      name="description"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-Poppins font-medium text-gray-700" htmlFor="status">
                      Estado
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-Poppins"
                      value={data?.status || ''}
                      onChange={onChange}
                    >
                      <option value="active">Activo</option>
                      <option value="pending">Pendiente</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => history.goBack()}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-Poppins font-medium"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-Poppins font-medium shadow-lg hover:shadow-xl"
                    >
                      Actualizar Tour
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UpdateTour;
