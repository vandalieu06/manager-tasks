interface tarea {
    titulo: string;
    descripcion?: string;
    estado: number;
    fecha?: Date;
    prioridad: number;
    etiquetas: string[];
}

(window as any).abrirModal = abrirModal;

// Comprueba login 
window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    // ❌ Aquí habría que comprobar sesión/token en base de datos o API

    if (!usuariActual) {
        window.location.href = "login.html";
    }

    const tasquesRaw = localStorage.getItem("tasques");
    let tasques: tarea[] = [];

    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw) as tarea[];
        for (let i = 0; i < tasques.length; i++) {
            if (tasques[i].fecha) {
                // Convertimos la fecha de string a Date
                const fechaStr = tasques[i].fecha as unknown as string;
                tasques[i].fecha = new Date(fechaStr);
            }
        }
    }

    // ❌ Aquí habría que obtener las tareas de la base de datos en vez de localStorage
    console.log(tasques);
}

// Modal de tareas 
function abrirModal() {
    // Crear fondo modal
    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";

    // Crear ventana modal
    const modal = document.createElement("div");
    modal.id = "modalWindow";

    // Formulario
    const form = document.createElement("form");

    // Título
    const tituloLabel = document.createElement("label");
    tituloLabel.textContent = "Título:";
    const tituloInput = document.createElement("input");
    tituloInput.type = "text";
    tituloInput.required = true;

    // Descripción
    const descLabel = document.createElement("label");
    descLabel.textContent = "Descripción:";
    const descInput = document.createElement("textarea");

    // Fecha
    const fechaLabel = document.createElement("label");
    fechaLabel.textContent = "Fecha:";
    const fechaInput = document.createElement("input");
    fechaInput.type = "date";

    // Prioridad
    const prioridadLabel = document.createElement("label");
    prioridadLabel.textContent = "Prioridad:";
    const prioridadInput = document.createElement("input");
    prioridadInput.type = "number";
    prioridadInput.value = "1";
    prioridadInput.min = "1";

    // Etiquetas
    const etiquetasLabel = document.createElement("label");
    etiquetasLabel.textContent = "Etiquetas (separadas por coma):";
    const etiquetasInput = document.createElement("input");
    etiquetasInput.type = "text";

    // Botones
    const crearBtn = document.createElement("button");
    crearBtn.type = "submit";
    crearBtn.textContent = "Crear";

    const cancelarBtn = document.createElement("button");
    cancelarBtn.type = "button";
    cancelarBtn.textContent = "Cancelar";

    cancelarBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    // Añadir inputs al form
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

    // Manejar envío del formulario
    form.onsubmit = (e) => {
        e.preventDefault();

        let fechaTarea: Date | undefined = undefined;
        if (fechaInput.value) {
            fechaTarea = new Date(fechaInput.value);
        }

        let etiquetasTarea: string[] = [];
        if (etiquetasInput.value) {
            const etiquetasArray = etiquetasInput.value.split(",");
            for (let i = 0; i < etiquetasArray.length; i++) {
                etiquetasTarea.push(etiquetasArray[i].trim());
            }
        }

        crearTarea(
            tituloInput.value,
            descInput.value,
            1, // estado por defecto
            fechaTarea,
            Number(prioridadInput.value),
            etiquetasTarea
        );

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

// Crear tarea 
function crearTarea(
    titulo: string,
    descripcion?: string,
    estado: number = 1,
    fecha?: Date,
    prioridad: number = 1,
    etiquetas: string[] = []
) {
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques: tarea[] = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw) as tarea[];
    }
    // ❌ Aquí habría que insertar la tarea en la base de datos

    const novaTarea: tarea = {
        titulo,
        descripcion,
        estado,
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
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques: tarea[] = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw) as tarea[];
    }
    // ❌ Aquí habría que buscar la tarea en la base de datos

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
    estado?: number,
    fecha?: Date,
    prioridad?: number,
    etiquetas?: string[]
) {
    const tasquesRaw = localStorage.getItem("tasques");
    let tasques: tarea[] = [];
    if (tasquesRaw) {
        tasques = JSON.parse(tasquesRaw) as tarea[];
    }
    // ❌ Aquí habría que buscar la tarea en la base de datos

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
    // ❌ Aquí habría que hacer un UPDATE en la base de datos

    console.log("Tarea actualizada:", tasques[index]);
}

// Cerrar sesión
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    // ❌ Aquí habría que invalidar sesión/token en la base de datos o servidor
    window.location.href = "login.html";
}
