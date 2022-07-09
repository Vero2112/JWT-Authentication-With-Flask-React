import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			
			{/* <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" ></input>
    </div>
	<div> 
    <button type="submit" className="btn btn-primary mb-3 m-2">Iniciar sesión</button>
    <button type="submit" className="btn btn-primary mb-3 m-2">Crear usuario</button>
 	</div>
  </div> */}
				
<h1>Hola!  </h1>

		</div>
	);
};