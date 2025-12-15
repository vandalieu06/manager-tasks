interface tarea {
	titulo: string;
	descripcion?: string;
	estado: number;
	fecha?: Date;
	prioridad: number;
	etiquetas: string[];
}

window.onload = function () {
	const usuariActual = localStorage.getItem("usuariActual");

	if (!usuariActual) {
		window.location.href = "login.html";
	}

	const tasques = (
		JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]
	).map((t) => ({ ...t, fecha: t.fecha ? new Date(t.fecha) : undefined }));

	console.log(tasques);
};

function crearTarea(
	titulo: string,
	descripcion?: string,
	estado: number = 1,
	fecha?: Date,
	prioridad: number = 1,
	etiquetas: string[] = []
) {
	const tasques = JSON.parse(
		localStorage.getItem("tasques") || "[]"
	) as tarea[];

	const novaTarea: tarea = {
		titulo,
		descripcion,
		estado,
		fecha,
		prioridad,
		etiquetas,
	};

	tasques.push(novaTarea);

	localStorage.setItem("tasques", JSON.stringify(tasques));

	console.log("Tarea creada:", novaTarea);
}

function eliminarTarea(titulo: string) {
	const tasques = JSON.parse(
		localStorage.getItem("tasques") || "[]"
	) as tarea[];

	const index = tasques.findIndex((t) => t.titulo === titulo);

	if (index === -1) {
		console.error("No se encontró ninguna tarea con el título:", titulo);
		return;
	}

	const tareaEliminada = tasques.splice(index, 1)[0];

	localStorage.setItem("tasques", JSON.stringify(tasques));

	console.log("Tarea eliminada:", tareaEliminada);
}

function actualizarTarea(
	titulo: string,
	nuevoTitulo?: string,
	descripcion?: string,
	estado?: number,
	fecha?: Date,
	prioridad?: number,
	etiquetas?: string[]
) {
	const tasques = JSON.parse(
		localStorage.getItem("tasques") || "[]"
	) as tarea[];

	const index = tasques.findIndex((t) => t.titulo === titulo);

	if (index === -1) {
		console.error("No se encontró ninguna tarea con el título:", titulo);
		return;
	}

	if (nuevoTitulo !== undefined) {
		tasques[index].titulo = nuevoTitulo;
	}
	if (descripcion !== undefined) {
		tasques[index].descripcion = descripcion;
	}
	if (estado !== undefined) {
		tasques[index].estado = estado;
	}
	if (fecha !== undefined) {
		tasques[index].fecha = fecha;
	}
	if (prioridad !== undefined) {
		tasques[index].prioridad = prioridad;
	}
	if (etiquetas !== undefined) {
		tasques[index].etiquetas = etiquetas;
	}

	localStorage.setItem("tasques", JSON.stringify(tasques));

	console.log("Tarea actualizada:", tasques[index]);
}

function tancarSesio() {
	localStorage.removeItem("usuariActual");
	window.location.href = "login.html";
}
