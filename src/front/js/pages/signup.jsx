import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import config from "../config.js";
import "../../styles/home.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../../styles/private.css";


export const Signup = () => {
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

    const onSaveUser = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            email,
            password,
            name,
        });

        const res = await fetch(`${config.api.hostname}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        })

        const data = await res.json();
        if (data.message === "Usuario creado con éxito!") {
            modalManager(data.message, true);
        } else {
            modalManager(data.message, false);
        }
    };

    return (
        <div className="text-center mt-5 container-private " id="container-login">
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="mb-3 d-flex justify-content-center text-start">
                    <div className="col-4"> 
                    <label htmlFor="staticName" className="col-form-label text-start">
                        Name
                    </label></div>
                    <div className="col-8" >
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
                        <button type="submit" className="btn btn-primary m-3" onClick={onSaveUser}>
                            Crear usuario
                        </button>
                        <Link to="/login">
                            <button type="submit" className="btn btn-primary  m-3" >
                                Ir a inicio de sesión
                            </button>
                        </Link>
                    </div>
                    <Link to="/">
                        <button type="submit" className="btn btn-primary " >
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
                    <Modal.Title>Registro de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>{textoAlerta}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-primary"
                        onClick={() => {
                            if (navegar) {
                                navigate("/login");
                            } else {
                                handleClose();
                            }
                        }}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <div>
                <button type="submit" className="btn btn-primary m-3" onClick={onSaveUser}>
                    Crear usuario
                </button>
                <Link to="/login">
                    <button type="submit" className="btn btn-primary  m-3" >
                        Ir a inicio de sesión
                    </button>
                </Link>
            </div>
            <Link to="/">
                <button type="submit" className="btn btn-primary " >
                    Ir a la página de inicio
                </button>
            </Link> */}
        </div>



    );
};