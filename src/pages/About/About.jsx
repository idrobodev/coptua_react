import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import mission from "../../images/our-mission.jpg";
import story from "../../images/our-story.jpg";
const About = () => {
  return (
    <>
      <Breadcrumbs title="about us" />
      <div className="container lg:flex py-16">
        <div className="h-full lg:w-2/3 w-full">
          <img className="w-full" src={story} alt="" />
        </div>
        <div className="lg:ml-8">
          <h1 className="text-3xl font-Poppins font-semibold">
            Fundación Todo por un Alma
          </h1>
          <p className="py-8">
            Somos un centro de desintoxicación que combina enfoques psicológicos validados 
            (cognitivo-conductual y logoterapia) con guía espiritual basada en la Palabra de Dios 
            para el tratamiento integral de adicciones. Nuestro modelo biopsicosocial-espiritual 
            promueve la salud mental, sanación emocional, crecimiento espiritual y reinserción social 
            con programas de formación técnica.
          </p>
          <div className="grid grid-cols-2">
            <ul>
              <li className="flex">
                <i className="far fa-hand-point-right text-3xl text-green-500"></i>
                <h1 className="text-lg pb-8 px-4 uppercase font-bold leading-snug text-black hover:opacity-75">
                  Terapia Cognitivo-Conductual
                </h1>
              </li>
              <li className="flex">
                <i className="far fa-hand-point-right text-3xl text-green-500"></i>
                <h1 className="text-lg pb-8 px-4 uppercase font-bold leading-snug text-black hover:opacity-75">
                  Logoterapia y Guía Espiritual
                </h1>
              </li>
              <li className="flex">
                <i className="far fa-hand-point-right text-3xl text-green-500"></i>
                <h1 className="text-lg pb-8 px-4 uppercase font-bold leading-snug text-black hover:opacity-75">
                  Programas de Reinserción Social
                </h1>
              </li>
            </ul>
            <div>
              <img src={mission} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
