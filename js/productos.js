// LISTAR PRODUCTOS

async function listarProductos() {

    const productos = await get(INVENTARIO_URL);

    if (!productos) return;

    const tbody = document.querySelector("#tablaProductos tbody");

    tbody.innerHTML = "";

    productos.forEach(producto => {

        const fila = document.createElement("tr");

        fila.innerHTML = `

            <td>${producto.id}</td>

            <td>${producto.nombre}</td>

            <td>S/. ${producto.precio}</td>

            <td>${producto.stock}</td>

            <td>

                <button class="btnEditar">Editar</button>

                <button class="btnEliminar">Eliminar</button>

            </td>

        `;

        // Se usan listeners en vez de onclick con datos interpolados,
        // así evitamos romper el HTML si el nombre trae comillas (ej: O'Higgins)
        fila.querySelector(".btnEditar").addEventListener("click", () => {
            cargarProducto(producto.id, producto.nombre, producto.precio, producto.stock);
        });

        fila.querySelector(".btnEliminar").addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        tbody.appendChild(fila);

    });

}


// GUARDAR PRODUCTO

async function guardarProducto() {

    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);

    if (!nombre) {
        alert("El nombre del producto es obligatorio.");
        return;
    }

    if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser un número válido mayor o igual a 0.");
        return;
    }

    if (isNaN(stock) || stock < 0) {
        alert("El stock debe ser un número válido mayor o igual a 0.");
        return;
    }

    const producto = { nombre, precio, stock };

    await post(INVENTARIO_URL, producto);

    limpiarFormulario();

    listarProductos();

}


// CARGAR PRODUCTO PARA EDITAR

function cargarProducto(id, nombre, precio, stock) {

    document.getElementById("editarId").value = id;

    document.getElementById("editarNombre").value = nombre;

    document.getElementById("editarPrecio").value = precio;

    document.getElementById("editarStock").value = stock;

}


// ACTUALIZAR PRODUCTO

async function actualizarProducto() {

    const id = document.getElementById("editarId").value;

    const nombre = document.getElementById("editarNombre").value.trim();
    const precio = Number(document.getElementById("editarPrecio").value);
    const stock = Number(document.getElementById("editarStock").value);

    if (!id) {
        alert("Debes indicar el ID del producto a actualizar.");
        return;
    }

    if (!nombre) {
        alert("El nombre del producto es obligatorio.");
        return;
    }

    if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser un número válido mayor o igual a 0.");
        return;
    }

    if (isNaN(stock) || stock < 0) {
        alert("El stock debe ser un número válido mayor o igual a 0.");
        return;
    }

    const producto = { nombre, precio, stock };

    await put(INVENTARIO_URL + "/" + id, producto);

    listarProductos();

}


// ELIMINAR PRODUCTO

async function eliminarProducto(id) {

    const confirmar = confirm("¿Eliminar producto?");

    if (!confirmar) return;

    await eliminar(INVENTARIO_URL + "/" + id);

    listarProductos();

}


// LIMPIAR FORMULARIO

function limpiarFormulario() {

    document.getElementById("nombre").value = "";

    document.getElementById("precio").value = "";

    document.getElementById("stock").value = "";

}