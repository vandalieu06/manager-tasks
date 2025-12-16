"use strict";
function abrirModal() {
    console.log("Abriendo Nueva Tarea");
}
function crearTarea(titulo, descripcion, estado = 1, fecha, prioridad = 1, etiquetas = []) {
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw);
    }
    const novaTarea = {
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
function eliminarTarea(titulo) {
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw);
    }
    let index = -1;
    for (let i = 0; i < tasques.length; i++) {
        if (tasques[i].titulo === titulo) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }
    const tareaEliminada = tasques.splice(index, 1)[0];
    localStorage.setItem("tasques", JSON.stringify(tasques));
    console.log("Tarea eliminada:", tareaEliminada);
}
function actualizarTarea(titulo, nuevoTitulo, descripcion, estado, fecha, prioridad, etiquetas) {
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw);
    }
    let index = -1;
    for (let i = 0; i < tasques.length; i++) {
        if (tasques[i].titulo === titulo) {
            index = i;
            break;
        }
    }
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
    window.location.href = "./pages/login.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const usuariActual = localStorage.getItem("usuariActual");
    if (!usuariActual) {
        window.location.href = "./pages/login.html";
    }
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]").map((t) => (Object.assign(Object.assign({}, t), { fecha: t.fecha ? new Date(t.fecha) : undefined })));
    console.log(tasques);
});
