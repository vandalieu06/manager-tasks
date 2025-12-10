"use strict";
window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    if (!usuariActual) {
        window.location.href = "login.html";
    }
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]")
        .map(t => (Object.assign(Object.assign({}, t), { fecha: t.fecha ? new Date(t.fecha) : undefined })));
    console.log(tasques);
};
function crearTarea(titulo, descripcion, fecha, prioridad = 1, categoria = 0) {
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]");
    const novaTarea = {
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
function eliminarTarea(titulo) {
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]");
    const index = tasques.findIndex(t => t.titulo === titulo);
    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }
    const tareaEliminada = tasques.splice(index, 1)[0];
    localStorage.setItem("tasques", JSON.stringify(tasques));
    console.log("Tarea eliminada:", tareaEliminada);
}
function actualizarTarea(titulo, nuevoTitulo, descripcion, estado, fecha, prioridad, categoria) {
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]");
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
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    window.location.href = "login.html";
}
