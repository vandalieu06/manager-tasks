interface Usuari {
	nombre: string;
	apellidos: string;
	email: string;
	username: string;
	password: string;
}

window.onload = function () {
	const usuariActual = localStorage.getItem("usuariActual");
	if (usuariActual) {
		window.location.href = "index.html";
	}
};

function crearUsuario() {
	let nombre = (document.getElementById("nombre") as HTMLInputElement).value;
	let apellidos = (document.getElementById("apellidos") as HTMLInputElement)
		.value;
	let email = (document.getElementById("email") as HTMLInputElement).value;
	let username = (document.getElementById("username") as HTMLInputElement)
		.value;
	let password = (document.getElementById("password") as HTMLInputElement)
		.value;

	let error = document.getElementById("error");
	let creado = document.getElementById("cuentaCreada");

	let errors: string[] = [];

	if (!nombre) errors.push("El camp 'Nom' és obligatori.");
	if (!apellidos) errors.push("El camp 'Cognoms' és obligatori.");
	if (!email) {
		errors.push("El camp 'Correu electrònic' és obligatori.");
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		errors.push("El correu electrònic no és vàlid.");
	}
	if (!username) errors.push("El camp 'Nom d'usuari' és obligatori.");
	if (!password) errors.push("El camp 'Contrasenya' és obligatori.");
	else if (password.length < 6)
		errors.push("La contrasenya ha de tenir almenys 6 caràcters.");

	const usuarisGuardats = JSON.parse(
		localStorage.getItem("usuarisRegistrats") || "[]"
	) as Usuari[];

	const emailExisteix = usuarisGuardats.some((u) => u.email === email);
	const userExisteix = usuarisGuardats.some((u) => u.username === username);

	if (emailExisteix)
		errors.push("Ja existeix un compte amb aquest correu electrònic.");
	if (userExisteix)
		errors.push("Ja existeix un compte amb aquest nom d'usuari.");

	if (errors.length > 0) {
		if (error) error.innerHTML = errors.join("<br>");
		return;
	}

	const nouUsuari: Usuari = {
		nombre,
		apellidos,
		email,
		username,
		password,
	};

	usuarisGuardats.push(nouUsuari);
	localStorage.setItem("usuarisRegistrats", JSON.stringify(usuarisGuardats));

	if (creado) {
		creado.innerHTML = `
            Compte creada amb èxit!<br><br>
            <button type="button" onclick="window.location.href='login.html'">
                Iniciar Sessió
            </button>`;
	}
}
