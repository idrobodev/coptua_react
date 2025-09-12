import React from "react";
import Review from "./Review";

const reviews = [
  {
    key: "testimonial1",
    name: "María González",
    title: "Testimonio de Transformación",
    videoId: "kKsQRkOyKCI"
  },
  {
    key: "testimonial2",
    name: "Carlos Rodríguez",
    title: "Historia de Superación",
    videoId: "EsCm0WnK-CE"
  },
  {
    key: "testimonial3",
    name: "Ana Martínez",
    title: "Experiencia de Cambio",
    videoId: "AjohVQntKuY"
  }
];

const CustomerReviews = () => {
  return (
    <div className="container py-16 md:py-24 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <p className="text-primary font-semibold text-lg mb-2 tracking-wide">TESTIMONIOS</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Historias de Transformación
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Conoce las experiencias reales de quienes han encontrado esperanza y transformación 
          a través de nuestro acompañamiento. Sus historias son testimonio del poder del amor y la fe.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16 xl:gap-20 justify-items-center max-w-7xl mx-auto">
        {reviews.map((review) => (
          <div key={review.key} className="w-full max-w-md">
            <Review review={review} />
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-primary font-medium">Transformando vidas con amor y esperanza</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
