import { supabase } from '../supabase/supabaseClient';
import { dbService, ROLES } from './databaseService';

class StorageService {
  async isAdmin() {
    return await dbService.hasPermission(ROLES.ADMINISTRADOR);
  }

  async upload(file, path = '') {
    if (!(await this.isAdmin())) {
      throw new Error('Permission denied: Admin access required');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    const fullPath = path ? `${path}/${file.name}` : file.name;
    const { error } = await supabase.storage
      .from('documents')
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Obtener URL pública y registrar metadatos en tabla 'archivos'
    const { data: urlData } = await supabase.storage
      .from('documents')
      .getPublicUrl(fullPath);

    const publicUrl = urlData?.publicUrl || null;

    // Crear registro en tabla 'archivos' si existe
    try {
      await supabase.from('archivos').insert({
        nombre: file.name,
        ruta: fullPath,
        url: publicUrl,
        mime_type: file.type || null,
        tamaño: file.size || null,
        carpeta: path || null,
        created_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Tabla "archivos" no existe o inserción falló. Continúa sin registrar metadatos.', e?.message);
    }

    return { path: fullPath, publicUrl };
  }

  async deleteFile(fullPath) {
    if (!(await this.isAdmin())) {
      throw new Error('Permission denied: Admin access required');
    }

    const { error } = await supabase.storage
      .from('documents')
      .remove([fullPath]);

    if (error) throw error;

    // Eliminar metadatos en tabla 'archivos' si existe
    try {
      await supabase.from('archivos').delete().eq('ruta', fullPath);
    } catch (e) {
      console.warn('No se pudo eliminar metadatos de tabla "archivos" (puede no existir):', e?.message);
    }
  }

  async listFiles(path = '') {
    const { data, error } = await supabase.storage
      .from('documents')
      .list(path, { limit: 100, sortBy: { column: 'name', order: 'asc' } });

    if (error) throw error;

    // Filter files and folders (folders end with /)
    let files = data.filter(item => !item.name.endsWith('/'));
    const folders = data
      .filter(item => item.name.endsWith('/'))
      .map(item => item.name.slice(0, -1)); // Remove trailing /
  
    // Filter out placeholder files
    files = files.filter(item => item.name !== '_placeholder');

    return { files, folders };
  }

  async deleteFolder(path) {
    if (!(await this.isAdmin())) {
      throw new Error('Permission denied: Admin access required');
    }

    // Get all contents recursively
    const { data: items, error: listError } = await supabase.storage
      .from('documents')
      .list(path, { recursive: true });

    if (listError) throw listError;

    if (items.length === 0) return; // Empty folder

    // Build full paths to delete
    const pathsToDelete = items.map(item => `${path}/${item.name}`);

    const { error } = await supabase.storage
      .from('documents')
      .remove(pathsToDelete);

    if (error) throw error;
  }

  async createFolder(folderName, parentPath = '') {
    if (!(await this.isAdmin())) {
      throw new Error('Permission denied: Admin access required');
    }

    const fullPath = parentPath ? `${parentPath}/${folderName}` : folderName;
    // Create folder by uploading a hidden placeholder file
    const emptyBlob = new Blob([''], { type: 'application/json' });
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${fullPath}/_placeholder`, emptyBlob);

    if (error) throw error;
    return data;
  }

  async renameFolder(oldName, newName, parentPath = '') {
    if (!(await this.isAdmin())) {
      throw new Error('Permission denied: Admin access required');
    }

    const oldPath = parentPath ? `${parentPath}/${oldName}` : oldName;
    const newPath = parentPath ? `${parentPath}/${newName}` : newName;

    // List contents recursively
    const { data: items, error: listError } = await supabase.storage
      .from('documents')
      .list(oldPath, { recursive: true });

    if (listError) throw listError;

    // Move each item
    for (const item of items) {
      const oldFullPath = `${oldPath}/${item.name}`;
      const newFullPath = oldFullPath.replace(oldPath, newPath);

      const { error: moveError } = await supabase.storage
        .from('documents')
        .move(oldFullPath, newFullPath);

      if (moveError) {
        // Rollback on error (simplified; in production, use transactions)
        console.error('Rename failed for item:', item.name, moveError);
        throw moveError;
      }
    }

    // Delete placeholder if exists
    await this.deleteFile(`${oldPath}/_placeholder`).catch(() => {}); // Ignore if not exists
  }

  async getDownloadUrl(path) {
    const { data, error } = await supabase.storage
      .from('documents')
      .getPublicUrl(path);

    if (error) throw error;
    return data.publicUrl;
  }
}

export const storageService = new StorageService();
export default storageService;