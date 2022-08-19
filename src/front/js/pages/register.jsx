import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/private.css";

export const Register = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5 container-private">
      <h1>Usuario creado! Vuelve e inicia sesión para acceder a tu cuenta </h1>
      <Link to="/login">
        <button
          type="submit"
          className="btn btn-danger mb-3 m-3"
        // onClick={onSave}            
        >
          Volver
        </button>
      </Link>
    </div>
  );
};