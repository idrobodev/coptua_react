import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useAuth } from "../../components/Context/AuthContext";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const [error, setError] = useState("");
  const [, setLoading] = useState(false);
  const { signUp } = useAuth();

  const history = useHistory();
  const location = useLocation();
  const redirect_url = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.reEnterPassword) {
      setError("Las contraseñas no coinciden");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(data.email, data.password);
      history.push(redirect_url);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Breadcrumbs title="Registro" />
      <div className="container">
        <div
          className="flex gap-8 items-center justify-center "
          style={{ minHeight: "75vh" }}
        >
          <div
            className="inline-block border-2 border-gray-200 p-8 rounded-md shadow-lg"
            style={{ width: "450px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-Poppins text-center">
                Crear una cuenta
              </h2>
              {error && (
                <span className="text-red-600 text-center py-2">{error}</span>
              )}

              <div className="mt-4 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  className="border border-gray-400 w-full px-4 py-2"
                  placeholder="Ingrese su correo electrónico"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Este campo es obligatorio</span>
                )}
              </div>

              <div className="mt-4 mb-4">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="border border-gray-400 w-full px-4 py-2"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">Este campo es obligatorio</span>
                )}
              </div>

              <div className="mt-4 mb-4">
                <label htmlFor="reEnterPassword">Confirme su contraseña</label>
                <input
                  type="password"
                  placeholder="Vuelva a escribir su contraseña"
                  className="border border-gray-400 w-full px-4 py-2"
                  {...register("reEnterPassword", { required: true })}
                />
                {errors.reEnterPassword && (
                  <span className="text-red-600">Este campo es obligatorio</span>
                )}
              </div>

              <button
                className="w-full bg-primary text-white mt-4 mb-4  py-2 px-4 rounded-md"
                type="submit"
              >
                Registrarse
              </button>
              <h1 className="py-4">
                ¿Ya tienes una cuenta?
                <Link className="text-primary px-2" to="/login">
                  Inicia sesión
                </Link>
              </h1>
            </form>
            <SocialLogin title="Registro" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
