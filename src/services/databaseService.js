import { apiService, ROLES } from './apiService';

// Re-exportar roles para compatibilidad
export { ROLES };

class DatabaseService {
  // Obtener usuario actual con rol
  async getCurrentUser() {
    return await apiService.getCurrentUser();
  }

  // Verificar permisos del usuario
  async hasPermission(requiredRole) {
    return await apiService.hasPermission(requiredRole);
  }

  // Obtener datos del dashboard
  async getDashboardData() {
    return await apiService.getDashboardData();
  }

  // Obtener participantes
  async getParticipantes() {
    return await apiService.getParticipantes();
  }

  // Obtener mensualidades/pagos
  async getMensualidades() {
    return await apiService.getMensualidades();
  }


  // Crear nuevo participante
  async createParticipante(participanteData) {
    return await apiService.createParticipante(participanteData);
  }

  // Actualizar participante
  async updateParticipante(id, participanteData) {
    return await apiService.updateParticipante(id, participanteData);
  }

  // Eliminar participante
  async deleteParticipante(id) {
    return await apiService.deleteParticipante(id);
  }

  // Obtener sedes
  async getSedes() {
    return await apiService.getSedes();
  }

  // Crear nueva mensualidad
  async createMensualidad(mensualidadData) {
    return await apiService.createMensualidad(mensualidadData);
  }

  // Actualizar mensualidad
  async updateMensualidad(id, mensualidadData) {
    return await apiService.updateMensualidad(id, mensualidadData);
  }

  // Verificar conexión con la API
  async testConnection() {
    return await apiService.testConnection();
  }

  // Obtener configuración de la API
  getApiConfig() {
    return apiService.getApiConfig();
  }
}

// Exportar instancia única del servicio
export const dbService = new DatabaseService();
export default dbService;
