import React from "react";
import happyClient from "../../images/happyCL.jpg";
const HappyCustomers = () => {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center bg-fixed w-full"
        style={{
          backgroundImage: `url(${happyClient})`,
        }}
      >
        <div className="opacity-80 absolute bg-black  w-full"></div>
        <div className="container relative py-8 text-center text-black">
          <h1 className="text-4xl py-2 font-Poppins font-semibold">
            Nuestro <span className="text-black">Impacto</span> 2024
          </h1>
          <p>
            Transformando vidas desde el amor y la evidencia científica
          </p>
          <div className="flex justify-between items-center py-16">
            <div className="">
              <h1 className="md:text-4xl text-1xl font-Poppins font-extrabold">
                500+
              </h1>
              <p className="text-black italic md:text-2xl text-1xl font-Roboto font-semibold">
                Personas Atendidas
              </p>
            </div>

            <div className="">
              <h1 className="md:text-4xl text-1xl font-Poppins font-extrabold">
                85%
              </h1>
              <p className="text-black italic md:text-2xl text-1xl font-Roboto font-semibold">
                Tasa de Éxito
              </p>
            </div>

            <div className="">
              <h1 className="md:text-4xl text-1xl font-Poppins font-extrabold">
                200+
              </h1>
              <p className="text-black italic md:text-2xl text-1xl font-Roboto font-semibold">
                Familias Acompañadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HappyCustomers;
