interface tarea {
    titulo: string;
    descripcion?: string;
    estado: boolean;
    fecha?: Date;
    prioridad: number;
    categoria: number;
}


//Comprueba login 
window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    if (!usuariActual) {
        window.location.href = "login.html";
    }

    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[])
        .map(t => ({ ...t, fecha: t.fecha ? new Date(t.fecha) : undefined }));

    console.log(tasques);
}

//Crear tarea 
function crearTarea(
    titulo: string,
    descripcion?: string,
    fecha?: Date,
    prioridad: number = 1,
    categoria: number = 0
) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);

    const novaTarea: tarea = {
        titulo,
        descripcion,
        estado: false,
        fecha,
        prioridad,
        categoria
    };

    tasques.push(novaTarea);

    localStorage.setItem("tasques", JSON.stringify(tasques));

    console.log("Tarea creada:", novaTarea);
}


//Eliminar tarea 
function eliminarTarea(titulo: string) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);

    const index = tasques.findIndex(t => t.titulo === titulo);

    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }

    const tareaEliminada = tasques.splice(index, 1)[0];

    localStorage.setItem("tasques", JSON.stringify(tasques));

    console.log("Tarea eliminada:", tareaEliminada);
}



//Actualizar tarea 
function actualizarTarea(
    titulo: string,
    nuevoTitulo?: string,
    descripcion?: string,
    estado?: boolean,
    fecha?: Date,
    prioridad?: number,
    categoria?: number
) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);

    const index = tasques.findIndex(t => t.titulo === titulo);

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
    if (categoria !== undefined) {
        tasques[index].categoria = categoria;
    }

    localStorage.setItem("tasques", JSON.stringify(tasques));

    console.log("Tarea actualizada:", tasques[index]);
}



//Cerrar sesion
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    window.location.href = "login.html";
}
