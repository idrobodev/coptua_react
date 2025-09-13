import React, { useState, useEffect } from 'react';
import GradientText from '../UI/GradientText';

// Import images
import happyImg from '../../images/happyCl.jpg';
import bookingImg from '../../images/booking.jpg';
import review1 from '../../images/review/1.jpg';
import review2 from '../../images/review/2.jpg';
import review3 from '../../images/review/3.jpg';

const TransformationStories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stories = [
    {
      id: 1,
      image: happyImg,
      title: "Renovación de Esperanza",
      description: "Cada día es una nueva oportunidad para transformar vidas y renovar la esperanza en quienes más lo necesitan.",
      highlight: "Esperanza"
    },
    {
      id: 2,
      image: bookingImg,
      title: "Camino hacia la Sanidad",
      description: "Acompañamos a cada persona en su proceso único de recuperación, brindando apoyo integral y personalizado.",
      highlight: "Sanidad"
    },
    {
      id: 3,
      image: review1,
      title: "Fortaleza Interior",
      description: "Desarrollamos la fortaleza interior necesaria para superar cualquier adversidad y construir un futuro sólido.",
      highlight: "Fortaleza"
    },
    {
      id: 4,
      image: review2,
      title: "Comunidad de Apoyo",
      description: "Creamos una comunidad donde cada persona se siente valorada, comprendida y apoyada en su proceso.",
      highlight: "Comunidad"
    },
    {
      id: 5,
      image: review3,
      title: "Nueva Vida",
      description: "Celebramos cada logro, cada paso adelante, cada momento de crecimiento en el camino hacia una nueva vida.",
      highlight: "Vida Nueva"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stories.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('transformation-stories');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      id="transformation-stories" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            HISTORIAS DE TRANSFORMACIÓN
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText>Vidas que Inspiran</GradientText>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada historia es única, cada transformación es un milagro. 
            Descubre cómo acompañamos a las personas en su camino hacia una nueva vida.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-8"></div>
        </div>

        {/* Carousel Container */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Images */}
            <div className="relative w-full h-full">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-110'
                  }`}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
                    <div className="max-w-2xl text-white">
                      <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm font-semibold text-white">
                          {story.highlight}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                        {story.title}
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
            >
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
            >
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-[#434194]/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#434194]/20 to-primary/20 rounded-full blur-xl"></div>
        </div>

      </div>
    </section>
  );
};

export default TransformationStories;
