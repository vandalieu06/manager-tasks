"use strict";
function crearUsuario() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");
    let creado = document.getElementById("cuentaCreada");
    let errors = [];
    if (!nombre)
        errors.push("El camp 'Nombre' és obligatori.");
    if (!apellidos)
        errors.push("El camp 'Apellidos' és obligatori.");
    if (!email) {
        errors.push("El camp 'Correo electrónico' és obligatori.");
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("El correu electrònic no és vàlid.");
    }
    if (!username)
        errors.push("El camp 'Nombre de usuario' és obligatori.");
    if (!password)
        errors.push("El camp 'Contraseña' és obligatori.");
    else if (password.length < 6)
        errors.push("La contrasenya ha de tenir almenys 6 caràcters.");
    if (errors.length > 0) {
        if (error) {
            error.innerHTML = errors.join("<br>");
        }
        return;
    }
}
