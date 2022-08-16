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
  return fetch(`${config.api.hostname}/api/task`, {
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

export const modificarLista = (text) => {
  const token = localStorage.getItem(config.jwt.nameToken);
  return fetch(`${config.api.hostname}/api/task/<int:task_id>`, {
    method: "PUT",
    body: JSON.stringify(text),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const eliminarTarea = (task_id) => {
  const token = localStorage.getItem(config.jwt.nameToken);
  return fetch(`${config.api.hostname}/api/task/${task_id}`, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
