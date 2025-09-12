import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Contact = () => {
  return (
    <div>
      <Breadcrumbs title="Contacto" />
      <div className="container py-16 ">
        <div className="pb-8">
          <h1 className="text-4xl font-bold font-Roboto">
            Envíanos un <span className="text-primary">Mensaje</span>{" "}
          </h1>
          <p className="text-gray-400 py-2">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para acompañarte en tu proceso de recuperación.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 justify-between">
          <div className="">
            <div className="">
              <fieldset>
                <label htmlFor="fname">Nombre:</label>
                <input
                  className="border-opacity-100 w-full border px-4 border-gray-800 py-2"
                  type="text"
                  id="name"
                  name="name"
                />
                <br />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                  className="border-opacity-100 w-full border px-4 border-gray-800 py-2"
                  type="email"
                  id="email"
                  name="email"
                />
                <br />
                <br />
                <label htmlFor="message">Mensaje:</label>
                <textarea
                  className="border-opacity-100 w-full border px-4 border-gray-800 py-2"
                  rows="4"
                  cols="50"
                />
                <br />
                <button className="bg-white mt-4 border border-primary text-black py-3 px-6 rounded-md hover:bg-transparent hover:bg-primary hover:text-white transition">
                  Enviar
                </button>
              </fieldset>
            </div>
          </div>
          <div className="inset-0 lg:px-16 px-8">
            <h1 className="text-4xl py-2 font-Poppins font-semibold">
              Ponte en <span className="text-primary"> Contacto</span>
            </h1>
            <div className="flex py-4">
              <div className="">
                <i className="fas fa-map-marker-alt text-3xl text-secondary"></i>
              </div>
              <div className="px-8">
                <p><strong>Bello (Antioquia):</strong> Vereda Potreritos, Finca el Alto</p>
                <p><strong>Apartadó:</strong> Calle 102BB #76-34, Barrio 20 de Enero</p>
              </div>
            </div>
            <div className="flex py-4">
              <div className="">
                <i className="far fa-envelope text-3xl text-secondary"></i>
              </div>
              <div className="px-8">
                <p>fundacion@todoporunalma.org</p>
                <p>info@todoporunalma.org</p>
              </div>
            </div>
            <div className="flex py-4">
              <div className="">
                <i className="fas fa-phone text-3xl text-secondary"></i>
              </div>
              <div className="px-8 font-bold">
                <p><strong>Bello:</strong> 3145702708 / 3216481687</p>
                <p><strong>Apartadó:</strong> 3104577835</p>
                <p><strong>Principal:</strong> 3104577835</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        className="w-full h-96"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="map"
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014199.5!2d-75.5!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad07%3A0x4c4c9c0f9b9b9b9b!2sAntioquia%2C%20Colombia!5e0!3m2!1ses!2sco!4v1633349781164!5m2!1ses!2sco"
      ></iframe>
    </div>
  );
};

export default Contact;
