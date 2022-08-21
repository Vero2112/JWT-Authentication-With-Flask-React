import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/private.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    
    <div >
      <h1>Home</h1>
     
      <Link to="/login">
        <button type="submit" className="btn btn-primary mb-3 m-3">
          Ir a inicio de sesión
        </button>
      </Link>

      <Link to="/signup">
        <button type="submit" className="btn btn-primary mb-3 m-3">
          Ir a registro de usuario
        </button>
      </Link>
    </div>
  
  );
};
