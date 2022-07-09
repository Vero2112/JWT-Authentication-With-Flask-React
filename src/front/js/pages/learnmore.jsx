import React, { useContext } from "react";
import {Link } from "react-router-dom";
import "../../styles/home.css";

export const Learnmore = () => {
	

	return (
		<div>
<h1>LOGEADO!</h1>
<Link to="/">
          <button
            type="submit"
            className="btn btn-danger mb-3 m-3"
            // onClick={onSave}            
          >
          Volver
          </button>
        </Link>
		</div>
	);
};
