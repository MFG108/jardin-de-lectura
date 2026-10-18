//ESTANTE DE PRODUCTOS
const productos = [
    {
        id: 101,
        nombre: "Señalador literario",
        precio: 3500,
        categoria: "Accesorios",
        imagen: "img/productos/señalador.jpg"
    },
    {
        id: 102,
        nombre: "Tote bag literaria",
        precio: 12000,
        categoria: "Accesorios",
        imagen: "img/productos/Totebag-Literaria.jpg"
    },
    {
        id: 103,
        nombre: "Libreta de lectura",
        precio: 8000,
        categoria: "Papelería",
        imagen: "img/productos/Libreta-Literaria.jpg"
    },
    {
        id: 104,
        nombre: "Vela literaria",
        precio: 9500,
        categoria: "Decoración",
        imagen: "img/productos/Vela-Literaria.jpg"
    }
];
//MOSTRAR
const contenedorProductos =
    document.getElementById("contenedor-productos");
const buscadorProductos =
    document.getElementById("buscador-productos");
const filtroProductoCategoria =
    document.getElementById("filtro-producto-categoria");
function mostrarProductos(listaProductos) {
    if (!contenedorProductos) {
        return;
    }
    contenedorProductos.innerHTML = "";
    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = `
            <p>
                No encontramos productos que coincidan
                con tu búsqueda.
            </p>
        `;
        return;
    }
    listaProductos.forEach(function(producto) {
        contenedorProductos.innerHTML += `
            <article class="libro">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="portada"
                >
                <h3>${producto.nombre}</h3>
                <p>${producto.categoria}</p>
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
//FILTROS
function filtrarProductos() {
    const texto =
        buscadorProductos.value.toLowerCase();
    const categoria =
        filtroProductoCategoria.value;
    const productosFiltrados =
        productos.filter(function(producto) {
            const coincideTexto =
                producto.nombre
                    .toLowerCase()
                    .includes(texto);
            const coincideCategoria =
                categoria === "todas" ||
                producto.categoria === categoria;
            return coincideTexto &&
                   coincideCategoria;
        });
    mostrarProductos(productosFiltrados);
}
if (buscadorProductos) {
    buscadorProductos.addEventListener(
        "input",
        filtrarProductos
    );
}
if (filtroProductoCategoria) {
    filtroProductoCategoria.addEventListener(
        "change",
        filtrarProductos
    );
}
mostrarProductos(productos);