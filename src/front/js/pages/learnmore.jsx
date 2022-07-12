import React, { useContext, useEffect, useState,  } from "react";
import config from "../config.js";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/home.css";

export const Learnmore = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

useEffect (() => {
      const {id} = useParams()
        const token = localStorage.getItem(config.jwt.nameToken);
      if (!token) {
        navigate("/login");
        }

      fetch(`${config.api.hostname}/api/task/${id}`, {
        method:"GET",
      headers: {
        Authorization: `Bearer ${token}`,
            },
          
          })
          .then((res) => {
            if (res.status !== 200) {
              navigate ("/login");
            return }
          })
          .then((array) => {
            setLoading(true)
        console.log({ array });
        setTasks(array)
            // localStorage.setItem("token", data.token)
            // data.user_id
            // navegar para /user/id
            
          })
          .catch((e) => {
        console.error(e);
      navigate(`/login`);
      
          });

      },[]);

    if (!loading) {
      return <>Cargando...</>;
    }

  return (
    <div>
      <h1>LOGEADO!</h1>
      {tasks.map((task) => {
        return (<div key={task.id}>
        <h3>{task.text}</h3>
        <h3>{task.done}</h3>
        </div>);
      })}
            {/* <button
        type="submit"
        className="btn btn-danger mb-3 m-3"
      // onClick={onSave}            
      >
        Volver
      </button> */}

    </div>
  );
};
