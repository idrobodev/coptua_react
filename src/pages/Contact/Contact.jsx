import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
  };

  const socialNetworks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "#",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800"
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "#",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700"
    },
    {
      name: "WhatsApp",
      icon: "💬",
      url: "https://wa.me/573104577835",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "#",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700"
    },
    {
      name: "TikTok",
      icon: "🎵",
      url: "#",
      color: "from-black to-gray-800",
      hoverColor: "hover:from-gray-800 hover:to-black"
    }
  ];

  const contactInfo = [
    {
      icon: "📍",
      title: "Ubicaciones",
      details: [
        "Bello (Antioquia): Vereda Potreritos, Finca el Alto",
        "Apartadó: Calle 102BB #76-34, Barrio 20 de Enero"
      ]
    },
    {
      icon: "📧",
      title: "Correos Electrónicos",
      details: [
        "fundacion@todoporunalma.org",
        "info@todoporunalma.org"
      ]
    },
    {
      icon: "📞",
      title: "Teléfonos",
      details: [
        "Bello: 3145702708 / 3216481687",
        "Apartadó: 3104577835",
        "Principal: 3104577835"
      ]
    }
  ];

  return (
    <div>
      <Breadcrumbs title="Contacto" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-[#434194]/5 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-[#434194] to-primary bg-clip-text text-transparent mb-6">
            Estamos Aquí para Ti
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para acompañarte en tu proceso de recuperación. 
            Tu bienestar es nuestra prioridad.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-8"></div>
        </div>
      </div>

      {/* Redes Sociales Section */}
      <section 
        id="redes-sociales" 
        data-animate
        className={`py-20 bg-gradient-to-br from-white via-gray-50 to-primary/5 transition-all duration-1000 ${
          isVisible['redes-sociales'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
              Síguenos en Redes Sociales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente conectado con nosotros y sé parte de nuestra comunidad de esperanza y transformación
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#434194] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {socialNetworks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className={`bg-gradient-to-br ${social.color} ${social.hoverColor} rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-2`}>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg group-hover:text-yellow-300 transition-colors duration-300">
                    {social.name}
                  </h3>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full group-hover:bg-yellow-300 transition-colors duration-300"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section 
        id="formulario" 
        data-animate
        className={`py-20 bg-gradient-to-br from-primary/5 via-white to-[#434194]/5 transition-all duration-1000 ${
          isVisible.formulario ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Formulario */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-8">
                Envíanos un Mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="informacion">Información General</option>
                    <option value="admision">Proceso de Admisión</option>
                    <option value="emergencia">Situación de Emergencia</option>
                    <option value="familia">Apoyo Familiar</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nivel de Urgencia</label>
                  <div className="flex space-x-4">
                    {['normal', 'urgente', 'emergencia'].map((level) => (
                      <label key={level} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={formData.urgency === level}
                          onChange={handleInputChange}
                          className="mr-2 text-primary focus:ring-primary"
                        />
                        <span className="capitalize text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50 resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-[#434194] text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-[#434194] hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-[#434194] bg-clip-text text-transparent mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 text-lg">
                  Estamos disponibles para atenderte las 24 horas del día, los 7 días de la semana.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary/20">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{info.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-primary/10 to-[#434194]/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">💡 Consejo Importante</h3>
                <p className="text-gray-700">
                  Si estás en una situación de emergencia o crisis, no dudes en llamarnos inmediatamente. 
                  Estamos aquí para ayudarte en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Mejorado */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <div className="relative z-20 container py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Nuestras Ubicaciones
            </h2>
          </div>
        </div>
        <iframe
          className="w-full h-96 filter brightness-90"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Ubicaciones Todo por un Alma"
          scrolling="no"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014199.5!2d-75.5!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad07%3A0x4c4c9c0f9b9b9b9b!2sAntioquia%2C%20Colombia!5e0!3m2!1ses!2sco!4v1633349781164!5m2!1ses!2sco"
        ></iframe>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary via-[#434194] to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas Ayuda Inmediata?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            No esperes más. Da el primer paso hacia tu recuperación hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3104577835"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              📞 Llamar Ahora
            </a>
            <a
              href="https://wa.me/573104577835"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
