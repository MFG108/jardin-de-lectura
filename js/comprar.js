//MOSTRAR
mostrarCarrito();
const formularioCompra =
    document.getElementById("formulario-compra");
if (formularioCompra) {
    formularioCompra.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre =
            document.getElementById("nombre").value;
        const email =
            document.getElementById("email").value;
        const direccion =
            document.getElementById("direccion").value;
        const ciudad =
            document.getElementById("ciudad").value;
        const entrega =
            document.getElementById("entrega").value;
        const carrito = obtenerCarrito();
        let total = 0;
        carrito.forEach(function(item) {
            const producto =
                buscarProducto(item.id, item.tipo);
            if (producto) {
                total =
                    total +
                    (producto.precio * item.cantidad);
            }
        });
        const confirmacion =
            document.getElementById("confirmacion-compra");
        formularioCompra.style.display = "none";
        confirmacion.innerHTML = `
            <div class="compra-realizada">
                <h2>¡Compra realizada!</h2>
                <p>
                    Gracias, ${nombre}, por comprar
                    en Jardín de Lectura.
                </p>
                <p>
                    Tu pedido fue registrado correctamente.
                </p>
                <h3>
                    Total: $${total}
                </h3>
                <p>
                    Te enviaremos la información del pedido
                    a ${email}.
                </p>
                <p>
                    Forma de entrega:
                    ${
                        entrega === "domicilio"
                            ? "Envío a domicilio"
                            : "Retiro en punto de entrega"
                    }
                </p>
                <a href="index.html" class="boton">
                    Volver al inicio
                </a>
            </div>
        `;
        localStorage.removeItem("carrito");
    });
}