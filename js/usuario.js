const formularioRegistro =
    document.getElementById("formulario-registro");
const registro =
    document.getElementById("registro");
const sesion =
    document.getElementById("sesion");
const datosUsuario =
    document.getElementById("datos-usuario");
const mensajeRegistro =
    document.getElementById("mensaje-registro");
const botonCerrarSesion =
    document.getElementById("cerrar-sesion");
function mostrarUsuario() {
    const usuario =
        JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        registro.style.display = "none";
        sesion.style.display = "block";
        datosUsuario.innerHTML = `
            <p>
                <strong>
                    Nombre:
                </strong>
                ${usuario.nombre}
                ${usuario.apellido}
            </p>
            <p>
                <strong>
                    Email:
                </strong>
                ${usuario.email}
            </p>
        `;
    } else {
        registro.style.display = "block";
        sesion.style.display = "none";
    }
}
formularioRegistro.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        const nombre =
            document.getElementById(
                "nombre-usuario"
            ).value;
        const apellido =
            document.getElementById(
                "apellido-usuario"
            ).value;
        const email =
            document.getElementById(
                "email-usuario"
            ).value;
        const password =
            document.getElementById(
                "password-usuario"
            ).value;
        const confirmarPassword =
            document.getElementById(
                "confirmar-password"
            ).value;
        if (password !== confirmarPassword) {
            mensajeRegistro.textContent =
                "Las contraseñas no coinciden.";
            return;
        }
        const usuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        };
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );
        mensajeRegistro.textContent =
            "Cuenta creada correctamente.";
        formularioRegistro.reset();
        mostrarUsuario();
    }
);
botonCerrarSesion.addEventListener(
    "click",
    function() {
        localStorage.removeItem("usuario");
        mostrarUsuario();
    }
);
mostrarUsuario();