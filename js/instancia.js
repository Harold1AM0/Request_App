
// CONSULTAR INSTANCIA (POD)

async function consultarInstancia() {

    const instancia = await getTexto(INVENTARIO_URL + "/instancia");

    const consola = document.getElementById("consola");

    const fecha = new Date().toLocaleTimeString();

    // getTexto() ya atrapa sus propios errores y devuelve null en ese caso,
    // así que hay que revisarlo explícitamente (antes esto imprimía "null"
    // en la consola sin avisar que algo había fallado).
    if (instancia === null) {

        consola.value += "[" + fecha + "] ERROR: no se pudo consultar la instancia\n";

    } else {

        consola.value += "[" + fecha + "] " + instancia + "\n";

    }

    // Hace scroll automáticamente hacia abajo
    consola.scrollTop = consola.scrollHeight;

}


// LIMPIAR CONSOLA

function limpiarConsola() {

    document.getElementById("consola").value = "";

}