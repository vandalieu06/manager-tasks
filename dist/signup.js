"use strict";
window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    // ❌ Aquí habría que comprobar sesión/token en la base de datos o API
    if (usuariActual) {
        window.location.href = "index.html";
    }
};
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
        errors.push("El camp 'Nom' és obligatori.");
    if (!apellidos)
        errors.push("El camp 'Cognoms' és obligatori.");
    if (!email) {
        errors.push("El camp 'Correu electrònic' és obligatori.");
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("El correu electrònic no és vàlid.");
    }
    if (!username)
        errors.push("El camp 'Nom d'usuari' és obligatori.");
    if (!password)
        errors.push("El camp 'Contrasenya' és obligatori.");
    else if (password.length < 6)
        errors.push("La contrasenya ha de tenir almenys 6 caràcters.");
    // ❌ Aquí habría que obtener los usuarios de la base de datos en vez de localStorage
    const usuarisGuardats = JSON.parse(localStorage.getItem("usuarisRegistrats") || "[]");
    const emailExisteix = usuarisGuardats.some(u => u.email === email);
    const userExisteix = usuarisGuardats.some(u => u.username === username);
    if (emailExisteix)
        errors.push("Ja existeix un compte amb aquest correu electrònic.");
    if (userExisteix)
        errors.push("Ja existeix un compte amb aquest nom d'usuari.");
    if (errors.length > 0) {
        if (error)
            error.innerHTML = errors.join("<br>");
        return;
    }
    const nouUsuari = {
        nombre,
        apellidos,
        email,
        username,
        password
    };
    // ❌ Aquí habría que insertar el nuevo usuario en la base de datos en vez de localStorage
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
