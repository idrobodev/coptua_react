import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useDropzone } from 'react-dropzone';
import { storageService } from '../../services/storageService';
import { dbService, ROLES } from '../../services/databaseService';
import { Link } from 'react-router-dom';

const Formatos = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingFolder, setRenamingFolder] = useState(null); // {folderName, newName}

  const navigateToPath = (targetPath) => {
    loadFiles(targetPath);
  };

  // Simple notification helper
  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  }, []);

  // Check admin permission on mount
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const admin = await dbService.hasPermission(ROLES.ADMINISTRADOR);
        setIsAdmin(admin);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  // Load files and folders
  const loadFiles = useCallback(async (path = '') => {
    setLoading(true);
    try {
      const { files: loadedFiles, folders: loadedFolders } = await storageService.listFiles(path);
      setFiles(loadedFiles);
      setFolders(loadedFolders);
      setCurrentPath(path);
    } catch (error) {
      addNotification(`Error loading files: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Navigate to folder
  const navigateToFolder = (folderName) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    loadFiles(newPath);
  };


  // Navigate to specific path prefix for breadcrumb
  const handleBreadcrumbClick = (pathPrefix) => {
    navigateToPath(pathPrefix);
  };

  // Create folder
  const handleCreateFolder = async () => {
    if (!isAdmin || !newFolderName.trim()) return;
    try {
      await storageService.createFolder(newFolderName.trim(), currentPath);
      addNotification('Folder created successfully', 'success');
      setNewFolderName('');
      loadFiles(currentPath);
    } catch (error) {
      addNotification(`Error creating folder: ${error.message}`, 'error');
    }
  };

  // Handle rename for specific folder
  const handleRenameFolder = async (oldName) => {
    if (!isAdmin || !renamingFolder || !renamingFolder.newName.trim()) return;
    try {
      await storageService.renameFolder(oldName, renamingFolder.newName.trim(), currentPath);
      addNotification('Folder renamed successfully', 'success');
      setRenamingFolder(null);
      loadFiles(currentPath);
    } catch (error) {
      addNotification(`Error renaming folder: ${error.message}`, 'error');
      setRenamingFolder(null);
    }
  };

  const startRename = (folder) => {
    setRenamingFolder({ folderName: folder, newName: folder });
  };

  const cancelRename = () => {
    setRenamingFolder(null);
  };

  const updateRenameName = (newName) => {
    setRenamingFolder(prev => ({ ...prev, newName }));
  };

  // Delete folder
  const handleDeleteFolder = async (folderName) => {
    if (!isAdmin || !window.confirm(`Delete folder '${folderName}' and all contents?`)) return;
    try {
      await storageService.deleteFolder(currentPath ? `${currentPath}/${folderName}` : folderName);
      addNotification('Folder deleted successfully', 'success');
      loadFiles(currentPath);
    } catch (error) {
      addNotification(`Error deleting folder: ${error.message}`, 'error');
    }
  };

  // Delete file
  const handleDeleteFile = async (fileName) => {
    if (!isAdmin || !window.confirm(`Delete file '${fileName}'?`)) return;
    try {
      const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;
      await storageService.deleteFile(fullPath);
      addNotification('File deleted successfully', 'success');
      loadFiles(currentPath);
    } catch (error) {
      addNotification(`Error deleting file: ${error.message}`, 'error');
    }
  };

  // Download file
  const handleDownload = async (fileName) => {
    try {
      const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;
      const url = await storageService.getDownloadUrl(fullPath);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    } catch (error) {
      addNotification(`Error downloading file: ${error.message}`, 'error');
    }
  };

  // Upload files
  const onDrop = async (acceptedFiles) => {
    if (!isAdmin) {
      addNotification('Permission denied: Admin access required for uploads', 'error');
      return;
    }

    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        await storageService.upload(file, currentPath);
      }
      addNotification(`${acceptedFiles.length} files uploaded successfully`, 'success');
      loadFiles(currentPath);
    } catch (error) {
      addNotification(`Upload error: ${error.message}`, 'error');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { '*/*': [] }, // All types
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
    disabled: !isAdmin || uploading,
  });

  if (loading) {
    return (
      <DashboardLayout
        title="Formatos"
        subtitle="Cargando archivos..."
        loading={true}
        loadingText="Cargando formatos y carpetas..."
      >
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Formatos"
        subtitle="Error al cargar datos"
        loading={false}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error loading formats: {error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin && loading === false) {
    return (
      <DashboardLayout
        title="Formatos"
        subtitle="Acceso Restringido"
        loading={false}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <i className="fas fa-lock text-yellow-500 text-3xl mb-4"></i>
            <h3 className="text-lg font-bold text-yellow-800 mb-2">Acceso Restringido</h3>
            <p className="text-yellow-700">Solo administradores pueden gestionar archivos.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Formatos"
      subtitle="Gestión de Archivos y Carpetas"
    >
      
      {/* Simple Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`p-4 rounded-lg shadow-lg text-white animate-slide-in-right ${
              type === 'success' ? 'bg-green-500' :
              type === 'error' ? 'bg-red-500' :
              type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
          >
            {message}
          </div>
        ))}
      </div>

      <div className="px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span>/</span>
            <span className="flex items-center space-x-1">
              {currentPath.split('/').map((part, i) => {
                const pathPrefix = currentPath.split('/').slice(0, i + 1).join('/');
                return (
                  <span key={i} className="flex items-center">
                    <button
                      onClick={() => handleBreadcrumbClick(pathPrefix)}
                      className="hover:text-blue-600 font-medium"
                    >
                      {part}
                    </button>
                    {i < currentPath.split('/').length - 1 && <span>/</span>}
                  </span>
                );
              })}
              {!currentPath && <span className="font-medium">Raíz</span>}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Folders Section */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Carpetas</h3>
            
            {/* Create Folder */}
            {isAdmin && (
              <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Nombre de nueva carpeta"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                />
                <button
                  onClick={handleCreateFolder}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Crear Carpeta
                </button>
              </div>
            )}

            {/* Folders List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {folders.map((folder) => (
                <div key={folder} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => navigateToFolder(folder)}
                    className="flex-1 text-left hover:bg-gray-100 p-2 rounded"
                  >
                    <i className="fas fa-folder mr-2 text-yellow-500"></i>
                    {renamingFolder?.folderName === folder ? (
                      <input
                        type="text"
                        value={renamingFolder.newName}
                        onChange={(e) => updateRenameName(e.target.value)}
                        onBlur={() => {
                          if (renamingFolder.newName.trim()) {
                            handleRenameFolder(folder);
                          } else {
                            cancelRename();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRenameFolder(folder);
                          } else if (e.key === 'Escape') {
                            cancelRename();
                          }
                        }}
                        autoFocus
                        className="bg-transparent border-b border-blue-500 px-1"
                      />
                    ) : (
                      folder
                    )}
                  </button>
                  {isAdmin && (
                    <div className="flex space-x-1">
                      {renamingFolder?.folderName === folder ? (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleRenameFolder(folder)}
                            className="text-green-600 hover:text-green-800"
                            title="Guardar"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            onClick={cancelRename}
                            className="text-gray-600 hover:text-gray-800"
                            title="Cancelar"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => startRename(folder)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Renombrar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteFolder(folder)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {folders.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hay carpetas</p>
              )}
            </div>
          </div>

          {/* Files Section */}
          <div className="lg:col-span-2">
            {/* Upload Zone */}
            {isAdmin && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 mb-6 text-center transition-colors ${
                  isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <LoadingSpinner size="md" text="Subiendo..." />
                ) : (
                  <>
                    <i className={`fas fa-cloud-upload-alt text-4xl ${isDragActive ? 'text-blue-500' : 'text-gray-400'} mb-4`}></i>
                    <p className="text-lg font-medium mb-2">
                      {isDragActive ? 'Suelta los archivos aquí...' : 'Arrastra archivos aquí o haz clic para seleccionar'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Soporta todos los tipos de archivos (máx. 10MB cada uno)</p>
                    <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Seleccionar Archivos
                    </button>
                  </>
                )}
              </div>
            )}
            {!isAdmin && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6 text-center">
                <i className="fas fa-lock text-yellow-500 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Acceso Restringido</h3>
                <p className="text-yellow-700">Solo administradores pueden subir y eliminar archivos.</p>
              </div>
            )}

            {/* Files List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Archivos ({files.length})</h3>
              </div>
              {loading ? (
                <div className="p-6">
                  <LoadingSpinner size="md" />
                </div>
              ) : files.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <i className="fas fa-folder-open text-4xl mb-4"></i>
                  <p>{currentPath ? 'No hay archivos en esta carpeta' : 'Directorio raíz vacío'}</p>
                  {isAdmin && <p className="text-sm">{currentPath ? 'Sube archivos o crea carpetas para organizar.' : 'Comienza creando carpetas o subiendo archivos.'}</p>}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {files.map((file) => (
                        <tr key={file.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <i className="fas fa-file mr-2 text-gray-400"></i>
                              <span className="font-medium text-gray-900">{file.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(file.metadata?.size || 0) / 1024} KB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDownload(file.name)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              <i className="fas fa-download"></i>
                            </button>
                            {isAdmin && (
                              <button
                                onClick={() => handleDeleteFile(file.name)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Formatos;