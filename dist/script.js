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
// Función para renderizar una tarea (dashboard)
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
			<div class="relative shrink-0">
				<button class="btn-cambiar-estado ${colorEstado} px-3 py-1.5 rounded text-xs font-semibold text-neutral-dark cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2" data-titulo="${tarea.titulo}">
					${textoEstado}
					<i class="fas fa-chevron-down text-xs"></i>
				</button>
				<div class="menu-estado hidden absolute top-full right-0 mt-1 bg-white border-2 border-primary-dark rounded shadow-lg z-10 min-w-[120px]">
					<button class="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2" data-estado="1" data-titulo="${tarea.titulo}">
						<span class="w-3 h-3 rounded-full bg-warning"></span>
						Pendiente
					</button>
					<button class="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2" data-estado="2" data-titulo="${tarea.titulo}">
						<span class="w-3 h-3 rounded-full bg-blue-400"></span>
						En progreso
					</button>
					<button class="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2" data-estado="3" data-titulo="${tarea.titulo}">
						<span class="w-3 h-3 rounded-full bg-success"></span>
						Completado
					</button>
				</div>
			</div>
		</article>
	`;
}
// Función para renderizar una tarea (página todas las tareas - más grande)
function renderizarTareaGrande(tarea) {
    const colorEstado = obtenerColorEstado(tarea.estado);
    const textoEstado = obtenerTextoEstado(tarea.estado);
    const textoPrioridad = obtenerTextoPrioridad(tarea.prioridad);
    const colorPrioridad = obtenerColorPrioridad(tarea.prioridad);
    const etiquetasHTML = tarea.etiquetas
        .map((etiqueta) => `
		<div class="flex items-center gap-1.5">
			<i class="fas fa-tag text-[#6d5dfb] text-base"></i>
			<span class="text-neutral-dark text-base font-normal">${etiqueta}</span>
		</div>
	`)
        .join("");
    return `
		<article class="bg-neutral-light border-2 border-primary-dark rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors gap-4">
			<div class="flex flex-col gap-2 flex-1">
				<h3 class="text-primary-dark text-2xl font-bold leading-tight">${tarea.titulo}</h3>
				<p class="text-primary-dark text-base font-normal leading-tight">${tarea.descripcion || "Sin descripción"}</p>
				<div class="flex gap-2 items-center flex-wrap">
					<div class="flex items-center gap-1.5">
						<i class="fas fa-tag text-[#1f1f29] text-base"></i>
						<span class="text-neutral-dark text-base font-normal">${tarea.categoria}</span>
					</div>
					<div class="flex items-center gap-1.5">
						<i class="fas fa-tag text-base" style="color: ${colorPrioridad}"></i>
						<span class="text-neutral-dark text-base font-normal">Prioridad: ${textoPrioridad}</span>
					</div>
					${etiquetasHTML}
				</div>
			</div>
			<span class="${colorEstado} px-4 py-2 text-base font-semibold text-neutral-dark shrink-0">
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
    // Actualizar estadísticas en el sidebar (dentro del aside)
    const aside = document.querySelector("aside");
    if (aside) {
        const statsContainers = aside.querySelectorAll(".bg-neutral-light.rounded.p-4");
        // El primer contenedor es "Tareas totales"
        if (statsContainers[0]) {
            const totalElement = statsContainers[0].querySelector("p:last-child");
            if (totalElement)
                totalElement.textContent = totalTareas.toString();
        }
        // El segundo contenedor es "Completadas"
        if (statsContainers[1]) {
            const completadasElement = statsContainers[1].querySelector("p:last-child");
            if (completadasElement)
                completadasElement.textContent = tareasCompletadas.toString();
        }
    }
    // Actualizar cards de estadísticas en el main
    const main = document.querySelector("main");
    if (main) {
        const cards = main.querySelectorAll(".grid.grid-cols-3 > div");
        if (cards.length >= 3) {
            const totalCard = cards[0].querySelector("p.text-\\[32px\\]");
            if (totalCard)
                totalCard.textContent = totalTareas.toString();
            const progresoCard = cards[1].querySelector("p.text-\\[32px\\]");
            if (progresoCard)
                progresoCard.textContent = tareasEnProgreso.toString();
            const completadasCard = cards[2].querySelector("p.text-\\[32px\\]");
            if (completadasCard)
                completadasCard.textContent = tareasCompletadas.toString();
        }
    }
}
// Función para contar tareas por categoría
function contarPorCategoria() {
    const tasques = obtenerTareas();
    const conteo = {};
    tasques.forEach((tarea) => {
        conteo[tarea.categoria] = (conteo[tarea.categoria] || 0) + 1;
    });
    return conteo;
}
// Función para renderizar todas las tareas (dashboard)
function renderizarTareas() {
    const tasques = obtenerTareas();
    const tareasRecientesSection = document.querySelector("section.flex-1.bg-white.flex.flex-col.gap-3.overflow-auto");
    if (!tareasRecientesSection)
        return;
    const header = tareasRecientesSection.querySelector(".border-b-2.border-primary-dark");
    tareasRecientesSection.innerHTML = "";
    if (header) {
        tareasRecientesSection.appendChild(header);
    }
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
    actualizarEstadisticas();
}
// Función para renderizar todas las tareas con filtros
function renderizarTodasLasTareas(filtros = {}) {
    let tasques = obtenerTareas();
    console.log("Tareas totales:", tasques.length);
    console.log("Filtros aplicados:", filtros);
    // Aplicar filtros
    if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        tasques = tasques.filter((t) => t.titulo.toLowerCase().includes(busqueda) ||
            (t.descripcion && t.descripcion.toLowerCase().includes(busqueda)));
    }
    if (filtros.categoria) {
        console.log("Filtrando por categoría:", filtros.categoria);
        console.log("Categorías de tareas antes del filtro:", tasques.map((t) => t.categoria));
        tasques = tasques.filter((t) => {
            console.log(`Comparando: "${t.categoria}" === "${filtros.categoria}"`, t.categoria === filtros.categoria);
            return t.categoria === filtros.categoria;
        });
        console.log("Tareas después del filtro de categoría:", tasques.length);
    }
    if (filtros.prioridad) {
        tasques = tasques.filter((t) => t.prioridad === filtros.prioridad);
    }
    if (filtros.estado) {
        tasques = tasques.filter((t) => t.estado === filtros.estado);
    }
    console.log("Tareas finales a renderizar:", tasques.length);
    // Obtener el contenedor de tareas
    const listaTareas = document.querySelector("main .flex-1.flex.flex-col.gap-\\[17px\\].overflow-y-auto");
    if (!listaTareas)
        return;
    // Limpiar tareas existentes
    listaTareas.innerHTML = "";
    // Renderizar tareas filtradas
    if (tasques.length === 0) {
        const mensajeVacio = document.createElement("div");
        mensajeVacio.className = "text-center p-8 text-gray-500 text-xl";
        mensajeVacio.textContent = "No se encontraron tareas con estos filtros.";
        listaTareas.appendChild(mensajeVacio);
    }
    else {
        tasques.forEach((tarea) => {
            const tareaElement = document.createElement("div");
            tareaElement.innerHTML = renderizarTareaGrande(tarea);
            listaTareas.appendChild(tareaElement.firstElementChild);
        });
    }
}
// Función para actualizar contadores de categorías
function actualizarContadoresCategorias() {
    const conteo = contarPorCategoria();
    const categorias = ["Frontend", "Backend", "Database"];
    const categoriasElements = document.querySelectorAll("aside:nth-child(2) .flex.flex-col.gap-4:first-child .bg-neutral-light");
    categoriasElements.forEach((el, index) => {
        if (index < categorias.length) {
            const contador = el.querySelector("span:last-child");
            if (contador) {
                const categoria = categorias[index];
                contador.textContent = (conteo[categoria] || 0).toString();
            }
        }
    });
}
// Función para cerrar sesión
function tancarSesio() {
    localStorage.removeItem("usuariActual");
    window.location.href = "./pages/login.html";
}
// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    const usuariActual = localStorage.getItem("usuariActual");
    const isMainPage = window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";
    const isCreatePage = window.location.pathname.includes("crearTarea.html");
    const isAllTasksPage = window.location.pathname.includes("todasLasTareas.html");
    if (!usuariActual && !isCreatePage) {
        window.location.href = "./pages/login.html";
        return;
    }
    // Página principal (Dashboard)
    if (isMainPage) {
        renderizarTareas();
    }
    // Página de todas las tareas
    if (isAllTasksPage) {
        const filtrosActuales = {};
        // Renderizar todas las tareas inicialmente
        renderizarTodasLasTareas();
        actualizarContadoresCategorias();
        // Búsqueda
        const barraBusqueda = document.querySelector("main .flex.gap-6 .flex-1");
        if (barraBusqueda) {
            let inputBusqueda = barraBusqueda.querySelector("input");
            if (!inputBusqueda) {
                // Crear input si no existe
                barraBusqueda.innerHTML = `
					<i class="fas fa-search text-primary-dark text-2xl"></i>
					<input type="text" placeholder="Buscar" class="flex-1 bg-transparent text-primary-dark text-2xl font-extrabold outline-none" />
				`;
                inputBusqueda = barraBusqueda.querySelector("input");
            }
            inputBusqueda === null || inputBusqueda === void 0 ? void 0 : inputBusqueda.addEventListener("input", (e) => {
                const target = e.target;
                filtrosActuales.busqueda = target.value;
                renderizarTodasLasTareas(filtrosActuales);
            });
        }
        // Filtros de categoría
        const categoriasBtns = document.querySelectorAll("aside:nth-child(2) .flex.flex-col.gap-4:first-child .bg-neutral-light");
        categoriasBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                var _a;
                // Obtener solo el texto del primer span (nombre de la categoría)
                const spanCategoria = btn.querySelector("span:first-child");
                const categoria = (_a = spanCategoria === null || spanCategoria === void 0 ? void 0 : spanCategoria.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                // Toggle categoria
                if (filtrosActuales.categoria === categoria) {
                    delete filtrosActuales.categoria;
                    btn.classList.remove("bg-primary", "text-white");
                    btn.querySelectorAll("span").forEach((s) => {
                        s.classList.remove("text-white");
                        s.classList.add("text-neutral-dark");
                    });
                }
                else {
                    // Limpiar selección previa
                    categoriasBtns.forEach((b) => {
                        b.classList.remove("bg-primary", "text-white");
                        b.querySelectorAll("span").forEach((s) => {
                            s.classList.remove("text-white");
                            s.classList.add("text-neutral-dark");
                        });
                    });
                    filtrosActuales.categoria = categoria;
                    btn.classList.add("bg-primary", "text-white");
                    btn.querySelectorAll("span").forEach((s) => {
                        s.classList.remove("text-neutral-dark");
                        s.classList.add("text-white");
                    });
                }
                console.log("Filtro categoría aplicado:", categoria);
                renderizarTodasLasTareas(filtrosActuales);
            });
        });
        // Filtros de prioridad
        const prioridadBtns = document.querySelectorAll("aside:nth-child(2) .flex.flex-col.gap-4:nth-child(2) .bg-neutral-light");
        prioridadBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                var _a, _b, _c, _d, _e;
                const prioridadTexto = (_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                const prioridad = prioridadTexto === "Alta" ? 3 : prioridadTexto === "Media" ? 2 : 1;
                // Toggle prioridad
                if (filtrosActuales.prioridad === prioridad) {
                    delete filtrosActuales.prioridad;
                    btn.classList.remove("bg-primary", "text-white");
                    (_b = btn.querySelector("span")) === null || _b === void 0 ? void 0 : _b.classList.remove("text-white");
                    (_c = btn.querySelector("span")) === null || _c === void 0 ? void 0 : _c.classList.add("text-neutral-dark");
                }
                else {
                    // Limpiar selección previa
                    prioridadBtns.forEach((b) => {
                        var _a, _b;
                        b.classList.remove("bg-primary", "text-white");
                        (_a = b.querySelector("span")) === null || _a === void 0 ? void 0 : _a.classList.remove("text-white");
                        (_b = b.querySelector("span")) === null || _b === void 0 ? void 0 : _b.classList.add("text-neutral-dark");
                    });
                    filtrosActuales.prioridad = prioridad;
                    btn.classList.add("bg-primary", "text-white");
                    (_d = btn.querySelector("span")) === null || _d === void 0 ? void 0 : _d.classList.remove("text-neutral-dark");
                    (_e = btn.querySelector("span")) === null || _e === void 0 ? void 0 : _e.classList.add("text-white");
                }
                renderizarTodasLasTareas(filtrosActuales);
            });
        });
        // Filtros de estado
        const estadoBtns = document.querySelectorAll("aside:nth-child(2) .flex.flex-col.gap-4:nth-child(3) .bg-neutral-light");
        estadoBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                var _a, _b, _c, _d, _e;
                const estadoTexto = (_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                const estado = estadoTexto === "Pendiente"
                    ? 1
                    : estadoTexto === "En progreso"
                        ? 2
                        : 3;
                // Toggle estado
                if (filtrosActuales.estado === estado) {
                    delete filtrosActuales.estado;
                    btn.classList.remove("bg-primary", "text-white");
                    (_b = btn.querySelector("span")) === null || _b === void 0 ? void 0 : _b.classList.remove("text-white");
                    (_c = btn.querySelector("span")) === null || _c === void 0 ? void 0 : _c.classList.add("text-neutral-dark");
                }
                else {
                    // Limpiar selección previa
                    estadoBtns.forEach((b) => {
                        var _a, _b;
                        b.classList.remove("bg-primary", "text-white");
                        (_a = b.querySelector("span")) === null || _a === void 0 ? void 0 : _a.classList.remove("text-white");
                        (_b = b.querySelector("span")) === null || _b === void 0 ? void 0 : _b.classList.add("text-neutral-dark");
                    });
                    filtrosActuales.estado = estado;
                    btn.classList.add("bg-primary", "text-white");
                    (_d = btn.querySelector("span")) === null || _d === void 0 ? void 0 : _d.classList.remove("text-neutral-dark");
                    (_e = btn.querySelector("span")) === null || _e === void 0 ? void 0 : _e.classList.add("text-white");
                }
                renderizarTodasLasTareas(filtrosActuales);
            });
        });
        // Botón limpiar filtros
        const btnLimpiar = document.querySelector("aside:nth-child(2) button");
        btnLimpiar === null || btnLimpiar === void 0 ? void 0 : btnLimpiar.addEventListener("click", () => {
            // Limpiar filtros
            filtrosActuales.busqueda = undefined;
            filtrosActuales.categoria = undefined;
            filtrosActuales.prioridad = undefined;
            filtrosActuales.estado = undefined;
            // Limpiar input de búsqueda
            const input = document.querySelector("main .flex.gap-6 input");
            if (input)
                input.value = "";
            // Limpiar selecciones visuales
            document
                .querySelectorAll("aside:nth-child(2) .bg-neutral-light")
                .forEach((btn) => {
                btn.classList.remove("bg-primary", "text-white");
                btn.querySelectorAll("span").forEach((s) => {
                    s.classList.remove("text-white");
                    s.classList.add("text-neutral-dark");
                });
            });
            renderizarTodasLasTareas(filtrosActuales);
        });
        // Botón crear nueva tarea
        const btnCrear = document.querySelector("main .flex.gap-6 button");
        btnCrear === null || btnCrear === void 0 ? void 0 : btnCrear.addEventListener("click", () => {
            window.location.href = "./crearTarea.html";
        });
    }
    // Actualizar estadísticas en cualquier página
    actualizarEstadisticas();
    // Configurar el formulario de crear tarea
    if (isCreatePage) {
        let categoriaSeleccionada = "";
        let prioridadSeleccionada = 2;
        const divBtnsCategoria = document.querySelector(".div-btns");
        if (divBtnsCategoria) {
            divBtnsCategoria.addEventListener("click", (e) => {
                var _a, _b;
                const target = e.target;
                if (target.tagName === "BUTTON" &&
                    !((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.includes("Añadir"))) {
                    divBtnsCategoria.querySelectorAll("button").forEach((btn) => {
                        btn.classList.remove("bg-primary", "text-white");
                        btn.classList.add("bg-neutral-light", "text-primary-dark");
                    });
                    target.classList.remove("bg-neutral-light", "text-primary-dark");
                    target.classList.add("bg-primary", "text-white");
                    categoriaSeleccionada = ((_b = target.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                }
            });
        }
        const divBtnsPrioridad = document.querySelectorAll(".grid.grid-cols-3")[0];
        if (divBtnsPrioridad) {
            divBtnsPrioridad.addEventListener("click", (e) => {
                var _a;
                const target = e.target;
                if (target.tagName === "BUTTON") {
                    divBtnsPrioridad.querySelectorAll("button").forEach((btn) => {
                        btn.classList.remove("bg-primary", "text-white");
                        btn.classList.add("bg-neutral-light", "text-primary-dark");
                    });
                    target.classList.remove("bg-neutral-light", "text-primary-dark");
                    target.classList.add("bg-primary", "text-white");
                    const textoPrioridad = (_a = target.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                    prioridadSeleccionada =
                        textoPrioridad === "Alta" ? 3 : textoPrioridad === "Media" ? 2 : 1;
                }
            });
        }
        const btnCreateTask = document.querySelector(".btn-create-task");
        if (btnCreateTask) {
            btnCreateTask.addEventListener("click", (e) => {
                var _a, _b, _c, _d;
                e.preventDefault();
                const nombre = (_a = document.querySelector(".form-name")) === null || _a === void 0 ? void 0 : _a.value.trim();
                const descripcion = (_b = document.querySelector(".form-description")) === null || _b === void 0 ? void 0 : _b.value.trim();
                const tagsInput = (_c = document.querySelector(".form-tags")) === null || _c === void 0 ? void 0 : _c.value.trim();
                const dateInput = (_d = document.querySelector(".form-date")) === null || _d === void 0 ? void 0 : _d.value.trim();
                if (!nombre) {
                    alert("Por favor, ingresa un nombre para la tarea");
                    return;
                }
                if (!categoriaSeleccionada) {
                    alert("Por favor, selecciona una categoría");
                    return;
                }
                const etiquetas = tagsInput
                    ? tagsInput
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag)
                    : [];
                let fecha = undefined;
                if (dateInput) {
                    const [day, month, year] = dateInput.split("/");
                    if (day && month && year) {
                        fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    }
                }
                crearTarea(nombre, descripcion, categoriaSeleccionada, 1, fecha, prioridadSeleccionada, etiquetas);
                alert("¡Tarea creada exitosamente!");
                window.location.href = "/";
            });
        }
    }
});
