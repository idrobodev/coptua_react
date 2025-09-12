import React from "react";
import { Link } from "react-router-dom";
import bannerVideo from "../../images/banner.webm";

const Banner = () => {
  return (
    <div className="relative h-screen py-36 overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bannerVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content Overlay */}
      <div className="relative z-10 container">
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
