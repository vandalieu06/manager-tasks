interface usuari {
    nombre: string;
    apellidos: string;
    email: string;
    username: string;
    password: string;
}

function crearUsuario() {
    
    let nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    let apellidos = (document.getElementById("apellidos") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let username = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

    let error = document.getElementById("error");
    let creado = document.getElementById("cuentaCreada");

    let errors: string[] = [];

    if (!nombre) errors.push("El camp 'Nombre' és obligatori.");
    if (!apellidos) errors.push("El camp 'Apellidos' és obligatori.");
    if (!email) {
        errors.push("El camp 'Correo electrónico' és obligatori.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("El correu electrònic no és vàlid.");
    }
    if (!username) errors.push("El camp 'Nombre de usuario' és obligatori.");
    if (!password) errors.push("El camp 'Contraseña' és obligatori.");
    else if (password.length < 6) errors.push("La contrasenya ha de tenir almenys 6 caràcters.");

    if (errors.length > 0) {
        if (error) {
            error.innerHTML = errors.join("<br>");
        }
        return;
    }
}