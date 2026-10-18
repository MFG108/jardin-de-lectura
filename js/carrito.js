function obtenerCarrito() {
    const datos =
        JSON.parse(localStorage.getItem("carrito")) || [];
    const carrito = [];
    datos.forEach(function(item) {
        const cantidad = item.cantidad || 1;
        const productoExistente = carrito.find(function(producto) {
            return producto.id === item.id &&
                   producto.tipo === item.tipo;
        });
        if (productoExistente) {
            productoExistente.cantidad =
                productoExistente.cantidad + cantidad;
        } else {
            carrito.push({
                id: item.id,
                tipo: item.tipo || "libro",
                cantidad: cantidad
            });
        }
    });
    return carrito;
}
function guardarCarrito(carrito) {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
function agregarAlCarrito(id, tipo) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(function(item) {
        return item.id === id &&
               item.tipo === tipo;
    });
    if (productoExistente) {
        productoExistente.cantidad =
            productoExistente.cantidad + 1;

    } else {
        carrito.push({
            id: id,
            tipo: tipo,
            cantidad: 1
        });
    }
    guardarCarrito(carrito);
    alert("Producto agregado al carrito");
}
function buscarProducto(id, tipo) {
    if (tipo === "libro") {
        return libros.find(function(libro) {
            return libro.id === id;
        });
    }
    if (tipo === "producto") {
        return productos.find(function(producto) {
            return producto.id === id;
        });
    }
    return null;
}
function mostrarCarrito() {
    const contenidoCarrito =
        document.getElementById("contenido-carrito");
    if (!contenidoCarrito) {
        return;
    }
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;
        return;
    }
    let total = 0;
    contenidoCarrito.innerHTML = "";
    carrito.forEach(function(item) {
        const producto =
            buscarProducto(item.id, item.tipo);
        if (!producto) {
            return;
        }
        const subtotal =
            producto.precio * item.cantidad;
        total = total + subtotal;
        const nombre =
            item.tipo === "libro"
                ? producto.titulo
                : producto.nombre;
        const informacion =
            item.tipo === "libro"
                ? producto.autor
                : producto.categoria;
        contenidoCarrito.innerHTML += `
            <div class="producto-carrito">
                <img
                    src="${producto.imagen}"
                    alt="${nombre}"
                >
                <div>
                    <h3>${nombre}</h3>
                    <p>${informacion}</p>
                    <p>
                        Precio unitario:
                        $${producto.precio}
                    </p>
                    <p>
                        Subtotal:
                        $${subtotal}
                    </p>
                    <button
                        onclick="cambiarCantidad(
                            ${producto.id},
                            '${item.tipo}',
                            -1
                        )"
                    >
                        −
                    </button>
                    <span>${item.cantidad}</span>
                    <button
                        onclick="cambiarCantidad(
                            ${producto.id},
                            '${item.tipo}',
                            1
                        )"
                    >
                        +
                    </button>
                    <button
                        onclick="eliminarDelCarrito(
                            ${producto.id},
                            '${item.tipo}'
                        )"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });
    contenidoCarrito.innerHTML += `
        <div class="total-carrito">
            <h2>Total: $${total}</h2>
            <a href="compra.html" class="boton">
                Continuar con la compra
            </a>
        </div>
    `;
}
function cambiarCantidad(id, tipo, cambio) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(function(item) {
        return item.id === id &&
               item.tipo === tipo;
    });
    if (!producto) {
        return;
    }
    producto.cantidad =
        producto.cantidad + cambio;
    if (producto.cantidad <= 0) {
        const posicion =
            carrito.indexOf(producto);

        carrito.splice(posicion, 1);
    }
    guardarCarrito(carrito);
    mostrarCarrito();
}
function eliminarDelCarrito(id, tipo) {
    const carrito = obtenerCarrito();
    const carritoNuevo =
        carrito.filter(function(item) {
            return !(
                item.id === id &&
                item.tipo === tipo
            );
        });
    guardarCarrito(carritoNuevo);
    mostrarCarrito();
}
mostrarCarrito();