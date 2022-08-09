import config from "./config.js";


// export const obtenerTareas = () => {
// 	return fetch("https://3001-vero2112-jwtauthenticat-gjbbeqhgzw8.ws-eu59.gitpod.io", {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// };

export const crearTarea = (text) => {
	const token = localStorage.getItem(config.jwt.nameToken);
	return fetch("https://3001-vero2112-jwtauthenticat-gjbbeqhgzw8.ws-eu59.gitpod.io/api/task", {
		method: "POST",
		body: JSON.stringify({
			text,	  
		  }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const modificarLista = (data) => {
	return fetch("https://3001-vero2112-jwtauthenticat-gjbbeqhgzw8.ws-eu59.gitpod.io", {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
};