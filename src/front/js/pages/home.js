import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
<h1>Home</h1>
<Link to="/login">
        <button
          type="submit"
          className="btn btn-success mb-3 m-3"
        // onClick={onSave}            
        >
          Ir a Autentificación de Usuario
        </button>
      </Link>
		</div>
	);
};
