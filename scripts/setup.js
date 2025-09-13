const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Configurando el proyecto...');

// Verificar si el archivo .env existe, si no, copiar de .env.example
const envPath = path.join(__dirname, '../.env');
const envExamplePath = path.join(__dirname, '../.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📄 Creando archivo .env a partir de .env.example');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Archivo .env creado exitosamente');
}

// Instalar dependencias si no están instaladas
if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit' });
}

console.log('✨ Configuración completada. Ejecuta "npm start" para iniciar el servidor de desarrollo.');
