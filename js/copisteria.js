"use strict";
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
var size;
var dobleCara;

// Funciones para validar los tipos de datos:
// Función para validar si se introduce un número, si el número que se introduce es 0, o si no se introduce un número.
function validarNumeros(cant) {
  let cantidad = Number(cant);
  if (Number.isNaN(cantidad) || cantidad<0 || cantidad>=500) {
    alert("Introduce un número válido (>= 0) o (<=500).");
    console.log("Error, debe ser un número, y tiene que ser mayor o igual a 0.");
    return false;
  }
  console.log("Se ha ejecutado la función Validar Números");
  return true;
}

// Función para validar el si o el no (Doble Cara, Urgencia)
function validarRespuesta(resp) {
  let respuesta = String(resp).toLowerCase().trim();
  if (respuesta !== 'si' && respuesta !== 'no') {
    alert('Introduce únicamente las opciones "Si" o "No".');
    console.log('Error valores diferentes a "Si" y "No".');
    return null;
  } if (respuesta == "si") {
    return true;
  }
  console.log("Se ha ejecutado la función Validar Respuesta");
  return false;
}

// Función para validar si el tamanio es A4 o es A3
function validarSize(size) {
  let respuesta = String(size).toLowerCase().trim();
  if (respuesta !== 'a4' && respuesta !== 'a3') {
    alert('Introduce únicamente las opciones "A4" o "A3".');
    console.log('Error valores diferentes a "A4" y "A3".');
    return false;
  }
  console.log("Se ha ejecutado la función Validar Tamaño");
  return true;
}

//Función para validar si existe al menos 1 copia a B/N o a Color
function validarPaginas(blancoYNegro, color) {
  if (blancoYNegro == 0) {
    return true;
  } else if (color == 0) {
    return false;
  } else if (blancoYNegro > 0 && color > 0) {
    return null;
  }
  console.log("Se ha ejecutado la función validar Páginas");
}

//Función para pedir el tipo de tamaño de copia
function pedirSize(tipo) {
    do {
        size = prompt(`Introduce el tamaño de las páginas ${tipo} (A4/A3):`);
    } while (!validarSize(size));
    return size.toLowerCase;
}

//Funcion para que el usuario indique si quiere las copias doble cara
function pedirDobleCara(tipo) {
  do {
    dobleCara = prompt(`¿Las quieres de doble cara${tipo}?:`);
  } while (validarRespuesta(dobleCara) == null);
  return dobleCara = validarRespuesta(dobleCara);
}

//Funcion para pedir la cantidad de encuadernaciones
function pedirEncuadernacion(tipo) {
  do {
    numEncuader = prompt(`Introduce el número de encuadernaciones${tipo} que deseas:`);
  } while (!validarNumeros(numEncuader));
  return numEncuader = Number(numEncuader);
  console.log("Se ha ejecutado la función Pedir Encuadernacion");
}


/*
  Reglas: operar INTERNAMENTE en céntimos; mostrar a 2 decimales.
  Orden de cálculo obligatorio: DESCUENTO → URGENCIA → IVA.
  validar dobleCara
*/

function main() {
  menu();
}


// Menu
// Copias color y b/n, tamaño, impresion doble cara, encuadernacion, urgencia
function menu() {
  let pagBN, pagC, urgencia, flag;
  do {
    do {
      pagBN = prompt("Introduce las páginas en blanco y negro que desees:");
    } while (!validarNumeros(pagBN));
    pagBN = Number(pagBN);   // Almacenamos el valor

        if (pagBN == 0 && pagC == 0) alert("Introduce páginas de un tipo.");
    } while (pagBN == 0 && pagC == 0);

    switch (flag) {
        case true:
            size = pedirSize("a color");
            dobleCara = pedirDobleCara("");
            break;
        case false:
            size = pedirSize("blanco y negro");
            dobleCara = pedirDobleCara("");
            break;
        case null:
            var sizeBN, sizeC, dobleCaraBN, dobleCaraC;
            sizeBN = pedirSize("blanco y negro");
            sizeC = pedirSize("a color");
            dobleCaraBN = pedirDobleCara(" las páginas en blanco y negro");
            dobleCaraC = pedirDobleCara(" las páginas a color");
            break;
        default:
            alert("Opción no contemplada.");
            console.log("Opción no válidada");
            break;
    }

    do {
        numEncuader = prompt("Introduce el número de encuadernaciones que desees:");
    } while (!validarNumeros(numEncuader));
    numEncuader = Number(numEncuader);

    do {
        urgencia = prompt("¿Es urgente?:"); 
    } while (validarRespuesta(urgencia) == null);
    urgencia = validarRespuesta(urgencia);
    

    switch (flag) {
        case true || false:
            calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag);
            break;
        case null:

            break;
        default:
            alert("Opción no contemplada.");
            console.log("Opción no válidada");
            break;
    }
    

}

// Calculos
function calcular(pagBN, pagC, size, dobleCara, numEncuader, urgencia, flag) {
    let precio = 0;

    switch (flag) {
        case true:
            precio = precioPagC(pagC, size);
            if (dobleCara) precio = dobleCara(precio);
            if (numEncuader != 0) precio += encuadernar(numEncuader, dobleCara);
            break;
        case false:
            precio = precioPagBN(pagBN, size);
            if (dobleCara) precio = dobleCara(precio);
            break;
        default:
            alert("Opción no contemplada.");
            console.log("Opción no válidada");
            break;
    }





}



// Funciones de calculos.
function precioPagBN(numPag, size) {
    let a4BN = numPag * (PRECIO_BN_A4 * 100);
    if (size == "a4") {
        return a4BN;
    } else if (size == "a3") {
        return a4BN * (RECARGO_A3_FACTOR * 100);
    }
    
}

function precioPagC(numPag, size) {
    let a4C = numPag * (PRECIO_COLOR_A4 * 100);
    if (size == "a4") {
        return a4C;
    } else if (size == "a3") {
        return a4C * (RECARGO_A3_FACTOR * 100);
    }
}

function dobleCara(precio) {
  return precio * FACTOR_DOBLE_CARA;
}

function encuadernar(unidades) {
  return unidades * (PRECIO_ENCUADERNACION * 100);
}








/*
Reglas de negocio a aplicar:
1) Determinar el precio por página según tipo (BN/Color), tamaño (A4/A3) y si es doble cara.
2) Obtener el coste total de las páginas y el de las encuadernaciones.
3) Calcular el subtotal base del trabajo.
4) Aplicar el descuento y recargo si corresponden.
6) Calcular los impuestos y el importe final a pagar.

Comprobación mínima:
- Probar al menos un caso sin descuento ni urgencia.
- Probar al menos un caso con descuento y con urgencia, verificando que el orden indicado modifica el resultado.
*/

main();