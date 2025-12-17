"use strict";
// Función para obtener todas las tareas
function obtenerTareas() {
    const tasquesRaw = localStorage.getItem("tasques");
    if (!tasquesRaw)
        return [];
    try {
        const tasques = JSON.parse(tasquesRaw);
        return tasques.map((t) => (Object.assign(Object.assign({}, t), { fecha: t.fecha ? new Date(t.fecha) : undefined })));
    }
    catch (error) {
        console.error("Error al parsear tareas:", error);
        return [];
    }
}
// Función para guardar tareas
function guardarTareas(tareas) {
    localStorage.setItem("tasques", JSON.stringify(tareas));
}
// Función para crear tarea
function crearTarea(titulo, descripcion = "", categoria, estado = 1, fecha = undefined, prioridad = 1, etiquetas = []) {
    const tasques = obtenerTareas();
    const novaTarea = {
        titulo,
        descripcion,
        categoria,
        estado,
        fecha,
        prioridad,
        etiquetas,
    };
    tasques.push(novaTarea);
    guardarTareas(tasques);
}
// Función para eliminar tarea
function eliminarTarea(titulo) {
    const tasques = obtenerTareas();
    const index = tasques.findIndex((t) => t.titulo === titulo);
    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }
    const tareaEliminada = tasques.splice(index, 1)[0];
    guardarTareas(tasques);
    console.log("Tarea eliminada:", tareaEliminada);
}
// Función para actualizar tarea
function actualizarTarea(titulo, nuevoTitulo, descripcion, estado, fecha, prioridad, etiquetas) {
    const tasques = obtenerTareas();
    const index = tasques.findIndex((t) => t.titulo === titulo);
    if (index === -1) {
        console.error("No se encontró ninguna tarea con el título:", titulo);
        return;
    }
    if (nuevoTitulo !== undefined)
        tasques[index].titulo = nuevoTitulo;
    if (descripcion !== undefined)
        tasques[index].descripcion = descripcion;
    if (estado !== undefined)
        tasques[index].estado = estado;
    if (fecha !== undefined)
        tasques[index].fecha = fecha;
    if (prioridad !== undefined)
        tasques[index].prioridad = prioridad;
    if (etiquetas !== undefined)
        tasques[index].etiquetas = etiquetas;
    guardarTareas(tasques);
    console.log("Tarea actualizada:", tasques[index]);
}
// Función para obtener el color del estado
function obtenerColorEstado(estado) {
    switch (estado) {
        case 1:
            return "bg-warning"; // Pendiente - amarillo
        case 2:
            return "bg-blue-400"; // En progreso - azul
        case 3:
            return "bg-success"; // Completado - verde
        default:
            return "bg-gray-400";
    }
}
// Función para obtener el texto del estado
function obtenerTextoEstado(estado) {
    switch (estado) {
        case 1:
            return "Pendiente";
        case 2:
            return "En progreso";
        case 3:
            return "Completado";
        default:
            return "Desconocido";
    }
}
// Función para obtener el texto de prioridad
function obtenerTextoPrioridad(prioridad) {
    switch (prioridad) {
        case 3:
            return "Alta";
        case 2:
            return "Media";
        case 1:
            return "Baja";
        default:
            return "Media";
    }
}
// Función para obtener el color de prioridad
function obtenerColorPrioridad(prioridad) {
    switch (prioridad) {
        case 3:
            return "#ff6b6b"; // Rojo para alta
        case 2:
            return "#ffa500"; // Naranja para media
        case 1:
            return "#32d18a"; // Verde para baja
        default:
            return "#6d5dfb";
    }
}
// Función para renderizar una tarea
function renderizarTarea(tarea) {
    const colorEstado = obtenerColorEstado(tarea.estado);
    const textoEstado = obtenerTextoEstado(tarea.estado);
    const textoPrioridad = obtenerTextoPrioridad(tarea.prioridad);
    const colorPrioridad = obtenerColorPrioridad(tarea.prioridad);
    const etiquetasHTML = tarea.etiquetas
        .map((etiqueta) => `
		<div class="flex items-center gap-1.5">
			<i class="fas fa-tag text-[#6d5dfb] text-base"></i>
			<span class="text-neutral-dark text-xs font-normal">${etiqueta}</span>
		</div>
	`)
        .join("");
    return `
		<article class="border-2 border-primary-dark rounded p-4 flex items-start justify-between hover:bg-gray-50 transition-colors gap-4">
			<div class="flex flex-col gap-2 flex-1">
				<h3 class="text-primary-dark text-lg font-bold leading-tight">${tarea.titulo}</h3>
				<p class="text-primary-dark text-sm font-normal leading-tight">${tarea.descripcion || "Sin descripción"}</p>
				<div class="flex gap-2 items-center flex-wrap">
					<div class="flex items-center gap-1.5">
						<i class="fas fa-tag text-[#1f1f29] text-base"></i>
						<span class="text-neutral-dark text-xs font-normal">${tarea.categoria}</span>
					</div>
					<div class="flex items-center gap-1.5">
						<i class="fas fa-tag text-base" style="color: ${colorPrioridad}"></i>
						<span class="text-neutral-dark text-xs font-normal">Prioridad: ${textoPrioridad}</span>
					</div>
					${etiquetasHTML}
				</div>
			</div>
			<span class="${colorEstado} px-3 py-1.5 rounded text-xs font-semibold text-neutral-dark shrink-0">
				${textoEstado}
			</span>
		</article>
	`;
}
// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const tasques = obtenerTareas();
    const totalTareas = tasques.length;
    const tareasCompletadas = tasques.filter((t) => t.estado === 3).length;
    const tareasEnProgreso = tasques.filter((t) => t.estado === 2).length;
    // Actualizar estadísticas en el sidebar
    const statsElements = document.querySelectorAll(".bg-neutral-light.rounded.p-4");
    if (statsElements.length >= 2) {
        const totalElement = statsElements[0].querySelector(".text-primary-dark.text-base.font-normal:last-child");
        const completadasElement = statsElements[1].querySelector(".text-primary-dark.text-base.font-normal:last-child");
        if (totalElement)
            totalElement.textContent = totalTareas.toString();
        if (completadasElement)
            completadasElement.textContent = tareasCompletadas.toString();
    }
    // Actualizar cards de estadísticas
    const cards = document.querySelectorAll(".grid.grid-cols-3 .bg-gray-200");
    if (cards.length >= 3) {
        const totalCard = cards[0].querySelector(".text-primary-dark.text-\\[32px\\].font-bold");
        const progresoCard = cards[1].querySelector(".text-primary-dark.text-\\[32px\\].font-bold");
        const completadasCard = cards[2].querySelector(".text-primary-dark.text-\\[32px\\].font-bold");
        if (totalCard)
            totalCard.textContent = totalTareas.toString();
        if (progresoCard)
            progresoCard.textContent = tareasEnProgreso.toString();
        if (completadasCard)
            completadasCard.textContent = tareasCompletadas.toString();
    }
}
// Función para renderizar todas las tareas
function renderizarTareas() {
    const tasques = obtenerTareas();
    const tareasRecientesSection = document.querySelector("section.flex-1.bg-white.flex.flex-col.gap-3.overflow-auto");
    if (!tareasRecientesSection)
        return;
    // Mantener el header
    const header = tareasRecientesSection.querySelector(".border-b-2.border-primary-dark");
    // Limpiar tareas existentes
    tareasRecientesSection.innerHTML = "";
    // Volver a agregar el header
    if (header) {
        tareasRecientesSection.appendChild(header);
    }
    // Renderizar tareas (mostrar las últimas 5)
    const tareasRecientes = tasques.slice(-5).reverse();
    if (tareasRecientes.length === 0) {
        const mensajeVacio = document.createElement("div");
        mensajeVacio.className = "text-center p-8 text-gray-500";
        mensajeVacio.textContent = "No hay tareas aún. ¡Crea tu primera tarea!";
        tareasRecientesSection.appendChild(mensajeVacio);
    }
    else {
        tareasRecientes.forEach((tarea) => {
            const tareaElement = document.createElement("div");
            tareaElement.innerHTML = renderizarTarea(tarea);
            tareasRecientesSection.appendChild(tareaElement.firstElementChild);
        });
    }
    // Actualizar estadísticas
    actualizarEstadisticas();
}
// Función para cerrar sesión
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    window.location.href = "./pages/login.html";
}
// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    const usuariActual = localStorage.getItem("usuariActual");
    // Verificar si estamos en la página principal o en crear tarea
    const isMainPage = window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";
    const isCreatePage = window.location.pathname.includes("crearTarea.html");
    if (!usuariActual && !isCreatePage) {
        window.location.href = "./pages/login.html";
        return;
    }
    // Si estamos en la página principal, renderizar tareas
    if (isMainPage) {
        renderizarTareas();
    }
    // Configurar el formulario de crear tarea
    if (isCreatePage) {
        let categoriaSeleccionada = "";
        let prioridadSeleccionada = 2; // Media por defecto
        // Manejar selección de categoría
        const divBtnsCategoria = document.querySelector(".div-btns");
        if (divBtnsCategoria) {
            divBtnsCategoria.addEventListener("click", (e) => {
                var _a, _b;
                const target = e.target;
                if (target.tagName === "BUTTON" &&
                    !((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.includes("Añadir"))) {
                    // Remover selección previa
                    divBtnsCategoria.querySelectorAll("button").forEach((btn) => {
                        btn.classList.remove("bg-primary", "text-white");
                        btn.classList.add("bg-neutral-light", "text-primary-dark");
                    });
                    // Marcar como seleccionado
                    target.classList.remove("bg-neutral-light", "text-primary-dark");
                    target.classList.add("bg-primary", "text-white");
                    categoriaSeleccionada = ((_b = target.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                }
            });
        }
        // Manejar selección de prioridad
        const divBtnsPrioridad = document.querySelectorAll(".grid.grid-cols-3")[0];
        if (divBtnsPrioridad) {
            divBtnsPrioridad.addEventListener("click", (e) => {
                var _a;
                const target = e.target;
                if (target.tagName === "BUTTON") {
                    // Remover selección previa
                    divBtnsPrioridad.querySelectorAll("button").forEach((btn) => {
                        btn.classList.remove("bg-primary", "text-white");
                        btn.classList.add("bg-neutral-light", "text-primary-dark");
                    });
                    // Marcar como seleccionado
                    target.classList.remove("bg-neutral-light", "text-primary-dark");
                    target.classList.add("bg-primary", "text-white");
                    const textoPrioridad = (_a = target.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                    prioridadSeleccionada =
                        textoPrioridad === "Alta" ? 3 : textoPrioridad === "Media" ? 2 : 1;
                }
            });
        }
        // Manejar el botón de crear tarea
        const btnCreateTask = document.querySelector(".btn-create-task");
        if (btnCreateTask) {
            btnCreateTask.addEventListener("click", (e) => {
                var _a, _b, _c, _d;
                e.preventDefault();
                const nombre = (_a = document.querySelector(".form-name")) === null || _a === void 0 ? void 0 : _a.value.trim();
                const descripcion = (_b = document.querySelector(".form-description")) === null || _b === void 0 ? void 0 : _b.value.trim();
                const tagsInput = (_c = document.querySelector(".form-tags")) === null || _c === void 0 ? void 0 : _c.value.trim();
                const dateInput = (_d = document.querySelector(".form-date")) === null || _d === void 0 ? void 0 : _d.value.trim();
                // Validaciones
                if (!nombre) {
                    alert("Por favor, ingresa un nombre para la tarea");
                    return;
                }
                if (!categoriaSeleccionada) {
                    alert("Por favor, selecciona una categoría");
                    return;
                }
                // Procesar etiquetas
                const etiquetas = tagsInput
                    ? tagsInput
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag)
                    : [];
                // Procesar fecha (opcional)
                let fecha = undefined;
                if (dateInput) {
                    const [day, month, year] = dateInput.split("/");
                    if (day && month && year) {
                        fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    }
                }
                // Crear la tarea
                crearTarea(nombre, descripcion, categoriaSeleccionada, 1, fecha, prioridadSeleccionada, etiquetas);
                alert("¡Tarea creada exitosamente!");
                window.location.href = "/";
            });
        }
    }
});
