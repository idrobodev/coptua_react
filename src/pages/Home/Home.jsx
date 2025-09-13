import React from "react";
import Banner from "../../components/Banner/Banner";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Feature from "../../components/Feature/Feature";
import HappyCustomers from "./../../components/HappyCustomers/HappyCustomers";
import TransformationStories from "../../components/TransformationStories/TransformationStories";
import SEO from "../../components/SEO/SEO";

const Home = () => {
  return (
    <>
      <SEO 
        title="Todo por un Alma - Centro de Rehabilitación y Desintoxicación en Colombia"
        description="Centro especializado en tratamiento de adicciones que combina terapia psicológica profesional con guía espiritual basada en la Palabra de Dios. Transformamos vidas en Bello y Apartadó, Colombia."
        keywords="rehabilitación, desintoxicación, adicciones, centro de rehabilitación, terapia cognitivo conductual, logoterapia, Bello, Apartadó, Colombia, tratamiento adicciones, recuperación, transformación de vidas, centro cristiano"
        url="/"
        type="website"
      />
      <div>
        <Banner />
        <Feature />
        <TransformationStories />
        <HappyCustomers />
        <CustomerReviews />
      </div>
    </>
  );
};

export default Home;
