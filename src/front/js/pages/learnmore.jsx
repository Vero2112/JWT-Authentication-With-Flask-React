import React, { useContext, useEffect, useState } from "react";
import config from "../config.js";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { obtenerTareas, crearTarea, modificarLista } from "../api.js";

export const Learnmore = () => {
  const { store, actions } = useContext(Context);
  // const [setTareas, setTareas] = useState("");
  // const [tasks, setTasks] = useState([]);
  const [tareas, cambiarTareas] = useState([]);
  const [nombreTarea, cambiarNombreTarea] = useState({
    text: "",
    done: false,
  });
  const navigate = useNavigate()

  // ELIMINAR TOKEN/CERRAR SESIÓN USUARIO
  const removeStorage = () => {
    localStorage.removeItem(config.jwt.nameToken);
  }

  // VALIDACIÓN TOKEN
  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      navigate("/login");
    }


    // OBTENER TAREAS USUARIO
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
        // setLoading(true)
        console.log("soy la data: ", { data });
        // setTasks(data)

        cambiarTareas(data)

        // localStorage.setItem("token", data.token)
        // data.user_id
        // navegar para /user/id

      })
      .catch((e) => {
        console.error(e);
        navigate(`/login`);

      });

  }, []);


  // AÑADIR TAREAS
  const agregarTarea = (nombredelaTarea) => {
    // const auxTarea = tareas.concat(nombredelaTarea);
    const auxTarea = [...tareas, nombredelaTarea];
    
    cambiarTareas(auxTarea);
    cambiarNombreTarea({ text: "" });
    crearTarea(nombredelaTarea.text);
  };


  // MODIFICAR TAREAS USUARIO

  const updateText = (e, setState) => {

    const value = e.target.value;

    console.log("soy el nuevo value:", value)
    setState(value);
  };


  // ------------------
  // Guardar tarea forma1
  const guardartarea = (e) => {

    agregarTarea(nombreTarea);

  };


  // ------------------
  // Guardar tarea forma2
  const guardarNombre = async (text) => {

    // agregarTarea(nombreTarea);
    const token = localStorage.getItem(config.jwt.nameToken);
    
    // const body = JSON.stringify({
    //   text,

    // });

    const resp = await fetch(`${config.api.hostname}/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,	  
        }),
    });

    const data = await resp.json();

    console.log("resp" + resp);
    console.log("data" + data);

  };

  return (
    <div>
      <h1>LOGEADO!</h1>

      <Link to="/login">
        <button
          type="submit"
          className="btn btn-danger mb-3 m-3"
          onClick={removeStorage}
        >
          Cerrar sesión
        </button>
      </Link>
      {/* ------------------ */}
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
                  
                  // onChange={(e) => updateText(e, setTasks)}
                  
                  placeholder="Escribe la tarea"
                  // value={tasks}
                  value={nombreTarea.text}
                />
                <button className="btn btn-success" onClick={guardartarea} type="submit">Guardar</button>
                <button className="btn btn-success" onClick={guardarNombre} type="submit">Guardar1</button>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                {/* {tareas.map((nombreTarea, index) => ( */}
                {tareas.map((task) => {
                  return (
                    <div
                      className="d-flex justify-content-between border-bottom w-75 mt-2"
                      // key={index}
                      key={task.id}
                    >
                      {/* {nombreTarea.label} */}
                      <h3>{task.text}</h3>

                      <button
                        className="btn btn-danger"
                      // onClick={() =>
                      // 	eliminarTarea(index)
                      // }
                      >
                        X
                      </button>
                    </div>)
                })}
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ------------------ */}
    </div>
  );
};
