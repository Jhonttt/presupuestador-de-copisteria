"use strict"; 
// 1 error?, no hace falta validar para encuadernar, pedir encuadernación ternario, mesaje encuadernar pones max
// 1️⃣ Constantes
const IVA = 0.21;                  // 21%
const PRECIO_BN_A4 = 0.05;         // €/pág B/N (A4)
const PRECIO_COLOR_A4 = 0.20;      // €/pág Color (A4)
const RECARGO_A3_FACTOR = 1.5;     // A3 = A4 × 1.5
const FACTOR_DOBLE_CARA = 0.9;     // Doble cara = × 0.9
const PRECIO_ENCUADERNACION = 3.00;// € por encuadernación
const RECARGO_URGENCIA = 0.15;     // +15% (si urgente)
const UMBRAL1 = 30, DTO1 = 0.05;   // ≥30€ → 5%
const UMBRAL2 = 60, DTO2 = 0.10;   // ≥60€ → 10%
const MIN_PAGS = 5;                // 5 páginas mínimo
const MIN_FACTURABLE = 100;        // 1€ mínimo
const MIN_PAGS_ENCUADERNAR = 10;   // 10 páginas para poder encuadernar
let mensajeConsola = "";

// 2️⃣ Funciones de validación
function validarNumeros(cant) { // Función para validar si se ha introducido un número o no
    const cantidad = Number(cant);
    if (Number.isNaN(cantidad) || cantidad < 0 || cantidad > 500) {
        alert("Introduce un número válido (>= 0 y <= 500).");
        console.error("Error, debe ser un número, y tiene que ser mayor o igual a 0 y menor o igual a 500.");
        return false;
    }
    console.log("Se ha ejecutado la función Validar Números.");
    return true;
}


function validarPaginas(blancoYNegro, color) { // Función para validar si hay copias B/N, color o ambas
    console.log("Se ha ejecutado la función Validar Páginas.");
    if (blancoYNegro == 0) return true;
    else if (color == 0) return false;
    else if (blancoYNegro > 0 && color > 0) return null;
}

function validarSize(size) { // Función para validar si el tamaño es A4 o es A3
    const tamanio = String(size).toUpperCase().trim();
    if (tamanio !== "A4" && tamanio !== "A3") {
        alert("Introduce únicamente las opciones \"A4\" o \"A3\".");
        console.error("Error valores diferentes a \"A4\" y \"A3\".");
        return false;
    }
    console.log("Se ha ejecutado la función Validar Size.");
    return true;
}

function validarRespuesta(resp) { // Función para validar el si o el no (Doble Cara, Urgencia)
    const respuesta = String(resp).toLowerCase().trim();
    if (respuesta !== "si" && respuesta !== "no") {
        alert("Introduce únicamente las opciones \"Si\" o \"No\".");
        console.error("Error valores diferentes a \"Si\" y \"No\".");
        return null;
    }
    console.log("Se ha ejecutado la función Validar Respuesta.");
    return respuesta == "si";
}

// 3️⃣ Funciones de cálculo / lógica
function calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag) {
    let precio = 0;
    // Ternario para escoger qué tipo de copia es (B/N o Color)
    flag ? precio = precioPagC(pagC, size) : precio = precioPagBN(pagBN, size);
    // Verificaciones doble cara, encuadernaciones, descuento y urgencia
    if (dobleCara) precio = calcularDobleCara(precio);
    if (numEncuader != 0) precio += calcularEncuadernar(numEncuader);
    if (precio >= (UMBRAL1 * 100)) precio = calcularDescuento(precio);
    if (urgencia) precio = calcularUrgencia(precio);
    console.log("Se ha ejecutado la función Calcular.");
    // Redondeamos el precio final
    return Math.round(precio + (precio * IVA));
}

function calcular2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia) {
    let precioBN = precioPagBN(pagBN, sizeBN);
    let precioC = precioPagC(pagC, sizeC);
    if (dobleCaraBN) precioBN = calcularDobleCara(precioBN);
    if (dobleCaraC) precioC = calcularDobleCara(precioC);
    if (numEncuaderBN != 0) precioBN += calcularEncuadernar(numEncuaderBN);
    if (numEncuaderC != 0) precioC += calcularEncuadernar(numEncuaderC);
    let precioTotal = precioBN + precioC;
    if (precioTotal >= (UMBRAL1 * 100)) precioTotal = calcularDescuento(precioTotal);
    if (urgencia) precioTotal = calcularUrgencia(precioTotal);
    console.log("Se ha ejecutado la función Calcular 2.");
    return Math.round(precioTotal + (precioTotal * IVA));
}

