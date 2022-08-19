import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import config from "../config.js";
import "../../styles/home.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../../styles/private.css";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [textoAlerta, setTextoAlerta] = useState("");
  const [navegar, setNavegar] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalManager = (texto, canNavigate) => {
    setTextoAlerta(texto);
    setNavegar(canNavigate);
    handleShow();
  };

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const onSave = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email,
      password
    });

    const resp = await fetch(`${config.api.hostname}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })

    const data = await resp.json();
    console.log("data: ", data)
    if (data.token !== undefined) {
      localStorage.setItem("token", data.token)
      navigate(`/private/${data.user_id}`);
    } else {
      modalManager(data.message, false);
    }
  };

  return (
    <div className="text-center mt-5 container-private" id="container-login">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="mb-3 d-flex justify-content-center text-start">
          <div className="col-4">
            <label htmlFor="staticEmail" className="col-form-label ">
              Email
            </label></div>
          <div className="col-8" >
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
        <div className="mb-3 d-flex justify-content-center text-start">
          <div className="col-4">
            <label htmlFor="inputPassword" className="col-form-label ">
              Password
            </label></div>
          <div className="col-8">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(e) => updateText(e, setPassword)}
              placeholder="Ingrese su contraseña"
              value={password}
            ></input>
          </div>
        </div>


        <div>
          <button
            type="submit"
            className="btn btn-primary m-3"
            onClick={onSave}
          >
            Iniciar sesión
          </button>
          <Link to="/signup">
            <button type="submit" className="btn btn-primary m-3" >
              Ir a registro de usuario
            </button>
          </Link>
        </div>

        <Link to="/">
          <button type="submit" className="btn btn-primary" >
            Ir a la página de inicio
          </button>
        </Link>
      </div>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inicio Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textoAlerta}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            // onClick={() => {  
            //   handleClose();
            //   navigate("/signup");
            // }}

            onClick={() => {
              if (navegar) {
                navigate("/");
              } else {
                handleClose();
              }
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};
