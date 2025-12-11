interface tarea {
    titulo: string;
    descripcion?: string;
    estado: boolean;
    fecha?: Date;
    prioridad: number;
    etiquetas: string[]
}


// Comprueba login 
window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    // ❌ Aquí habría que comprobar sesión/token en base de datos o API

    if (!usuariActual) {
        window.location.href = "login.html";
    }

    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[])
        .map(t => ({ ...t, fecha: t.fecha ? new Date(t.fecha) : undefined }));
    // ❌ Aquí habría que obtener las tareas de la base de datos en vez de localStorage

    console.log(tasques);
}


// Crear tarea 
function crearTarea(
    titulo: string,
    descripcion?: string,
    fecha?: Date,
    prioridad: number = 1,
    etiquetas: string[] = [] 
) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);
    // ❌ Aquí habría que insertar la tarea en la base de datos

    const novaTarea: tarea = {
        titulo,
        descripcion,
        estado: false,
        fecha,
        prioridad,
        etiquetas
    };

    tasques.push(novaTarea);
    // ❌ Ya no se hace push en memoria, se hace un INSERT en la base de datos

    localStorage.setItem("tasques", JSON.stringify(tasques));
    // ❌ Aquí habría que actualizar la base de datos

    console.log("Tarea creada:", novaTarea);
}


// Eliminar tarea 
function eliminarTarea(titulo: string) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);
    // ❌ Aquí habría que buscar la tarea en la base de datos

    const index = tasques.findIndex(t => t.titulo === titulo);

    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }

    const tareaEliminada = tasques.splice(index, 1)[0];
    // ❌ Aquí habría que hacer un DELETE en la base de datos

    localStorage.setItem("tasques", JSON.stringify(tasques));
    // ❌ Aquí habría que actualizar la base de datos

    console.log("Tarea eliminada:", tareaEliminada);
}


// Actualizar tarea 
function actualizarTarea(
    titulo: string,
    nuevoTitulo?: string,
    descripcion?: string,
    estado?: boolean,
    fecha?: Date,
    prioridad?: number,
    etiquetas?: string[]
) {
    const tasques = (JSON.parse(localStorage.getItem("tasques") || "[]") as tarea[]);
    // ❌ Aquí habría que buscar la tarea en la base de datos

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
    if (etiquetas !== undefined) {
        tasques[index].etiquetas = etiquetas;
    }

    localStorage.setItem("tasques", JSON.stringify(tasques));
    // ❌ Aquí habría que hacer un UPDATE en la base de datos

    console.log("Tarea actualizada:", tasques[index]);
}


// Cerrar sesión
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    // ❌ Aquí habría que invalidar sesión/token en la base de datos o servidor
    window.location.href = "login.html";
}
