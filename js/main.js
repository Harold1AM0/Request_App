// INICIO DE LA APLICACIÓN

window.onload = function () {

    listarProductos();

    listarVentas();

};


// RECARGAR AUTOMÁTICAMENTE CADA 15 SEGUNDOS
// (Opcional, pero útil para la demostración)

setInterval(() => {

    listarProductos();

    listarVentas();

}, 15000);