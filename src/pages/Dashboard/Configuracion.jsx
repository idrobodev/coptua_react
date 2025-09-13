import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", label: "Perfil", icon: "fas fa-user" },
    { id: "preferencias", label: "Preferencias", icon: "fas fa-sliders-h" },
    { id: "notificaciones", label: "Notificaciones", icon: "fas fa-bell" },
    { id: "seguridad", label: "Seguridad", icon: "fas fa-shield-alt" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 transition-all duration-300 md:ml-64">
          <header className="fixed top-0 right-0 left-0 z-40 bg-white bg-opacity-95 backdrop-blur-md shadow border-b border-gray-200">
            <div className="px-4 md:px-6 py-4 md:ml-64">
              <h1 className="text-2xl font-Lato font-bold text-gray-800">Configuración</h1>
              <p className="text-sm text-gray-600 font-Poppins">Administra tu perfil y preferencias de la plataforma</p>
            </div>
          </header>

          <section className="px-4 md:px-6 py-6">
            <div className="max-w-6xl mx-auto">
              {/* Tabs */}
              <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-2 flex overflow-auto">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap mr-2 ${
                      activeTab === t.id
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className={`${t.icon} text-sm`}></i>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {activeTab === "perfil" && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
                      <h2 className="text-lg font-semibold mb-4">Datos de perfil</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                          <input className="w-full border rounded-lg px-3 py-2" placeholder="Tu nombre" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Correo</label>
                          <input className="w-full border rounded-lg px-3 py-2" placeholder="correo@ejemplo.com" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-600 mb-1">Bio</label>
                          <textarea className="w-full border rounded-lg px-3 py-2" rows="3" placeholder="Cuéntanos sobre ti..." />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar cambios</button>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferencias" && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
                      <h2 className="text-lg font-semibold mb-4">Preferencias</h2>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="form-checkbox" />
                          Modo compacto de tablas
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="form-checkbox" />
                          Mostrar ayudas contextuales
                        </label>
                      </div>
                    </div>
                  )}

                  {activeTab === "notificaciones" && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
                      <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span>Alertas de formularios pendientes</span>
                          <input type="checkbox" className="form-switch" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>Recordatorios de mensualidades</span>
                          <input type="checkbox" className="form-switch" />
                        </label>
                      </div>
                    </div>
                  )}

                  {activeTab === "seguridad" && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
                      <h2 className="text-lg font-semibold mb-4">Seguridad</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-600 mb-1">Contraseña actual</label>
                          <input type="password" className="w-full border rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
                          <input type="password" className="w-full border rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Confirmar nueva contraseña</label>
                          <input type="password" className="w-full border rounded-lg px-3 py-2" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Actualizar contraseña</button>
                      </div>
                    </div>
                  )}
                </div>

                <aside className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Consejos de seguridad</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Usa contraseñas fuertes y únicas.</li>
                      <li>Activa la verificación en dos pasos si está disponible.</li>
                      <li>Revisa periódicamente tus dispositivos activos.</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      ¿Necesitas ayuda? Contacta al equipo de soporte para asistencia personalizada.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Configuracion;