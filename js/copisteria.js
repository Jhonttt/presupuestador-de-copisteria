"use strict"; 
// Funcion principal 
function main() { 
    menu(); 
} 

// Ver var, mensaje de mínimo x para encuadernar, mínimo x para realizar el pedido.
// Parámetros (constantes)
const IVA = 0.21;                  // 21%
const PRECIO_BN_A4 = 0.05;         // €/pág B/N (A4)
const PRECIO_COLOR_A4 = 0.20;      // €/pág Color (A4)
const RECARGO_A3_FACTOR = 1.5;     // A3 = A4 × 1.5
const FACTOR_DOBLE_CARA = 0.9;     // Doble cara = × 0.9
const PRECIO_ENCUADERNACION = 3.00;// € por encuadernación
const RECARGO_URGENCIA = 0.15;     // +15% (si urgente)
const UMBRAL1 = 30, DTO1 = 0.05;   // ≥30€ → 5%
const UMBRAL2 = 60, DTO2 = 0.10;   // ≥60€ → 10%
const MIN_PAGS = 5;
const MIN_FACTURABLE = 1;

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
    if (respuesta !== "si" && respuesta !== "no") {
        alert("Introduce únicamente las opciones \"Si\" o \"No\".");
        console.error("Error valores diferentes a \"Si\" y \"No\".");
        return null;
    }
    console.log("Se ha ejecutado la función Validar Respuesta.");
    return respuesta == "si";
}

// Función para validar si el tamaño es A4 o es A3
function validarSize(size) {
    const respuesta = String(size).toLowerCase().trim();
    if (respuesta !== "a4" && respuesta !== "a3") {
        alert("Introduce únicamente las opciones \"A4\" o \"A3\".");
        console.error("Error valores diferentes a \"A4\" y \"A3\".");
        return false;
    }
    console.log("Se ha ejecutado la función Validar Tamaño.");
    return true;
}

// Función para validar si existe al menos 1 copia a B/N o a Color
function validarPaginas(blancoYNegro, color) {
    console.log("Se ha ejecutado la función Validar Páginas.");
    if (blancoYNegro == 0) return true;
    else if (color == 0) return false;
    else if (blancoYNegro > 0 && color > 0) return null;
}

// Función para pedir el tipo de tamaño de copia
function pedirSize(tipo) {
    do {
        size = prompt(`Introduce el tamaño de las páginas${tipo} (A4/A3):`);
    } while (!validarSize(size));
    console.log("Se ha ejecutado la función Pedir Size.");
    return size.toLowerCase();
}

// Función para que el usuario indique si quiere las copias doble cara
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

// Función para pedir la cantidad de encuadernaciones
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

// Menú principal
function menu() {
    let pagBN, pagC, urgencia, flag, total;

    // Verificar que al menos exista una copia.
    do {
        do { pagBN = prompt("Introduce las páginas en blanco y negro que desees:"); } while (!validarNumeros(pagBN));
        pagBN = Number(pagBN);

        do { pagC = prompt("Introduce las páginas en color:"); } while (!validarNumeros(pagC));
        pagC = Number(pagC);

        // Validamos el tipo de copia que quiere el usuario
        flag = validarPaginas(pagBN, pagC);
        if ((pagBN + pagC) < MIN_PAGS) alert(`Introduce un mínimo de ${MIN_PAGS} páginas.`);
    } while (pagBN == 0 && pagC == 0 || (pagBN + pagC) < MIN_PAGS);

    // Menú para pedir datos si existen copias a B/N, a Color o ambas
    switch (flag) {
        // Copias a color
        case true:
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagC);
            numEncuader = pedirEncuadernacion("", dobleCara, pagC);
            break;
        // Copias a B/N
        case false:
            size = pedirSize("");
            dobleCara = pedirDobleCara("", pagBN);
            numEncuader = pedirEncuadernacion("", dobleCara, pagBN);
            break;
        // Copias a Color y B/N
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
            console.error("Opción no válida.");
            break;
    }

    do { urgencia = prompt("¿Es urgente?:"); } while (validarRespuesta(urgencia) == null);
    urgencia = validarRespuesta(urgencia);

    // Calculamos el total
    if (flag === null)
        total = calcular2(pagBN, pagC, sizeBN, sizeC, dobleCaraBN, dobleCaraC, numEncuaderBN, numEncuaderC, urgencia);
    else
        total = calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag);

    if (total < MIN_FACTURABLE)
      //limitar los decimales a 2
        alert(`El total de su pedido de ${(total/100).toFixed(2)} € es menor al mínimo facturable de ${MIN_FACTURABLE} €, por tanto no se aplicará.`);
    else
      //como el total ya tiene el iba, hacemos una regla de tres para mostrar el iva.
        console.log("IVA: 21% = " + ((total * 0.21) / 1.21 / 100).toFixed(2) + " €");
        console.log("Precio total: " + (total / 100).toFixed(2) + " €");
}

