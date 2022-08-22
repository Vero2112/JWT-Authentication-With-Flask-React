import React, { useEffect, useState } from "react";
import config from "../config.js";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { crearTarea, eliminarTarea } from "../api.js";
import "../../styles/private.css";
import { Navbar } from "../component/navbar.jsx";
export const Private = () => {
  const [datos, obtenerDatos] = useState({});
  const [tareas, cambiarTareas] = useState([]);
  const [nombreTarea, cambiarNombreTarea] = useState({
    text: "",
    done: false,
  });
  const navigate = useNavigate()
  const token = localStorage.getItem(config.jwt.nameToken);


  // OBTENER TAREAS USUARIO
  const obtenerTareas = () => {
    fetch(`${config.api.hostname}/api/task`, {
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
        // console.log("soy los datos del usuario ", { data });
        obtenerDatos(data);

      })
      .catch((e) => {
        console.error(e);
        navigate(`/`);
      });

    obtenerTareas();

  }, []);


  // AÑADIR TAREAS
  const agregarTarea = () => {
    // const auxTarea = tareas.concat(nombredelaTarea);
    if (nombreTarea && nombreTarea.text.length > 0) {

      crearTarea(nombreTarea.text)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => obtenerTareas());

    }
    nombreTarea.text = "";
  };


  // Eliminar tarea
  const eliminar = (task_id) => {
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
    <div>
      <Navbar />
      <div className="container-private">

        <div className="pt-3 row d-flex justify-content-center align-items-center h-100">
          <div className="col-5">
            
              <div className="p-3 mt-4" id="border">
                <h1 className="d-flex justify-content-center">
                 - To Do List -
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
                    variant="bordeinput"
                    onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
                  />

                  <button className="btn btn-secondary ms-2 " onClick={agregarTarea} type="submit">Guardar</button>

                </div>
                <div className="row d-flex justify-content-center align-items-center">

                  {tareas.map((task, index) => {
                    return (
                      <div
                        className="d-flex justify-content-between w-75 mt-2"
                        key={index}
                      >
                        <input
                          type="text"
                          className="form-control me-1 bg-white"
                          value={task.text}
                          variant="bordeinput2"
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