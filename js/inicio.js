const contenedorUltimosLibros =
    document.getElementById("ultimos-libros");
const contenedorUltimosProductos =
    document.getElementById("ultimos-productos");
if (contenedorUltimosLibros) {
    const ultimosLibros =
        libros.slice(-3).reverse();
    ultimosLibros.forEach(function(libro) {
        contenedorUltimosLibros.innerHTML += `
            <article class="libro">
                <img
                    src="${libro.imagen}"
                    alt="Portada de ${libro.titulo}"
                    class="portada portada-inicio"
                >
                <h3>
                    ${libro.titulo}
                </h3>
                <p>
                    ${libro.autor}
                </p>
                <p class="precio">
                    $${libro.precio}
                </p>
                <a
                    href="detalle.html?id=${libro.id}"
                    class="boton"
                >
                    Ver detalle
                </a>
            </article>
        `;
    });
}
if (contenedorUltimosProductos) {
    const ultimosProductos =
        productos.slice(-3).reverse();
    ultimosProductos.forEach(function(producto) {
        contenedorUltimosProductos.innerHTML += `
            <article class="libro">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="portada portada-inicio"
                >
                <h3>
                    ${producto.nombre}
                </h3>
                <p>
                    ${producto.categoria}
                </p>
                <p class="precio">
                    $${producto.precio}
                </p>
                <button
                    onclick="agregarAlCarrito(
                        ${producto.id},
                        'producto'
                    )"
                >
                    Agregar al carrito
                </button>
            </article>
        `;
    });
}