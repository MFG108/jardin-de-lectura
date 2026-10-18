const formularioContacto =
    document.getElementById("formulario-contacto");
formularioContacto.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        const nombre =
            document.getElementById(
                "nombre-contacto"
            ).value;
        const mensajeEnviado =
            document.getElementById(
                "mensaje-enviado"
            );
        formularioContacto.reset();
        mensajeEnviado.innerHTML = `
            <div class="mensaje-contacto">
                <h3>¡Mensaje enviado!</h3>
                <p>
                    Gracias, ${nombre}.
                    Recibimos tu consulta correctamente.
                </p>
                <p>
                    Te responderemos a la brevedad.
                </p>
            </div>
        `;
    }
);