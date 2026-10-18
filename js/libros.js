//CATALOGO
const contenedorLibros =
    document.getElementById("contenedor-libros");
const buscadorLibros =
    document.getElementById("buscador-libros");
const filtroCategoria =
    document.getElementById("filtro-categoria");
function mostrarLibros(listaLibros) {
    if (!contenedorLibros) {
        return;
    }
    contenedorLibros.innerHTML = "";
    if (listaLibros.length === 0) {
        contenedorLibros.innerHTML = `
            <p>
                No encontramos libros que coincidan
                con tu búsqueda.
            </p>
        `;
        return;
    }
    listaLibros.forEach(function(libro) {
        contenedorLibros.innerHTML += `
            <article class="libro">
                <img
                    src="${libro.imagen}"
                    alt="Portada de ${libro.titulo}"
                    class="portada"
                >
                <h3>
                    ${libro.titulo}
                </h3>
                <p>
                    ${libro.autor}
                </p>
                <p>
                    ${libro.categoria}
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
                <button
                    onclick="agregarAlCarrito(
                        ${libro.id},
                        'libro'
                    )"
                >
                    Agregar al carrito
                </button>
            </article>
        `;
    });
}
function filtrarLibros() {
    const texto =
        buscadorLibros.value.toLowerCase();
    const categoria =
        filtroCategoria.value;
    const librosFiltrados =
        libros.filter(function(libro) {
            const coincideTexto =
                libro.titulo
                    .toLowerCase()
                    .includes(texto)
                ||
                libro.autor
                    .toLowerCase()
                    .includes(texto);
            const coincideCategoria =
                categoria === "todas" ||
                libro.categoria === categoria;
            return coincideTexto &&
                   coincideCategoria;
        });
    mostrarLibros(librosFiltrados);
}
if (buscadorLibros) {
    buscadorLibros.addEventListener(
        "input",
        filtrarLibros
    );
}
if (filtroCategoria) {

    filtroCategoria.addEventListener(
        "change",
        filtrarLibros
    );
}
mostrarLibros(libros);
//DETALLES LIBROS
const detalleLibro = document.getElementById("detalle-libro");
if (detalleLibro) {
    const parametros = new URLSearchParams(window.location.search);
    const idLibro = Number(parametros.get("id"));
    const libroEncontrado = libros.find(function(libro) {
        return libro.id === idLibro;
    });
    if (libroEncontrado) {
        detalleLibro.innerHTML = `
            <img
                src="${libroEncontrado.imagen}"
                alt="Portada de ${libroEncontrado.titulo}"
                class="portada-detalle"
            >
            <div class="informacion-libro">
                <h2>${libroEncontrado.titulo}</h2>
                <h3>${libroEncontrado.autor}</h3>
                <p>
                    Categoría: ${libroEncontrado.categoria}
                </p>
                <p class="descripcion-detalle">
                    ${libroEncontrado.descripcion}
                </p>
                <p class="precio">
                    $${libroEncontrado.precio}
                </p>
                <button
                    onclick="agregarAlCarrito(
                        ${libroEncontrado.id},
                        'libro'
                    )"
                >
                    Agregar al carrito
                </button>
            </div>
        `;
    }
}