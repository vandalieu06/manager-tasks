"use strict";
window.onload = () => {
    const usuariActual = localStorage.getItem("usuariActual");
    if (usuariActual) {
        window.location.href = "../index.html";
    }
    console.log("hola mundo");
};
function crearUsuario() {
    console.log("Crear Usuario");
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos")
        .value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username")
        .value;
    const password = document.getElementById("password")
        .value;
    const error = document.getElementById("error");
    const creado = document.getElementById("cuentaCreada");
    const errors = [];
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
    const usuarisGuardats = JSON.parse(localStorage.getItem("usuarisRegistrats") || "[]");
    const emailExisteix = usuarisGuardats.some((u) => u.email === email);
    const userExisteix = usuarisGuardats.some((u) => u.username === username);
    if (emailExisteix)
        errors.push("Ja existeix un compte amb aquest correu electrònic.");
    if (userExisteix)
        errors.push("Ja existeix un compte amb aquest nom d'usuari.");
    if (errors.length > 0) {
        if (error) {
            error.innerHTML = errors.join("<br>");
            error.classList.remove("hidden");
        }
        if (creado)
            creado.classList.add("hidden");
        return;
    }
    const nouUsuari = {
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
		Compte creada amb èxit!`;
        creado.classList.remove("hidden");
        window.location.href = "../index.html";
    }
    if (error)
        error.classList.add("hidden");
}
const btnCreateUser = document.querySelector(".btn-create-user");
btnCreateUser === null || btnCreateUser === void 0 ? void 0 : btnCreateUser.addEventListener("click", crearUsuario);
