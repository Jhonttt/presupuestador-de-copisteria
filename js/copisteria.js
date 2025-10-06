"use strict";
// Funcion principal
function main() {
    menu();
}

// parámentros (constantes)
const IVA = 0.21;                  // 21%
const PRECIO_BN_A4 = 0.05;         // €/pág B/N (A4)
const PRECIO_COLOR_A4 = 0.20;      // €/pág Color (A4)
const RECARGO_A3_FACTOR = 1.5;     // A3 = A4 × 1.5
const FACTOR_DOBLE_CARA = 0.9;     // Doble cara = × 0.9
const PRECIO_ENCUADERNACION = 3.00;// € por encuadernación
const RECARGO_URGENCIA = 0.15;     // +15% (si urgente)
const UMBRAL1 = 30, DTO1 = 0.05;   // ≥30€ → 5%
const UMBRAL2 = 60, DTO2 = 0.10;   // ≥60€ → 10%
// variables
var size, dobleCara, numEncuader;

// Funciones para validar los tipos de datos:
// Función para validar si se introduce un número o si no se introduce un número.
function validarNumeros(cant) {
    const cantidad = Number(cant);
    if (Number.isNaN(cantidad) || cantidad < 0 || cantidad > 500) {
        alert("Introduce un número válido (>= 0) o (<= 500).");
        console.error("Error, debe ser un número, y tiene que ser mayor o igual a 0 y menor o igual a 500.");
        return false;
    }
    console.log("Se ha ejecutado la función Validar Números.");
    return true;
}

// Función para validar el si o el no (Doble Cara, Urgencia)
function validarRespuesta(resp) {
    const respuesta = String(resp).toLowerCase().trim();
    if (respuesta !== 'si' && respuesta !== 'no') {
        alert('Introduce únicamente las opciones "Si" o "No".');
        console.error('Error valores diferentes a "Si" y "No".');
        return null;
    }
    
    console.log("Se ha ejecutado la función Validar Respuesta.");
    return respuesta == "si";
}

// Función para validar si el tamanio es A4 o es A3
function validarSize(size) {
    const respuesta = String(size).toLowerCase().trim();
    if (respuesta !== 'a4' && respuesta !== 'a3') {
        alert('Introduce únicamente las opciones "A4" o "A3".');
        console.error('Error valores diferentes a "A4" y "A3".');
        return false;
    }
    console.log("Se ha ejecutado la función Validar Tamaño.");
    return true;
}

// Función para validar si existe al menos 1 copia a B/N o a Color
function validarPaginas(blancoYNegro, color) {
    console.log("Se ha ejecutado la función Validar Páginas.");
    if (blancoYNegro == 0) {
        return true;
    } else if (color == 0) {
        return false;
    } else if (blancoYNegro > 0 && color > 0) {
        return null;
    }
}

// Funciones para pedir datos
// Función para pedir el tipo de tamaño de copia
function pedirSize(tipo) {
    do {
        size = prompt(`Introduce el tamaño de las páginas${tipo} (A4/A3):`);
    } while (!validarSize(size));
    console.log("Se ha ejecutado la función Pedir Size.");
    return size.toLowerCase();
}

// Funcion para que el usuario indique si quiere las copias doble cara
function pedirDobleCara(tipo, pag) {
    if (pag < 2) {
        alert("Debe de haber mínimo 2 copias para hacerlas doble cara.");
    } else {
        do {
            dobleCara = prompt(`¿Quieres de doble cara${tipo}?:`);
        } while (validarRespuesta(dobleCara) == null);
        console.log("Se ha ejecutado la función Pedir Doble Cara.");
        return dobleCara = validarRespuesta(dobleCara);
    }
}

// Funcion para pedir la cantidad de encuadernaciones
function pedirEncuadernacion(tipo, dobleCara, numPaginas) {
    numPaginas = Number(numPaginas);

    // Calculamos el mínimo de páginas por encuadernación según si es doble cara o no (Operador Ternario)
    let numMinimoPag = dobleCara ? 10 : 5;

    // Calculamos el máximo de encuadernaciones posibles
    let numMaxEncuader = Math.trunc(numPaginas / numMinimoPag);

    if (numMaxEncuader === 0) {
        console.log(`No hay suficientes páginas para ninguna encuadernación${tipo}.`);
        alert(`No hay suficientes páginas para ninguna encuadernación${tipo}.`);
        return 0; 
    }

    let numEncuader;
    do {
        // Mostramos el máximo permitido
        numEncuader = prompt(`Introduce el número de encuadernaciones${tipo} que deseas (máx ${numMaxEncuader}):`);
    } while (!validarNumeros(numEncuader) || Number(numEncuader) > numMaxEncuader);
    console.log(`Validación correcta: ${numEncuader} encuadernaciones${tipo} (máx: ${numMaxEncuader})`);
    return Number(numEncuader);
}

