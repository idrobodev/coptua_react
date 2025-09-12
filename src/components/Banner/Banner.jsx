import React from "react";
import { Link } from "react-router-dom";
import banner from "../../images/banner.png";

const Banner = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen py-36 bg-fixed"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="container">
        <h1 className="text-6xl capitalize text-gray-800 font-medium mb-4">
          Transformando vidas desde el amor y la evidencia científica.
        </h1>
        <p className="w-2/5">
          Centro de desintoxicación que combina enfoques psicológicos validados con guía espiritual 
          basada en la Palabra de Dios para el tratamiento integral de adicciones.
        </p>
        <div className="mt-12">
          <Link
            to="/contact"
            className="bg-primary border border-primary text-white px-3 py-2 font-medium rounded hover:bg-transparent hover:text-primary transition"
          >
            CONTÁCTANOS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
