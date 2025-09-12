import React from "react";
import FeatureItem from "./FeatureItem";
const features = [
  {
    key: "HG42h",
    icon: "fas fa-heart",
    title: "Modelo Biopsicosocial-Espiritual",
    detail: "Combinamos enfoques psicológicos validados con guía espiritual basada en la Palabra de Dios.",
  },
  {
    key: "SSF4",
    icon: "fas fa-users",
    title: "Atención por Género",
    detail: "Espacios separados para hombres y mujeres con profesionales especializados en cada sede.",
  },
  {
    key: "GH54",
    icon: "fas fa-graduation-cap",
    title: "Reinserción Real",
    detail: "Programas productivos con formación técnica y salida laboral exitosa.",
  },
  {
    key: "RT88",
    icon: "fas fa-home",
    title: "Enfoque Familiar",
    detail: "Tratamiento integral que incluye al núcleo familiar en el proceso de recuperación.",
  },
];
const Feature = () => {
  return (
    <>
      <div className="container -my-32 mb-16 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature) => (
            <FeatureItem key={feature.key} feature={feature} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feature;
