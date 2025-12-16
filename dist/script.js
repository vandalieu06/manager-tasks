"use strict";
window.abrirModal = abrirModal;
window.onload = () => {
    const usuariActual = localStorage.getItem("usuariActual");
    if (!usuariActual) {
        window.location.href = "./pages/login.html";
    }
    const tasques = JSON.parse(localStorage.getItem("tasques") || "[]").map((t) => (Object.assign(Object.assign({}, t), { fecha: t.fecha ? new Date(t.fecha) : undefined })));
    console.log(tasques);
};
function abrirModal() {
    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";
    const modal = document.createElement("div");
    modal.id = "modalWindow";
    const form = document.createElement("form");
    const tituloLabel = document.createElement("label");
    tituloLabel.textContent = "Título:";
    const tituloInput = document.createElement("input");
    tituloInput.type = "text";
    tituloInput.required = true;
    const descLabel = document.createElement("label");
    descLabel.textContent = "Descripción:";
    const descInput = document.createElement("textarea");
    const fechaLabel = document.createElement("label");
    fechaLabel.textContent = "Fecha:";
    const fechaInput = document.createElement("input");
    fechaInput.type = "date";
    const prioridadLabel = document.createElement("label");
    prioridadLabel.textContent = "Prioridad:";
    const prioridadInput = document.createElement("input");
    prioridadInput.type = "number";
    prioridadInput.value = "1";
    prioridadInput.min = "1";
    const etiquetasLabel = document.createElement("label");
    etiquetasLabel.textContent = "Etiquetas (separadas por coma):";
    const etiquetasInput = document.createElement("input");
    etiquetasInput.type = "text";
    const crearBtn = document.createElement("button");
    crearBtn.type = "submit";
    crearBtn.textContent = "Crear";
    const cancelarBtn = document.createElement("button");
    cancelarBtn.type = "button";
    cancelarBtn.textContent = "Cancelar";
    cancelarBtn.onclick = () => {
        document.body.removeChild(overlay);
    };
    form.appendChild(tituloLabel);
    form.appendChild(tituloInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(fechaLabel);
    form.appendChild(fechaInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(prioridadLabel);
    form.appendChild(prioridadInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(etiquetasLabel);
    form.appendChild(etiquetasInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(crearBtn);
    form.appendChild(cancelarBtn);
    form.onsubmit = (e) => {
        e.preventDefault();
        let fechaTarea = undefined;
        if (fechaInput.value) {
            fechaTarea = new Date(fechaInput.value);
        }
        let etiquetasTarea = [];
        if (etiquetasInput.value) {
            const etiquetasArray = etiquetasInput.value.split(",");
            for (let i = 0; i < etiquetasArray.length; i++) {
                etiquetasTarea.push(etiquetasArray[i].trim());
            }
        }
        crearTarea(tituloInput.value, descInput.value, 1, fechaTarea, Number(prioridadInput.value), etiquetasTarea);
        document.body.removeChild(overlay);
    };
    modal.appendChild(form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    });
    Object.assign(modal.style, {
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid black",
    });
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
document.addEventListener("DOMContentLoaded", () => {
    const chkDashboard = document.getElementById("chkDashboard");
    const chkTodas = document.getElementById("chkTodas");
    const mainContent = document.getElementById("mainContent");
    // Guardamos el HTML original del dashboard
    const dashboardHTML = mainContent.innerHTML;
    chkDashboard.checked = true;
    chkDashboard.addEventListener("change", () => {
        if (chkDashboard.checked) {
            chkTodas.checked = false;
            mainContent.innerHTML = dashboardHTML;
        }
    });
    chkTodas.addEventListener("change", () => {
        if (chkTodas.checked) {
            chkDashboard.checked = false;
            fetch("./pages/todasLasTareas.html")
                .then((res) => res.text())
                .then((html) => {
                mainContent.innerHTML = html;
            })
                .catch((err) => {
                mainContent.innerHTML =
                    "<p class='text-red-500'>Error cargando las tareas</p>";
                console.error(err);
            });
        }
    });
});
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    window.location.href = "./pages/login.html";
}
