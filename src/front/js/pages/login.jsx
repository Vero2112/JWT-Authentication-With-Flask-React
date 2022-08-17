import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import config from "../config.js";
import "../../styles/home.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../../styles/private.css";
// import Modal from "react-bootstrap/Modal";

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
    // console.log("Soy el value")
    // console.log(value)
    setState(value);
  };

  const onSave = async (e) => {
    e.preventDefault(); 

    const body = JSON.stringify({
      email,
      password,
      name,

    });

    const res = await fetch(`${config.api.hostname}/api/login`, {
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
        navigate(`/private/${data.user_id}`);
      })
      .catch((e) => {
        console.error(e);

      });

      // const json = await res.json();
      
      
      // if (res.status == 201) {
      //   modalManager(json.message, true);
      //   // navigate(`/private/${data.user_id}`);
      // } else if (res.status !== 201) {
      //   modalManager(json.message, false);
      // }
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
      // .then((res) => {
      //   return res.json();
      // })
      // .then((data) => {
      //   console.log({ data });
      //   // localStorage.setItem("token", data.token)
      //   // data.user_id
      //   // navegar para /user/id

      //   // navigate(`/signup`);
      // })
      // .catch((e) => {
      //   console.error(e);
      // });

      const json = await res.json();
      
      
      if (res.status == 201) {
        modalManager(json.message, true);
      } else if (res.status !== 201) {
        modalManager(json.message, false);
      }
  };

  return (
    <div className="text-center mt-5 container-login">
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

       
          <button
            type="submit"
            className="btn btn-primary mb-3 m-3"
            onClick={onSave}
          >
            Iniciar sesión
          </button>
         

          {/* <Link to="/signup"> */}
            <button type="submit" className="btn btn-primary mb-3 m-3" onClick={onSaveUser}>
              Crear usuario
            </button>
            {/* </Link> */}
        </div>
      </div>

{/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">fbf</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
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
              // variant="btn btn-primary"
              onClick={() => {
                if (navegar) {
                  navigate("/signup");
                }  else {
                  handleClose();
                }
              }}
              // onClick={handleClose}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

    </div>



  );
};
