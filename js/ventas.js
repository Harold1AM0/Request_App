// LISTAR VENTAS

async function listarVentas() {

    const ventas = await get(REPORTE_URL);

    if (!ventas) return;

    const tbody = document.querySelector("#tablaVentas tbody");

    tbody.innerHTML = "";

    ventas.forEach(venta => {

        tbody.innerHTML += `

        <tr>

            <td>${venta.id}</td>

            <td>${venta.productoId}</td>

            <td>${venta.cantidad}</td>

            <td>${venta.fecha}</td>

        </tr>

        `;

    });

}


// REGISTRAR VENTA

async function registrarVenta() {

    const productoId = Number(document.getElementById("productoId").value);
    const cantidad = Number(document.getElementById("cantidad").value);

    if (isNaN(productoId) || productoId <= 0) {
        alert("Ingresa un ID de producto válido.");
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Ingresa una cantidad válida mayor a 0.");
        return;
    }

    const venta = { productoId, cantidad };

    try {

        // Corregido: antes apuntaba a INVENTARIO_URL + "/ventas", que es el
        // microservicio equivocado (el de productos, puerto 30080).
        // Ahora usa REPORTE_URL, el microservicio de ventas (puerto 30081).
        const response = await fetch(REPORTE_URL, {

            method: "POST",

            mode: "cors",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(venta)

        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const mensaje = await response.text();

        alert(mensaje);

        document.getElementById("productoId").value = "";
        document.getElementById("cantidad").value = "";

        listarProductos();

        listarVentas();

    }

    catch(error){

        console.error(error);

        alert("No se pudo registrar la venta: " + error.message);

    }

}