// Menu
function menu() {
    let pagBN, pagC, urgencia, flag, total;
    do {
        do {
            pagBN = prompt("Introduce las páginas en blanco y negro que desees:");
        } while (!validarNumeros(pagBN));
        pagBN = Number(pagBN);   // Almacenamos el valor

        do {
            pagC = prompt("Introduce las páginas en color:");
        } while (!validarNumeros(pagC));
        pagC = Number(pagC);

        flag = validarPaginas(pagBN, pagC);

        if (pagBN == 0 && pagC == 0) alert("Introduce páginas de un tipo.");
    } while (pagBN == 0 && pagC == 0);

    switch (flag) {
        case true:
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagC);
            numEncuader = pedirEncuadernacion("", dobleCara, pagC);
            break;
        case false:
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagBN);
            numEncuader = pedirEncuadernacion("", dobleCara, pagBN);
            break;
        case null:
            var sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderC, numEncuaderBN;
            sizeBN = pedirSize(" blanco y negro");
            sizeC = pedirSize(" a color");
            dobleCaraBN = pedirDobleCara(" las páginas en blanco y negro", pagBN);
            dobleCaraC = pedirDobleCara(" las páginas a color", pagC);
            numEncuaderBN = pedirEncuadernacion(" de las páginas a blanco y negro", dobleCaraBN, pagBN);
            numEncuaderC = pedirEncuadernacion(" de las páginas a color", dobleCaraC, pagC);
            break;
        default:
            alert("Opción no contemplada.");
            console.error("Opción no válidada.");
            break;
    }

    do {
        urgencia = prompt("¿Es urgente?:");
    } while (validarRespuesta(urgencia) == null);
    urgencia = validarRespuesta(urgencia);

    if (flag === null) total = calcular2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia);
    else total = calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag);

    console.log(`Precio total: ${total}`);
}
    
// Calculos
function calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag) {
    let precio = 0;
    
    switch (flag) {
        case true:
            precio = precioPagC(pagC, size);
            console.log("Precio pag Color" + precio);
            break;
        case false:
            precio = precioPagBN(pagBN, size);
            console.log("Precio pag BN" + precio);
            break;
        default:
            alert("Opción no contemplada.");
            console.log("Opción no válidada.");
            break;
    }

    if (dobleCara) precio = calcularDobleCara(precio);
    console.log("Precio Doble cara" + precio);
    if (numEncuader != 0) precio += calcularEncuadernar(numEncuader);
    console.log("Precio Num encuader" + precio);
    if (precio >= (UMBRAL1 * 100)) precio = calcularDescuento(precio);
    console.log("Precio descuento" + precio);
    if (urgencia) precio = calcularUrgencia(precio);
    console.log("Precio urgencia" + precio);
    console.log("Se ha ejecutado la función Calcular.");
    return precio + (precio * IVA);
}

function calcular2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia) {
    let precioBN = 0;
    let precioC = 0;
    let precioTotal = 0;

    precioBN = precioPagBN(pagBN, sizeBN);
    precioC = precioPagC(pagC, sizeC);

    if (dobleCaraBN) precioBN = calcularDobleCara(precioBN);
    if (dobleCaraC) precioC = calcularDobleCara(precioC);

    if (numEncuaderBN != 0) precioBN += calcularEncuadernar(numEncuaderBN);
    if (numEncuaderC != 0) precioC += calcularEncuadernar(numEncuaderC);

    precioTotal = precioBN + precioC;

    if (precioTotal >= (UMBRAL1 * 100)) precioTotal = descuento(precioTotal);

    if (urgencia) precioTotal = calcularUrgencia(precioTotal);

    console.log("Se ha ejecutado la función Calcular.");

    return precioTotal + (precioTotal * IVA);
}
        
// Funciones de calculos.
function precioPagBN(numPag, size) {
    const a4BN = numPag * (PRECIO_BN_A4 * 100);
    const mensaje = "Se ha ejecutado la función Precio Pag BN.";
    
    if (size == "a4") {
        console.log(mensaje);
        return a4BN;
    } else if (size == "a3") {
        console.log(mensaje);
        return a4BN * RECARGO_A3_FACTOR;
    }
    
    alert("Opción no contemplada.");
    console.error("Opción no válidada en la función Precio Pag BN.");
}

function precioPagC(numPag, size) {
    const a4C = numPag * (PRECIO_COLOR_A4 * 100);
    const mensaje = "Se ha ejecutado la función Precio Pag C.";
    
    if (size == "a4") {
        console.log(mensaje);
        return a4C;
    } else if (size == "a3") {
        console.log(mensaje);
        return a4C * RECARGO_A3_FACTOR;
    }
    
    alert("Opción no contemplada.");
    console.error("Opción no válidada en la función Precio Pag C.");
}

function calcularDobleCara(precio) {
    console.log("Se ha ejecutado la función Calcular Doble Cara.");
    return precio * FACTOR_DOBLE_CARA;
}

function calcularEncuadernar(unidades) {
    console.log("Se ha ejecutado la función Calcular Encuadernar.");
    return unidades * PRECIO_ENCUADERNACION;
}

function calcularDescuento(precio) {
    console.log("Se ha ejecutado la función Calcular Descuento.");
    if (precio >= (UMBRAL1 * 100) && precio < (UMBRAL2 * 100)) {
        return precio - (precio * DTO1);
    }
    return precio - (precio * DTO2);
}

function calcularUrgencia(precio) {
    console.log("Se ha ejecutado la función Calcular Urgencia.");
    return precio + (precio * RECARGO_URGENCIA);
}

/* Comprobación mínima:
- Probar al menos un caso sin descuento ni urgencia.
- Probar al menos un caso con descuento y con urgencia, verificando que el orden indicado modifica el resultado. */
main();