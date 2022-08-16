import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import config from "../config.js";
import "../../styles/home.css";
import { Modal } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const updateText = (e, setState) => {
    const value = e.target.value;
    // console.log("Soy el value")
    // console.log(value)
    setState(value);
  };

  const onSave = () => {

    const body = JSON.stringify({
      email,
      password,
      name,

    });

    fetch(`${config.api.hostname}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        localStorage.setItem("token", data.token)
        // data.user_id
        // navegar para /user/id
        console.log(data)
        // navigate(`/user/${data.user_id}`);
        navigate(`/private/${data.user_id}}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onSaveUser = () => {

    const body = JSON.stringify({
      email,
      password,
      name,

    });

    fetch(`${config.api.hostname}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        // localStorage.setItem("token", data.token)
        // data.user_id
        // navegar para /user/id
        navigate(`/signup`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="text-center mt-5">
      <div className="mb-3 row">

        <label htmlFor="staticEmail" className="col-1 col-form-label">
          Name
        </label>
        <div className="col-10 ">
          <input
            type="text"
            className="form-control"
            id="staticName"
            onChange={(e) => updateText(e, setName)}
            placeholder="Ingrese su nombre"
            value={name}
          ></input>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-1 col-form-label">
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
        <label htmlFor="inputPassword" className="col-1 col-form-label">
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
          <Link to="/signup">
            <button type="submit" className="btn btn-primary mb-3 m-3" onClick={onSaveUser}>
              Crear usuario
            </button></Link>
        </div>
      </div>
    </div>
  );
};