// Calcular total
function calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag) {
    let precio = 0;
    // Menú para escoger qué tipo de copia es (B/N o Color)
    switch (flag) {
        case true:
            precio = precioPagC(pagC, size);
            break;
        case false:
            precio = precioPagBN(pagBN, size);
            break;
        default:
            alert("Opción no contemplada.");
            console.log("Opción no válida.");
            break;
    }

    // Verificaciones doble cara, encuadernaciones, urgencia, descuento
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
    console.log("Se ha ejecutado la función Calcular.");
    // Redondeo final a céntimos
    return Math.round(precioTotal + (precioTotal * IVA));
}

// Funciones de cálculos.
function precioPagBN(numPag, size) {
    const a4BN = numPag * (PRECIO_BN_A4 * 100);
    const mensaje = "Se ha ejecutado la función Precio Pag BN.";
    if (size == "a4") {
        console.log(mensaje);
        //Usamos to fixed para limitar a 2 decimales
        console.log("Paginas B/N: "+ numPag + " x 0,05 = " + (a4BN / 100).toFixed(2) + " €");
        console.log("Tamaño: A4 " );
        return a4BN;
    } else if (size == "a3") {
        console.log(mensaje);
        console.log("Paginas B/N: "+numPag+" x 0,05 x 1,5 = "+ ((a4BN * RECARGO_A3_FACTOR) / 100).toFixed(2) + " €");
        console.log("Tamaño: A3" );
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
        console.log("Páginas a color: "+ numPag + " x 0,20 = " + (a4C / 100).toFixed(2) + " €");
        console.log("Tamaño: A4");
        return a4C;
    } else if (size == "a3") {
        console.log(mensaje);
        console.log("Páginas a Color: " + numPag+" x 0,20 x 1,5 = "+ ((a4C * RECARGO_A3_FACTOR) / 100).toFixed(2) + " €");
        console.log("Tamaño: A3")
        return a4C * RECARGO_A3_FACTOR;
    }
    alert("Opción no contemplada.");
    console.error("Opción no válidada en la función Precio Pag C.");
}

function calcularDobleCara(precio) {
    console.log("Se ha ejecutado la función Calcular Doble Cara.");
    console.log("Doble Cara: Si → "+ (precio / 100).toFixed(2) + " x 0.9 = " + ((precio * FACTOR_DOBLE_CARA)/100).toFixed(2) + " €");
    return precio * FACTOR_DOBLE_CARA;
}

function calcularEncuadernar(unidades) {
    console.log("Se ha ejecutado la función Calcular Encuadernar.");
    console.log("N° Encuadernaciones: " + unidades + " x 3,00 = " + ((unidades * PRECIO_ENCUADERNACION)).toFixed(2) + " €");
    return unidades * (PRECIO_ENCUADERNACION * 100);
}

function calcularDescuento(precio) {
    console.log("Se ha ejecutado la función Calcular Descuento.");
    if (precio >= (UMBRAL1 * 100) && precio < (UMBRAL2 * 100)) {
        console.log("Descuento aplicado: " + ((precio - (precio * DTO1))/100).toFixed(2) + " €");
        return precio - (precio * DTO1);
    }
    console.log("Descuento aplicado: " + ((precio - (precio * DTO2))/100).toFixed(2) + " €");
    return precio - (precio * DTO2);
}

function calcularUrgencia(precio) {
    console.log("Se ha ejecutado la función Calcular Urgencia.");
    console.log("Urgente: Si → " + (precio/100).toFixed(2) + " + 15% = " + ((precio * (1+RECARGO_URGENCIA))/100).toFixed(2) + " €");
    return precio + (precio * RECARGO_URGENCIA);
}

/* 
Comprobación mínima:
- Probar al menos un caso sin descuento ni urgencia.
- Probar al menos un caso con descuento y con urgencia, verificando que el orden indicado modifica el resultado.
*/

main();
