import React, { useEffect, useState } from "react";
import config from "../config.js";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { crearTarea, eliminarTarea } from "../api.js";
import "../../styles/private.css";

export const Private = () => {
  const [datos, obtenerDatos] = useState({});
  const [tareas, cambiarTareas] = useState([]);
  const [nombreTarea, cambiarNombreTarea] = useState({
    text: "",
    done: false,
  });
  const navigate = useNavigate()
  const token = localStorage.getItem(config.jwt.nameToken);

  // ELIMINAR TOKEN/CERRAR SESIÓN USUARIO
  const removeStorage = () => {
    localStorage.removeItem(config.jwt.nameToken);
  }

  // OBTENER TAREAS USUARIO
  const obtenerTareas = () => {
    fetch(`${config.api.hostname}/api/task`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        console.log("soy la data: ", { data });
        cambiarTareas(data)

      })
      .catch((e) => {
        console.error(e);
        navigate(`/`);

      });
  }

  // VALIDACIÓN TOKEN
  useEffect(() => {

    if (!token) {
      navigate("/");
    }

    // OBTENER DATOS USUARIO
    fetch(`${config.api.hostname}/api/perfil`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("soy los datos del usuario ", { data });
        obtenerDatos(data);

      })
      .catch((e) => {
        console.error(e);
        navigate(`/`);
      });

    obtenerTareas();

  }, []);


  // AÑADIR TAREAS
  const agregarTarea = (nombredelaTarea) => {
    // const auxTarea = tareas.concat(nombredelaTarea);
    const auxTarea = [...tareas, nombredelaTarea];

    cambiarTareas(auxTarea);
    cambiarNombreTarea({ text: "" });
    crearTarea(nombredelaTarea.text);
  };


  // Guardar tarea
  const guardartarea = (e) => {
    agregarTarea(nombreTarea);
  };

  // Eliminar tarea con DELETE BOTON 
  const eliminar = (task_id, index, nombredelaTarea) => {
    eliminarTarea(task_id)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => obtenerTareas());
  };

  return (
    <div className="container-private">
      <div className="d-flex justify-content-between mb-3 m-3">
        <h3>Estás logeado! Bienvenid@ {datos.name}!</h3>


        <Link to="/login">
          <button
            type="submit"
            className="btn btn-danger text-end"
            onClick={removeStorage}
          >
            Cerrar sesión
          </button>
        </Link></div>

      <div className="pt-3 row d-flex justify-content-center align-items-center h-100">
        <div className="col-5">
          <div className="card border border border-white">
            <div className="card-body border border border-white">
              <h1 className="d-flex justify-content-center">
                Tareas pendientes
              </h1>
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  onChange={(e) => {
                    cambiarNombreTarea({
                      text: e.target.value,
                      done: false,
                    });
                  }}
                  placeholder="Escribe la tarea"
                  className="form-control"
                  value={nombreTarea.text}
                />

                <button className="btn btn-success" onClick={guardartarea} type="submit">Guardar</button>

              </div>
              <div className="row d-flex justify-content-center align-items-center">

                {tareas.map((task, index) => {
                  return (
                    <div
                      className="d-flex justify-content-between border-bottom w-75 mt-2"
                      key={index}
                    >
                      {/* <h3>{task.text}</h3> */}

                      <input
                        type="text"
                        className="form-control me-1"
                        value={task.text}
                        readOnly
                      />

                      <button
                        className="btn btn-danger ms-1"
                        onClick={() =>
                          eliminar(task.id, index)
                        }
                      >
                        X
                      </button>
                    </div>)
                })}

              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};