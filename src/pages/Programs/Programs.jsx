import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import mission from "../../images/booking.jpg";
import story from "../../images/banner.png";
import happyCl from "../../images/happyCl.jpg";

const Programs = () => {
  const [activeTab, setActiveTab] = useState('internado');
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

  const programs = {
    internado: {
      title: "Programa de Internado",
      subtitle: "Transformación Integral 24/7",
      icon: "🏥",
      color: "from-blue-500 to-blue-700",
      image: mission,
      features: [
        "Desintoxicación médica supervisada por profesionales",
        "Terapia intensiva individual y grupal diaria",
        "Duración personalizada: 12 - 15 meses según necesidades",
        "Acompañamiento espiritual y psicológico 24/7",
        "Actividades recreativas y terapéuticas",
        "Seguimiento médico especializado"
      ],
      stats: { duration: "12-15 meses", success: "85%", capacity: "50 personas" }
    },
    familiar: {
      title: "Programa Familiar",
      subtitle: "Sanando Vínculos, Restaurando Esperanza",
      icon: "👨‍👩‍👧‍👦",
      color: "from-green-500 to-green-700",
      image: story,
      features: [
        "Escuela para familias con psicoeducación especializada",
        "Terapia familiar sistémica con enfoque restaurativo",
        "Grupos de apoyo mutuo para familiares",
        "Talleres de comunicación asertiva",
        "Reconciliación y restauración de vínculos afectivos",
        "Acompañamiento en el proceso de perdón"
      ],
      stats: { duration: "6 meses", success: "90%", capacity: "30 familias" }
    },
    reinsercion: {
      title: "Programa de Reinserción",
      subtitle: "Construyendo un Futuro Próspero",
      icon: "🎯",
      color: "from-purple-500 to-purple-700",
      image: happyCl,
      features: [
        "Formación técnica certificada con el SENA",
        "Desarrollo de habilidades blandas y liderazgo",
        "Talleres de comunicación efectiva",
        "Manejo emocional y inteligencia emocional",
        "Orientación laboral y emprendimiento",
        "Red de apoyo empresarial para empleabilidad"
      ],
      stats: { duration: "4 meses", success: "78%", capacity: "40 personas" }
    }
  };

  const therapeuticApproaches = [
    {
      category: "Científico",
      icon: "🔬",
      color: "from-blue-600 to-indigo-600",
      methods: [
        { name: "Terapia Cognitivo-Conductual", description: "Modificación de patrones de pensamiento y comportamiento" },
        { name: "Logoterapia (Viktor Frankl)", description: "Búsqueda de sentido y propósito de vida" },
        { name: "Terapia Familiar Sistémica", description: "Trabajo integral con el sistema familiar" },
        { name: "Manejo de Contingencias", description: "Reforzamiento de comportamientos positivos" }
      ]
    },
    {
      category: "Espiritual",
      icon: "🙏",
      color: "from-green-600 to-emerald-600",
      methods: [
        { name: "Guía Espiritual Bíblica", description: "Fundamento en la Palabra de Dios para la transformación" },
        { name: "Acompañamiento Pastoral", description: "Cuidado pastoral especializado en adicciones" },
        { name: "Discipulado Cristiano", description: "Formación en principios y valores cristianos" },
        { name: "Crecimiento en la Fe", description: "Fortalecimiento de la relación personal con Dios" }
      ]
    }
  ];

  const locations = [
    {
      city: "Bello (Antioquia)",
      icon: "🏔️",
      color: "from-red-500 to-orange-500",
      address: "Vereda Potreritos, Finca el Alto",
      facilities: [
        { type: "Sede Masculina", director: "Juan Camilo Machado Bernal", title: "Psicólogo Especialista", phone: "3145702708" },
        { type: "Sede Femenina", director: "Mildrey Leonel Melo", title: "Psicóloga Especialista", phone: "3216481687" }
      ]
    },
    {
      city: "Apartadó",
      icon: "🌴",
      color: "from-blue-500 to-cyan-500",
      address: "Calle 102BB #76-34, Barrio 20 de Enero",
      facilities: [
        { type: "Sede Masculina", director: "Martín Muñoz Pino", title: "Terapeuta Principal", phone: "3104577835" },
        { type: "Sede Femenina", director: "Luz Yasmin Estrada Fabra", title: "Psicóloga Especialista", phone: "3104577835" }
      ]
    }
  ];

  return (
    <>
      <Breadcrumbs title="Programas" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-[#434194]/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/5"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-[#434194] to-primary bg-clip-text text-transparent mb-6">
            Programas de Transformación
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Ofrecemos programas integrales de rehabilitación que combinan enfoques científicos validados 
            con guía espiritual para la transformación completa de vidas. Cada programa está diseñado 
            para atender necesidades específicas en el proceso de recuperación.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-8"></div>
        </div>
      </div>

      {/* Programas Interactivos */}
      <section 
        id="programas-principales" 
        data-animate
        className={`py-20 bg-gradient-to-br from-gray-50 to-primary/8 transition-all duration-1000 ${
          isVisible['programas-principales'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Nuestros Programas Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecciona un programa para conocer más detalles sobre cómo podemos ayudarte
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {Object.entries(programs).map(([key, program]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${program.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <span className="mr-2">{program.icon}</span>
                {program.title}
              </button>
            ))}
          </div>

          {/* Active Program Content */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className={`bg-gradient-to-r ${programs[activeTab].color} p-8 text-white`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-4xl font-bold mb-2">{programs[activeTab].title}</h3>
                  <p className="text-xl opacity-90">{programs[activeTab].subtitle}</p>
                </div>
                <div className="text-8xl opacity-20">{programs[activeTab].icon}</div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative group mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[#434194]/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <img 
                      src={programs[activeTab].image} 
                      alt={programs[activeTab].title}
                      className="relative w-full rounded-2xl shadow-xl transform group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(programs[activeTab].stats).map(([key, value]) => (
                      <div key={key} className="text-center bg-gray-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">Características del Programa</h4>
                  <div className="space-y-4">
                    {programs[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-start group">
                        <div className="w-6 h-6 bg-gradient-to-r from-primary to-[#434194] rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-700 group-hover:text-primary transition-colors duration-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enfoques Terapéuticos */}
      <section 
        id="enfoques" 
        data-animate
        className={`py-20 bg-gradient-to-br from-primary/5 to-[#434194]/8 transition-all duration-1000 ${
          isVisible.enfoques ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Enfoques Terapéuticos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos metodologías científicas probadas con principios espirituales sólidos
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {therapeuticApproaches.map((approach, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className={`bg-gradient-to-r ${approach.color} p-8 text-white`}>
                  <div className="flex items-center">
                    <div className="text-6xl mr-6">{approach.icon}</div>
                    <div>
                      <h3 className="text-3xl font-bold">Enfoque {approach.category}</h3>
                      <p className="text-xl opacity-90">Metodologías validadas y efectivas</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    {approach.methods.map((method, idx) => (
                      <div key={idx} className="group border-l-4 border-primary/20 pl-6 hover:border-primary transition-colors duration-300">
                        <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                          {method.name}
                        </h4>
                        <p className="text-gray-600">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sedes Dinámicas */}
      <section 
        id="sedes" 
        data-animate
        className={`py-20 bg-gradient-to-br from-gray-50 to-primary/8 transition-all duration-1000 ${
          isVisible.sedes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Nuestras Sedes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contamos con instalaciones especializadas en dos ubicaciones estratégicas de Antioquia
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className={`bg-gradient-to-r ${location.color} p-8 text-white`}>
                  <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4">{location.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{location.city}</h3>
                      <p className="opacity-90">{location.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    {location.facilities.map((facility, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:bg-primary/5 transition-colors duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-primary mb-1">{facility.type}</h4>
                            <p className="text-gray-600 text-sm">{facility.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              {facility.phone}
                            </div>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">{facility.director}</p>
                      </div>
                    ))}
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
            ¿Listo para Comenzar tu Proceso de Transformación?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Nuestro equipo de profesionales está esperando para acompañarte en cada paso hacia tu nueva vida. 
            El momento perfecto para empezar es ahora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Solicitar Información
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300">
              Agendar Cita
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