function precioPagBN(numPag, size) {
    const a4BN = numPag * (PRECIO_BN_A4 * 100); // Para trabajar con centimos
    const mensaje = "Se ha ejecutado la función Precio Pág BN.";
    if (size == "A4") {
        console.log(mensaje);
        mensajeConsola += `Paginas B/N: ${numPag} copias x ${PRECIO_BN_A4} € = ${(a4BN / 100).toFixed(2)} €\nTamaño: A4\n`;
        console.log(`Paginas B/N: ${numPag} x ${PRECIO_BN_A4} = ${(a4BN / 100).toFixed(2)} €\nTamaño: A4\n`); // Usamos to fixed para limitar a 2 decimales
        return a4BN;
    } else if (size == "A3") {
        console.log(mensaje);
        mensajeConsola += `Paginas B/N: ${numPag} copias x ${PRECIO_BN_A4} € x ${RECARGO_A3_FACTOR} = ${(a4BN / 100).toFixed(2)} €\nTamaño: A3 | ${(a4BN / 100).toFixed(2)} € x ${RECARGO_A3_FACTOR} € = ${((a4BN * RECARGO_A3_FACTOR) / 100).toFixed(2)} €\n`;
        console.log(`Paginas B/N: ${numPag} x ${PRECIO_BN_A4} x ${RECARGO_A3_FACTOR} = ${((a4BN * RECARGO_A3_FACTOR) / 100).toFixed(2)} €\nTamaño: A3`);
        return a4BN * RECARGO_A3_FACTOR;
    }
    alert("Opción no contemplada.");
    console.error("Opción no válidada en la función Precio Pag BN.");
}

function precioPagC(numPag, size) {
    const a4C = numPag * (PRECIO_COLOR_A4 * 100);
    const mensaje = "Se ha ejecutado la función Precio Pag C.";
    if (size == "A4") {
        console.log(mensaje);
        console.log(`Páginas a color: ${numPag} x ${PRECIO_COLOR_A4} = ${(a4C / 100).toFixed(2)} €\nTamaño: A4`);
        return a4C;
    } else if (size == "A3") {
        console.log(mensaje);
        console.log(`Páginas a Color: ${numPag} x ${PRECIO_COLOR_A4} x ${RECARGO_A3_FACTOR} = ${((a4C * RECARGO_A3_FACTOR) / 100).toFixed(2)} €\nTamaño: A3`);
        return a4C * RECARGO_A3_FACTOR;
    }
    alert("Opción no contemplada.");
    console.error("Opción no válidada en la función Precio Pag C.");
}

function calcularDobleCara(precio) {
    console.log("Se ha ejecutado la función Calcular Doble Cara.");
    mensajeConsola += `Doble Cara: Si (10%) → ${(precio / 100).toFixed(2)} € x ${FACTOR_DOBLE_CARA} € = ${((precio * FACTOR_DOBLE_CARA) / 100).toFixed(2)} €\n`;
    console.log(`Doble Cara: Si → ${(precio / 100).toFixed(2)} x ${FACTOR_DOBLE_CARA} = ${((precio * FACTOR_DOBLE_CARA) / 100).toFixed(2)} €`);
    return precio * FACTOR_DOBLE_CARA;
}

function calcularEncuadernar(unidades) {
    console.log("Se ha ejecutado la función Calcular Encuadernar.");
    mensajeConsola += `N° Encuadernaciones: ${unidades} x ${PRECIO_ENCUADERNACION} = ${((unidades * PRECIO_ENCUADERNACION)).toFixed(2)} €\n`;
    console.log(`N° Encuadernaciones: ${unidades} x ${PRECIO_ENCUADERNACION} = ${((unidades * PRECIO_ENCUADERNACION)).toFixed(2)} €`);
    return unidades * (PRECIO_ENCUADERNACION * 100);
}

function calcularDescuento(precio) { // mal?
    console.log("Se ha ejecutado la función Calcular Descuento.");
    if (precio >= (UMBRAL1 * 100) && precio < (UMBRAL2 * 100)) {
        mensajeConsola += `Descuento aplicado: ${precio / 100} - ${DTO1 * 100}% = ${((precio - (precio * DTO1)) / 100).toFixed(2)} €\n`;
        console.log(`Descuento aplicado (${DTO1 * 100}%): ${((precio - (precio * DTO1)) / 100).toFixed(2)} €`);
        return precio - (precio * DTO1);
    }
    mensajeConsola += `Descuento aplicado: ${precio / 100} - ${DTO2 * 100}% ${((precio - (precio * DTO2)) / 100).toFixed(2)} €\n`;
    console.log(`Descuento aplicado (${DTO2 * 100}%): ${((precio - (precio * DTO2)) / 100).toFixed(2)} €`);
    return precio - (precio * DTO2);
}

function calcularUrgencia(precio) {
    console.log("Se ha ejecutado la función Calcular Urgencia.");
    mensajeConsola += `Urgente: Si → ${(precio/100).toFixed(2)} + ${RECARGO_URGENCIA * 100}% = ${((precio * (1 + RECARGO_URGENCIA)) / 100).toFixed(2)} €\n`;
    console.log(`Urgente: Si → ${(precio/100).toFixed(2)} + ${RECARGO_URGENCIA * 100}% = ${((precio * (1 + RECARGO_URGENCIA)) / 100).toFixed(2)} €`);
    return precio + (precio * RECARGO_URGENCIA);
}

