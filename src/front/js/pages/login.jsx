import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import config from "../config.js";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const updateText = (e, setState) => {
    const value = e.target.value;
    console.log("Soy el value")
    console.log(value)
    setState(value);
  };

  const onSave = () => {
    
    const body = JSON.stringify({
      email,
      password,

    });

    fetch(`${config.api.hostname}/api/login`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log({data});
      localStorage.setItem("token", data.token)
      // data.user_id
      // navegar para /user/id
      // Navigate(`/user/${data.user_id}`);
    })
    .catch((e) => {
      console.error(e);
    });
  };

  return (
    <div className="text-center mt-5">
      <div className="mb-3 row">
        <label for="staticEmail" className="col-1 col-form-label">
          Email
        </label>
        <div className="col-10 ">
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            onChange={(e) => updateText(e, setEmail)}
            placeholder="Ingrese su email"
            value={email}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label for="inputPassword" className="col-1 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            onChange={(e) => updateText(e, setPassword)}
            placeholder="Ingrese su contraseña"
            value={password}
          ></input>
        </div>
        <div>
        
			{/* <Link to="/learnmore"> */}
          <button
            type="submit"
            className="btn btn-primary mb-3 m-3"
            onClick={onSave}            
          >
          Iniciar sesión
          </button>
        {/* </Link> */}
          <button type="submit" className="btn btn-primary mb-3 m-3">
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  );
};
