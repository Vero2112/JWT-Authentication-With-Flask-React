import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../config.js";

export const Navbar = () => {
	const [datos, obtenerDatos] = useState({});
	const navigate = useNavigate()
	const token = localStorage.getItem(config.jwt.nameToken);


	// ELIMINAR TOKEN/CERRAR SESIÓN USUARIO
	const removeStorage = () => {
		localStorage.removeItem(config.jwt.nameToken);
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
			
				obtenerDatos(data);

			})
			.catch((e) => {
				console.error(e);
				navigate(`/`);
			});

		
	}, []);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				
				<span className="navbar-brand mb-0 h1">Estás logeado! Bienvenid@ {datos.name}!</span>
					
					<div className="ml-auto" >
						<Link to="/login">
							<button
								type="submit"
								className="btn btn-danger"
								onClick={removeStorage}
							>
								Cerrar sesión
							</button>
						</Link>
					</div>
				
			</div>
		</nav>
	);

};