// 4️⃣ Funciones de impresión 
function imprimirDatos(pagBN, pagC, size, dobleCara, numEncuader, urgencia) {
    dobleCara ? dobleCara = "si" : dobleCara = "no";
    urgencia ? urgencia = "si" : urgencia = "no";
    const datos = `Páginas B/N: ${pagBN}
Páginas Color: ${pagC}
Tamaño: ${size}
Doble cara: ${dobleCara}
Nº de encuadernaciones: ${numEncuader}
Urgente: ${urgencia}`;
    return datos;
}

function imprimirDatos2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia) {
    dobleCaraBN ? dobleCaraBN = "si" : dobleCaraBN = "no";
    dobleCaraC ? dobleCaraC = "si" : dobleCaraC = "no";
    urgencia ? urgencia = "si" : urgencia = "no";
    const datos = `Páginas B/N: ${pagBN}
Páginas Color: ${pagC}
Tamaño B/N: ${sizeBN}
Tamaño Color: ${sizeC}
Doble cara B/N: ${dobleCaraBN}
Doble cara Color: ${dobleCaraC}
Nº de encuadernaciones B/N: ${numEncuaderBN}
Nº de encuadernaciones Color: ${numEncuaderC}
Urgente: ${urgencia}`;
    return datos;
}

// 5️⃣ Funciones de interacción con el usuario
function pedirSize(tipo) { // Función para pedir el tipo de tamaño de copia
    let size;
    console.log("Se ha ejecutado la función Pedir Size.");
    do size = prompt(`Introduce el tamaño de las páginas${tipo} (A4/A3):`); while (!validarSize(size));
    return size.toUpperCase().trim();
}

function pedirDobleCara(tipo, pag) { // Función para que el usuario indique si quiere las copias a doble cara
    let dobleCara;
    if (pag < 2) {
        alert(`Debe de haber mínimo 2 copias para hacerlas doble cara${tipo}.`);
    } else {
        do dobleCara = prompt(`¿Quieres de doble cara${tipo}?:`); while (validarRespuesta(dobleCara) == null);
        console.log("Se ha ejecutado la función Pedir Doble Cara.");
        return dobleCara = validarRespuesta(dobleCara);
    }
}

function pedirEncuadernacion(tipo, dobleCara, numPaginas) { // Función para pedir la cantidad de encuadernaciones
    numPaginas = Number(numPaginas);
    // Calculamos el mínimo de páginas por encuadernación según si es doble cara o no (Operador Ternario)
    let numMinimoPag = dobleCara ? MIN_PAGS_ENCUADERNAR : (MIN_PAGS_ENCUADERNAR / 2);
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

// 6️⃣ Menú
function menu() {
    let size, dobleCara, numEncuader; // solo para pags B/N o color
    let sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC; // para pags B/N y color
    let pagBN, pagC, urgencia, flag, total, detalles;
    
    alert("Recuerda que mínimo necesitas pedir 5 páginas en total, y tener una facturación de 1€");
    alert("Necesitas 10 páginas para poder encuadernar.");
    do { // Verificar que al menos existen 5 copías.
        do pagBN = prompt("Introduce las páginas en blanco y negro que desees:"); while (!validarNumeros(pagBN));
        pagBN = Number(pagBN);

        do pagC = prompt("Introduce las páginas en color:"); while (!validarNumeros(pagC));
        pagC = Number(pagC);

        // Validamos el tipo de copia que quiere el usuario
        flag = validarPaginas(pagBN, pagC);
        if ((pagBN + pagC) < MIN_PAGS) alert(`Introduce un mínimo de ${MIN_PAGS} páginas.`);
    } while ((pagBN + pagC) < MIN_PAGS);

    switch (flag) { // Menú para pedir datos si existen copias a B/N, a Color o ambas
        case true: // Copias a color
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagC);
            numEncuader = pedirEncuadernacion("", dobleCara, pagC);
            break;
        case false: // Copias a B/N
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagBN);
            numEncuader = pedirEncuadernacion("", dobleCara, pagBN);
            break;
        case null: // Copias a Color y B/N
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

    do urgencia = prompt("¿Es urgente?:"); while (validarRespuesta(urgencia) == null);
    urgencia = validarRespuesta(urgencia);

    // Calculamos el total y los detalles del pedido
    if (flag === null) {
        total = calcular2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia);
        detalles = imprimirDatos2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia);
    } else {
        total = calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag);
        detalles = imprimirDatos(pagBN, pagC, size, dobleCara, numEncuader, urgencia);
    }

    if (total < MIN_FACTURABLE)
        alert(`El total de su pedido de ${(total/100).toFixed(2)} € es menor al mínimo facturable de ${MIN_FACTURABLE} €, por tanto no se aplicará.`);
    else
      // Como el total ya tiene el iva, hacemos una regla de tres para mostrar el iva.
        console.log(`${mensajeConsola}IVA: ${IVA * 100}% = ${((total * 0.21) / 1.21 / 100).toFixed(2)} €\nPrecio total: ${(total / 100).toFixed(2)} €`);
        document.getElementById("datos").innerText = detalles;
        document.getElementById("total").innerText = `TOTAL: ${(total/100).toFixed(2)} €`;
}

// 7️⃣ Función principal
function main() { 
    menu(); 
} 

// 8️⃣ Ejecutar main
main();