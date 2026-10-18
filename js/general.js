function actualizarEnlaceUsuario() {
    const enlaceUsuario =
        document.getElementById("enlace-usuario");
    if (!enlaceUsuario) {
        return;
    }
    const usuario =
        JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        enlaceUsuario.textContent =
            "Hola, " + usuario.nombre;
    } else {

        enlaceUsuario.textContent =
            "Mi cuenta";
    }
}
actualizarEnlaceUsuario();