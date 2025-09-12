import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Programs = () => {
  return (
    <>
      <Breadcrumbs title="Programas" />
      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestros Programas Especializados
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos programas integrales de rehabilitación que combinan enfoques 
            científicos validados con guía espiritual para la transformación completa de vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-center mb-4">
              <i className="fas fa-hospital text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800">Programa de Internado</h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• Desintoxicación médica supervisada</li>
              <li>• Terapia intensiva individual y grupal</li>
              <li>• Duración: 12 - 15 meses según caso</li>
              <li>• Acompañamiento 24/7</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-center mb-4">
              <i className="fas fa-users text-4xl text-green-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800">Programa Familiar</h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• Escuela para familias (psicoeducación)</li>
              <li>• Terapia familiar sistémica</li>
              <li>• Grupos de apoyo mutuo</li>
              <li>• Reconciliación y restauración de vínculos</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="text-center mb-4">
              <i className="fas fa-tools text-4xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800">Programa de Reinserción</h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• Formación Técnica con SENA</li>
              <li>• Habilidades Blandas</li>
              <li>• Talleres de comunicación</li>
              <li>• Manejo emocional</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Enfoques Terapéuticos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                <i className="fas fa-microscope mr-2"></i>
                Científico
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Terapia Cognitivo-Conductual</li>
                <li>• Logoterapia (Viktor Frankl)</li>
                <li>• Terapia Familiar</li>
                <li>• Manejo de Contingencias</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                <i className="fas fa-pray mr-2"></i>
                Espiritual
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Guía Espiritual con Palabra de Dios</li>
                <li>• Acompañamiento Pastoral</li>
                <li>• Discipulado Cristiano</li>
                <li>• Crecimiento en la fe</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Nuestras Sedes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                Bello (Antioquia)
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Sede Masculina:</strong> Juan Camilo Machado Bernal (Psicólogo)</p>
                <p><strong>Teléfono:</strong> 3145702708</p>
                <p><strong>Sede Femenina:</strong> Mildrey Leonel Melo (Psicóloga)</p>
                <p><strong>Teléfono:</strong> 3216481687</p>
                <p><strong>Dirección:</strong> Vereda Potreritos, Finca el Alto</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                Apartadó
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Sede Masculina:</strong> Martín Muñoz Pino (Terapeuta)</p>
                <p><strong>Sede Femenina:</strong> Luz Yasmin Estrada Fabra (Psicóloga)</p>
                <p><strong>Teléfono:</strong> 3104577835</p>
                <p><strong>Dirección:</strong> Calle 102BB #76-34, Barrio 20 de Enero</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
