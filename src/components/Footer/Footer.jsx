import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div 
      className="relative py-16 text-white"
      style={{
        background: 'linear-gradient(to right, #21188e, #5b2076, #ea3238)'
      }}
    >
      
      <div className="container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 z-10">
        <div className="">
          <div className="flex items-center mb-4">
            <img 
              src={logo} 
              alt="Fundación Todo por un Alma" 
              className="h-16 w-16 object-contain mr-4"
            />
            <div>
              <span className="text-2xl font-Montserrat font-bold border-l-4 px-2 border-white">
                Fundación Todo por un Alma
              </span>
            </div>
          </div>
          <p className="text-justify py-4 font-Poppins">
            Centro de desintoxicación que combina enfoques psicológicos validados 
            con guía espiritual basada en la Palabra de Dios para el tratamiento 
            integral de adicciones. Transformando vidas desde el amor y la evidencia científica.
          </p>
          <div className="text-white text-2xl flex">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.facebook.com/"
            >
              <i className="fab fa-facebook-square ml-2 hover:text-blue-400 transition"></i>
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/"
            >
              <i className="fab fa-instagram-square ml-2 hover:text-pink-400 transition"></i>
            </a>
            <a rel="noreferrer" target="_blank" href="https://twitter.com/">
              <i className="fab fa-twitter-square ml-2 hover:text-blue-300 transition"></i>
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/"
            >
              <i className="fab fa-linkedin ml-2 hover:text-blue-500 transition"></i>
            </a>
          </div>
        </div>
        
        <div className="">
          <h1 className="text-2xl font-Montserrat font-bold uppercase border-white border-l-4 px-2">
            Enlaces Rápidos
          </h1>
          <ul className="py-4 font-Poppins">
            <li className="py-1 hover:text-blue-200 transition">
              <Link to="/">Inicio</Link>
            </li>
            <li className="py-1 hover:text-blue-200 transition">
              <Link to="/about">Nosotros</Link>
            </li>
            <li className="py-1 hover:text-blue-200 transition">
              <Link to="/programs">Programas</Link>
            </li>
            <li className="py-1 hover:text-blue-200 transition">
              <Link to="/contact">Contacto</Link>
            </li>
            <li className="py-1 hover:text-blue-200 transition">
              <Link to="/donate">Donaciones</Link>
            </li>
          </ul>
        </div>
        
        <div className="">
          <h1 className="text-2xl uppercase font-Montserrat font-bold border-white border-l-4 px-2">
            Información de Contacto
          </h1>

          <div className="py-4 font-Poppins">
            <p className="flex items-center">
              <i className="fas fa-phone-alt mr-3"></i> 
              <span>Teléfono Principal: 3104577835</span>
            </p>
            <p className="py-2 flex items-center">
              <i className="far fa-envelope mr-3"></i> 
              <span>info@todoporalma.org</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-map-marker-alt mr-3"></i> 
              <span>Antioquia (Bello y Apartadó)</span>
            </p>
            <p className="pt-4 text-sm">
              <i className="fas fa-users mr-2"></i>
              Atención para hombres y mujeres por separado
            </p>
          </div>
        </div>

        <div className="">
          <h1 className="text-2xl font-Montserrat font-bold border-l-4 px-2 border-white">
            Cómo Ayudar
          </h1>
          <p className="py-4 font-Poppins">
            Su apoyo hace posible nuestra labor de transformar vidas. 
            Únase a nuestra misión.
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <i className="fas fa-hand-holding-heart mr-2"></i>
              <span>Donaciones en especie y efectivo</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-hands-helping mr-2"></i>
              <span>Voluntariado profesional</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-handshake mr-2"></i>
              <span>Alianzas estratégicas</span>
            </div>
          </div>
          
          <div className="py-4 flex mt-4">
            <input
              type="email"
              className="border px-4 border-white border-r-0 bg-transparent placeholder-white placeholder-opacity-70 py-3 pr-3 rounded-l-md focus:outline-none text-white w-full font-Poppins"
              placeholder="Su correo electrónico"
            />
            <button className="bg-white text-[#21188e] px-4 rounded-r-md hover:bg-blue-50 transition font-Poppins font-medium">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Línea inferior de copyright */}
      <div className="border-t border-white border-opacity-30 mt-8 pt-6 text-center text-sm text-white text-opacity-80 relative z-10">
        <div className="container font-Poppins">
          <p>© {new Date().getFullYear()} Fundación Todo por un Alma. Todos los derechos reservados.</p>
          <p className="mt-2">Transformando vidas desde el amor y la evidencia científica</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;