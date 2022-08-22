import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import config from "../config.js";
import "../../styles/home.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../../styles/private.css";
import { Navbar } from "../component/navbar.jsx";

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
    
    if (data.token !== undefined) {
      localStorage.setItem("token", data.token)
      navigate(`/private/${data.data.id}`);
      // console.log("data: ", data)
    } else {
      modalManager(data.message, false);
    }
  };

  return (

    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <a className="navbar-brand" href="/">Home</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/signup">Registro de usuario</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="text-center mt-5 container-private" id="container-login">
        <div className="position-absolute top-50 start-50 translate-middle bg-light rounded-3 border border-secondary p-3">
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
                Contraseña
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
              className="btn btn-secondary m-3"
              onClick={onSave}
            >
              Iniciar sesión
            </button>

          </div>


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
              className="btn btn-secondary"
              // onClick={() => {  
              //   handleClose();
                
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
    </div>
  );
};
