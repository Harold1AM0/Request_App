const INVENTARIO_URL = "https://18-223-2-144.sslip.io/productos";
const REPORTE_URL = "https://18-223-2-144.sslip.io/ventas";

async function get(url) {

    try {

        const response = await fetch(url, {
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {

        console.error("GET:", url);
        console.error(error);

        return null;

    }

}

async function getTexto(url) {

    try {

        const response = await fetch(url, {
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.text();

    } catch (error) {

        console.error("GET:", url);
        console.error(error);

        return null;

    }

}

async function post(url, data) {

    try {

        const response = await fetch(url, {

            method: "POST",

            mode: "cors",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response;

    } catch (error) {

        console.error("POST:", url);
        console.error(error);

        alert("Error al guardar: " + error.message);

        return null;

    }

}

async function put(url, data) {

    try {

        const response = await fetch(url, {

            method: "PUT",

            mode: "cors",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response;

    } catch (error) {

        console.error("PUT:", url);
        console.error(error);

        alert("Error al actualizar: " + error.message);

        return null;

    }

}

async function eliminar(url) {

    try {

        const response = await fetch(url, {

            method: "DELETE",

            mode: "cors"

        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response;

    } catch (error) {

        console.error("DELETE:", url);
        console.error(error);

        alert("Error al eliminar: " + error.message);

        return null;

    }

}