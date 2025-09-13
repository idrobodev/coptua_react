import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import mission from "../../images/booking.jpg";
import story from "../../images/banner.png";

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Dr. Juan Camilo Machado",
      role: "Director Psicológico - Sede Masculina Bello",
      specialty: "Especialista en Adicciones y Terapia Cognitivo-Conductual",
      phone: "3145702708"
    },
    {
      name: "Dra. Mildrey Leonel Melo",
      role: "Directora Psicológica - Sede Femenina Bello",
      specialty: "Especialista en Terapia Familiar y Logoterapia",
      phone: "3216481687"
    },
    {
      name: "Martín Muñoz Pino",
      role: "Terapeuta Principal - Sede Masculina Apartadó",
      specialty: "Especialista en Reinserción Social",
      phone: "3104577835"
    },
    {
      name: "Dra. Luz Yasmin Estrada",
      role: "Psicóloga - Sede Femenina Apartadó",
      specialty: "Especialista en Trauma y Recuperación",
      phone: "3104577835"
    }
  ];

  const values = [
    {
      icon: "❤️",
      title: "Compasión",
      description: "Tratamos a cada persona con amor incondicional y comprensión profunda de su dolor."
    },
    {
      icon: "🙏",
      title: "Fe",
      description: "Creemos en el poder transformador de Dios y en la capacidad de restauración de cada alma."
    },
    {
      icon: "🤝",
      title: "Integridad",
      description: "Actuamos con honestidad, transparencia y coherencia en todos nuestros procesos."
    },
    {
      icon: "🌟",
      title: "Esperanza",
      description: "Mantenemos viva la esperanza de transformación y nueva vida para cada persona."
    },
    {
      icon: "👥",
      title: "Comunidad",
      description: "Creamos un ambiente de apoyo mutuo donde cada persona se siente valorada y acompañada."
    },
    {
      icon: "📚",
      title: "Excelencia",
      description: "Nos comprometemos con la calidad y mejora continua en todos nuestros servicios."
    }
  ];

  return (
    <>
      <Breadcrumbs title="Sobre Nosotros" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-[#434194]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/5"></div>
        <div className="container relative z-10 lg:flex py-20 items-center">
          <div className="h-full lg:w-1/2 w-full mb-8 lg:mb-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[#434194]/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <img 
                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-700" 
                src={story} 
                alt="Corporación Todo por un Alma" 
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-[#434194] to-primary bg-clip-text text-transparent mb-6">
              Corporación Todo por un Alma
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Somos un centro de desintoxicación que combina enfoques psicológicos validados 
              con guía espiritual basada en la Palabra de Dios para el tratamiento integral de adicciones.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Terapia Cognitivo-Conductual",
                "Logoterapia y Guía Espiritual", 
                "Programas de Reinserción Social"
              ].map((item, index) => (
                <div key={index} className="flex items-center group cursor-pointer">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-[#434194] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nuestra Historia Section */}
      <section 
        id="historia" 
        data-animate
        className={`py-20 bg-gradient-to-br from-white via-gray-50 to-primary/5 transition-all duration-1000 ${
          isVisible.historia ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Nuestra Historia
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full"></div>
          </div>
          
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#434194]/20 to-primary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <img 
                  src={mission} 
                  alt="Nuestra Historia" 
                  className="relative w-full rounded-2xl shadow-xl transform group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Nuestros Inicios</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Fundada con la visión de transformar vidas a través del amor de Cristo, nuestra corporación 
                    nació del deseo de ofrecer esperanza a quienes luchan contra las adicciones.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#434194]/10">
                  <h3 className="text-2xl font-bold text-[#434194] mb-4">Nuestro Crecimiento</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A lo largo de los años, hemos expandido nuestros servicios a múltiples sedes, 
                    manteniendo siempre nuestro compromiso con la excelencia y el amor incondicional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores Section */}
      <section 
        id="valores" 
        data-animate
        className={`py-20 bg-gradient-to-br from-primary/5 to-[#434194]/8 transition-all duration-1000 ${
          isVisible.valores ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada una de nuestras acciones y decisiones
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
              >
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary transition-colors duration-300"></div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo Section */}
      <section 
        id="equipo" 
        data-animate
        className={`py-20 bg-gradient-to-br from-white via-gray-50 to-primary/5 transition-all duration-1000 ${
          isVisible.equipo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Nuestro Equipo Profesional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesionales altamente capacitados comprometidos con tu recuperación
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-[#434194]/20 rounded-full flex items-center justify-center group-hover:from-primary group-hover:to-[#434194] transition-all duration-500">
                    <svg className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{member.specialty}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {member.phone}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-[#434194] to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Comenzar tu Transformación?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Estamos aquí para acompañarte en cada paso de tu proceso de recuperación. 
            Tu nueva vida comienza hoy.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Contáctanos Ahora
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
