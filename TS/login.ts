window.onload = function () {
    const usuariActual = localStorage.getItem("usuariActual");
    // ❌ Aquí habría que comprobar sesión/token en la base de datos o API
    if (usuariActual) {
        window.location.href = "index.html";
    }
}

function validarUsuario() {
    let user = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let error = document.getElementById("error");

    // ❌ Aquí habría que obtener los usuarios de la base de datos en vez de localStorage
    const usuarisGuardats = JSON.parse(localStorage.getItem("usuarisRegistrats") || "[]") as Usuari[];

    if (usuarisGuardats.length === 0) {
        if (error) error.innerHTML = "No hi ha cap compte registrat.";
        return;
    }

    const usuariTrobat = usuarisGuardats.find(u =>
        (u.username === user || u.email === user) && u.password === password
    );
    // ❌ Aquí habría que validar usuario y contraseña consultando la base de datos

    if (usuariTrobat) {
        // ❌ Aquí habría que generar token o sesión en base de datos/servidor
        localStorage.setItem("usuariActual", JSON.stringify(usuariTrobat));

        window.location.href = "index.html";
    } else {
        if (error) error.innerHTML = "Usuari o contrasenya incorrectes.";
    }
}
