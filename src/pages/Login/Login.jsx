import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useAuth } from "../../components/Context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [, setLoading] = useState(false);
  const { login } = useAuth();

  const history = useHistory();
  const location = useLocation();
  const redirect_url = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");
      setLoading(true);
      await login(data.email, data.password);
      history.push(redirect_url);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Breadcrumbs title="Iniciar Sesión" />
      <div className="container mx-auto px-4">
        <div
          className="flex gap-8 items-center justify-center "
          style={{ minHeight: "65vh" }}
        >
          <div
            className="inline-block border-2 border-gray-200 p-8 rounded-md shadow-lg"
            style={{ width: "450px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-Poppins text-center">
                Iniciar Sesión
              </h2>
              {error && <span className="text-red-600 py-2">{error}</span>}

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

              <button
                className="w-full bg-primary text-white mt-4 mb-4  py-2 px-4 rounded-md"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
