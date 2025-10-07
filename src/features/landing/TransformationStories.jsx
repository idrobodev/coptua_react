import React, { useState, useEffect } from 'react';

// Import images
import carruselUno from 'assets/images/carrusel_home/carrusel_uno.jpeg';
import carruselDos from 'assets/images/carrusel_home/carrusel_dos.jpeg';
import carruselTres from 'assets/images/carrusel_home/carrusel_tres.jpeg';
import carruselCuatro from 'assets/images/carrusel_home/carrusel_cuatro.jpeg';
import carruselCinco from 'assets/images/carrusel_home/carrusel_cinco.jpeg';
import carruselSeis from 'assets/images/carrusel_home/carrusel_seis.jpeg';
import carruselSiete from 'assets/images/carrusel_home/carrusel_siete.jpeg';
import carruselOcho from 'assets/images/carrusel_home/carrusel_ocho.JPG';

const TransformationStories = () => {
  // Estado de carrusel y visibilidad
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  const stories = [
    {
      id: 1,
      image: carruselUno,
      title: 'Renovación de Esperanza',
      description: 'Nueva oportunidad diaria para transformar vidas.',
      highlight: 'Esperanza',
    },
    {
      id: 2,
      image: carruselDos,
      title: 'Camino hacia la Sanidad',
      description: 'Acompañamiento único y personalizado en la recuperación.',
      highlight: 'Sanidad',
    },
    {
      id: 3,
      image: carruselTres,
      title: 'Fortaleza Interior',
      description: 'Desarrollamos fortaleza para superar adversidades.',
      highlight: 'Fortaleza',
    },
    {
      id: 4,
      image: carruselCuatro,
      title: 'Comunidad de Apoyo',
      description: 'Comunidad donde todos se sienten valorados.',
      highlight: 'Comunidad',
    },
    {
      id: 5,
      image: carruselCinco,
      title: 'Nueva Vida',
      description: 'Celebramos cada logro hacia una nueva vida.',
      highlight: 'Vida Nueva',
    },
    {
      id: 6,
      image: carruselSeis,
      title: 'Transformación Completa',
      description: 'Del sufrimiento a la libertad total.',
      highlight: 'Transformación',
    },
    {
      id: 7,
      image: carruselSiete,
      title: 'Apoyo Familiar',
      description: 'Apoyo integral para individuos y familias.',
      highlight: 'Familia',
    },
    {
      id: 8,
      image: carruselOcho,
      title: 'Esperanza Renovada',
      description: 'La fe renueva la esperanza en cualquier situación.',
      highlight: 'Fe',
    },
  ];

  // Cálculo responsivo de ítems visibles (alineado con breakpoints Tailwind)
  useEffect(() => {
    const computeItems = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      if (w >= 1024) return 4; // lg
      if (w >= 768) return 3; // md
      if (w >= 640) return 2; // sm
      return 1; // xs
    };

    const update = () => {
      const next = computeItems();
      setItemsPerView(prev => {
        if (prev !== next) {
          // Asegurar que el índice actual no quede fuera de rango al cambiar el layout
          setCurrentSlide((prevSlide) => {
            const maxIndex = Math.max(0, stories.length - next);
            return Math.min(prevSlide, maxIndex);
          });
        }
        return next;
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [stories.length]);

  // Auto-advance por intervalo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxIndex = Math.max(0, stories.length - itemsPerView);
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [stories.length, itemsPerView]);

  // Intersection Observer para animación de entrada
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
    setCurrentSlide((prev) => {
      const maxIndex = Math.max(0, stories.length - itemsPerView);
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxIndex = Math.max(0, stories.length - itemsPerView);
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  };

  const pageCount = Math.max(1, Math.ceil(stories.length / itemsPerView));
  const activePage = Math.floor(currentSlide / itemsPerView);

  const goToPage = (pageIdx) => {
    const target = pageIdx * itemsPerView;
    setCurrentSlide(Math.min(target, Math.max(0, stories.length - itemsPerView)));
  };

  // Helper: padding-top en % según relación de aspecto deseada
  // Todas las imágenes usan formato 4:5
  const aspectRatio = '4:5';
  const ratioToPadding = (ratio) => {
    const [w, h] = ratio.split(':').map(Number);
    if (!w || !h) return '125%'; // fallback 4:5
    return `${(h / w) * 100}%`;
  };

  // Transform del track basado en el slide actual
  const trackTranslatePercent = currentSlide * (100 / itemsPerView);

  return (
    <section
      id="transformation-stories"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* Carrusel (4 visibles en desktop) */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative rounded-3xl overflow-visible">
            {/* Viewport */}
            <div className="overflow-hidden">
              {/* Track */}
              <div
                className="flex -mx-2 transition-transform duration-700 ease-out will-change-transform"
                style={{ transform: `translateX(-${trackTranslatePercent}%)` }}
              >
                {stories.map((story, index) => {
                  return (
                    <div
                      key={story.id}
                      className="flex-none px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                      aria-hidden={false}
                    >
                      <div className="group relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm ring-1 ring-black/5 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                        {/* Aspect Ratio Wrapper */}
                        <div
                          className="relative w-full"
                          style={{ paddingTop: ratioToPadding(aspectRatio) }}
                        >
                          <img
                            src={story.image}
                            alt={`Historia de transformación: ${story.title}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Overlay para legibilidad */}
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/50 pointer-events-none"></div>

                          {/* Etiqueta highlight */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white shadow-md">
                              {story.highlight}
                            </span>
                          </div>

                          {/* Overlay de texto al hover */}
                          <div className="absolute inset-0 flex items-end p-3">
                            <div className="text-white drop-shadow-sm">
                              <h3 className="text-base md:text-lg font-bold leading-tight">
                                {story.title}
                              </h3>
                              <p className="mt-1 text-xs md:text-sm text-white/90 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                {story.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={prevSlide}
              aria-label="Ver historias anteriores de transformación"
              className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 p-2.5 rounded-full shadow-lg ring-1 ring-black/5 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              aria-label="Ver siguientes historias de transformación"
              className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 p-2.5 rounded-full shadow-lg ring-1 ring-black/5 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores por página */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  aria-label={`Ir a la página ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activePage
                      ? 'w-6 bg-primary'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TransformationStories;
