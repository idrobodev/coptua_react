import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import SEO from "../../components/SEO/SEO";
import mission from "../../images/booking.jpg";
import story from "../../images/banner.png";
import belloImage from "../../images/review/1.jpg";
import apartadoImage from "../../images/review/2.jpg";
import GradientText from "../../components/UI/GradientText";

// Icons for locations
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState({
    sedes: false,
    galeria: false,
    // Add other sections as needed
  });
  
  // Locations data
  const locations = [
    {
      city: "Bello (Antioquia)",
      icon: "🏔️",
      address: "Carrera 50 # 52 - 21, Bello, Antioquia",
      color: "from-blue-600 to-blue-400",
      facilities: [
        {
          type: "Centro de Rehabilitación",
          title: "Sede Principal",
          phone: "+57 310 457 7835",
          director: "Dr. Juan Pérez - Director Médico"
        },
        {
          type: "Atención Psicológica",
          title: "Consultorios Especializados",
          phone: "+57 310 457 7836",
          director: "Dra. María Gómez - Psicóloga Clínica"
        }
      ]
    },
    {
      city: "Apartadó (Urabá)",
      icon: "🌴",
      address: "Calle 10 # 15 - 30, Apartadó, Antioquia",
      color: "from-green-600 to-green-400",
      facilities: [
        {
          type: "Centro de Rehabilitación",
          title: "Sede Urabá",
          phone: "+57 310 457 7837",
          director: "Dr. Carlos Rojas - Director Sede"
        },
        {
          type: "Atención Comunitaria",
          title: "Programas Preventivos",
          phone: "+57 310 457 7838",
          director: "Lic. Ana Torres - Coordinadora Comunitaria"
        }
      ]
    }
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      AOS.refresh();
    };
  }, []);

  const teamMembers = [
    {
      name: "Dr. Juan Camilo Machado",
      role: "Director Psicológico - Sede Masculina Bello",
      specialty: "Especialista en Adicciones y Terapia Cognitivo-Conductual",
      email: "juan.machado@todoporunalma.org",
    },
    {
      name: "Dra. Mildrey Leonel Melo",
      role: "Directora Psicológica - Sede Femenina Bello",
      specialty: "Especialista en Terapia Familiar y Logoterapia",
      email: "mildrey.melo@todoporunalma.org",
    },
    {
      name: "Martín Muñoz Pino",
      role: "Terapeuta Principal - Sede Masculina Apartadó",
      specialty: "Especialista en Reinserción Social",
      email: "martin.munoz@todoporunalma.org",
    },
    {
      name: "Dra. Luz Yasmin Estrada",
      role: "Psicóloga - Sede Femenina Apartadó",
      specialty: "Especialista en Trauma y Recuperación",
      email: "luz.estrada@todoporunalma.org",
    },
  ];

  const values = [
    {
      icon: "❤️",
      title: "Compasión",
      description:
        "Tratamos a cada persona con amor incondicional y comprensión profunda de su dolor.",
    },
    {
      icon: "🙏",
      title: "Fe",
      description:
        "Creemos en el poder transformador de Dios y en la capacidad de restauración de cada alma.",
    },
    {
      icon: "🤝",
      title: "Integridad",
      description:
        "Actuamos con honestidad, transparencia y coherencia en todos nuestros procesos.",
    },
    {
      icon: "🌟",
      title: "Esperanza",
      description:
        "Mantenemos viva la esperanza de transformación y nueva vida para cada persona.",
    },
    {
      icon: "👥",
      title: "Comunidad",
      description:
        "Creamos un ambiente de apoyo mutuo donde cada persona se siente valorada y acompañada.",
    },
    {
      icon: "📚",
      title: "Excelencia",
      description:
        "Nos comprometemos con la calidad y mejora continua en todos nuestros servicios.",
    },
  ];

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Corporación Todo por un Alma",
      description:
        "Centro especializado en tratamiento de adicciones que combina terapia psicológica profesional con guía espiritual basada en la Palabra de Dios.",
      foundingDate: "2020",
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "Bello",
          addressRegion: "Antioquia",
          addressCountry: "Colombia",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Apartadó",
          addressRegion: "Antioquia",
          addressCountry: "Colombia",
        },
      ],
      employee: [
        {
          "@type": "Person",
          name: "Dr. Juan Camilo Machado",
          jobTitle: "Director Psicológico - Sede Masculina Bello",
          telephone: "3145702708",
        },
        {
          "@type": "Person",
          name: "Dra. Mildrey Leonel Melo",
          jobTitle: "Directora Psicológica - Sede Femenina Bello",
          telephone: "3216481687",
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Sobre Nosotros - Todo por un Alma | Centro de Rehabilitación"
        description="Conoce la historia, valores y equipo profesional de Todo por un Alma. Centro especializado en tratamiento de adicciones con enfoque cristiano en Bello y Apartadó, Colombia."
        keywords="sobre nosotros, historia, equipo profesional, valores cristianos, centro rehabilitación, Bello, Apartadó, psicólogos, terapeutas, adicciones"
        url="/about"
        type="website"
        structuredData={aboutStructuredData}
      />
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
            <h1 className="text-5xl font-bold mb-6">
              <GradientText>Corporación Todo por un Alma</GradientText>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Somos un centro de desintoxicación que combina enfoques
              psicológicos validados con guía espiritual basada en la Palabra de
              Dios para el tratamiento integral de adicciones.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Terapia Cognitivo-Conductual",
                "Logoterapia y Guía Espiritual",
                "Programas de Reinserción Social",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center group cursor-pointer"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Nuestras Sedes con Galería */}
      <section
        id="sedes"
        data-animate
        className={`py-20 bg-gradient-to-br from-gray-50 to-primary/8 transition-all duration-1000 ${
          isVisible.sedes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>Nuestras Sedes</GradientText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce nuestras sedes en Bello y Apartadó, diseñadas para brindar el mejor ambiente para la recuperación
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sede Bello */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl border border-gray-100 bg-white">
              <img
                src={belloImage}
                alt="Sede de Bello"
                className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="p-6">
                <div className="flex items-center mb-2 text-gray-800">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  <span className="text-sm font-medium">Bello, Antioquia</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sede Bello</h3>
                <p className="text-gray-600 mb-4">Carrera 50 # 52 - 21</p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaPhone className="mr-2 text-primary" />
                    <span>+57 310 457 7835</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Dr. Juan Pérez - Director Médico
                  </p>
                </div>
              </div>
            </div>

            {/* Sede Apartadó */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl border border-gray-100 bg-white">
              <img
                src={apartadoImage}
                alt="Sede de Apartadó"
                className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="p-6">
                <div className="flex items-center mb-2 text-gray-800">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  <span className="text-sm font-medium">Apartadó, Antioquia</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sede Apartadó</h3>
                <p className="text-gray-600 mb-4">Calle 10 # 15 - 30</p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaPhone className="mr-2 text-primary" />
                    <span>+57 310 457 7837</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Dr. Carlos Rojas - Director Sede
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo Section */}
      <section
        id="equipo"
        data-animate
        className={`py-20 bg-gradient-to-br from-white via-gray-50 to-primary/5 transition-all duration-1000 ${
          isVisible.equipo
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              <GradientText>Nuestro Equipo Profesional</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesionales altamente capacitados comprometidos con tu
              recuperación
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-[#434194]/20 rounded-full flex items-center justify-center group-hover:from-primary group-hover:to-[#434194] transition-all duration-500">
                    <svg
                      className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-gray-600 mt-1">{member.specialty}</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <svg
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors text-sm">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section
        id="historia"
        data-animate
        className={`py-20 bg-gradient-to-br from-white via-gray-50 to-primary/5 transition-all duration-1000 ${
          isVisible.historia
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container">
          <div className="text-center mb-12 overflow-hidden">
            <div
              className="inline-block overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <h2
                className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 hover:scale-105 transition-transform duration-500 inline-block"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <GradientText>Nuestra Historia</GradientText>
              </h2>
            </div>
            <div
              className="overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <p
                className="text-gray-700 text-lg mb-4 max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                Cada paso de nuestro viaje está marcado por la fe y la
                transformación de vidas
              </p>
            </div>
            <div
              className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
            ></div>
          </div>

          <div className="lg:flex items-center gap-16">
            <div
              className="lg:w-2/5 mb-8 lg:mb-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div
                className="relative group"
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#434194]/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:rotate-1"></div>
                <img
                  src={mission}
                  alt="Nuestra Historia"
                  className="relative w-full max-w-md mx-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="300"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 hover:border-primary/30 transform hover:-translate-y-1"
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-delay="300"
                >
                  <h3 className="text-2xl font-bold text-[#434194] mb-4">
                    Nuestros Inicios
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Fundada con la visión de transformar vidas a través del amor
                    de Cristo, nuestra corporación nació del deseo de ofrecer
                    esperanza a quienes luchan contra las adicciones.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#434194]/10">
                  <h3 className="text-2xl font-bold text-[#434194] mb-4">
                    Nuestro Crecimiento
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A lo largo de los años, hemos expandido nuestros servicios a
                    múltiples sedes, manteniendo siempre nuestro compromiso con
                    la excelencia y el amor incondicional.
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
          isVisible.valores
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              <GradientText>Nuestros Valores</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada una de nuestras acciones y
              decisiones
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
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
    </>
  );
};

export default About;
