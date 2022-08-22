import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/private.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/signup"
                >
                  Registro de usuario
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  Inicio de sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-private">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h1> Autentificación JWT con Flask & React.js</h1>
          
        </div>
      </div>
    </div>
  );
};
