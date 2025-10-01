"use strict";
/*
  Reglas: operar INTERNAMENTE en céntimos; mostrar a 2 decimales.
  Orden de cálculo obligatorio: DESCUENTO → URGENCIA → IVA.
*/


function main() {
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
   /* entradas (variables)
   let pagBN = prompt("Introduce las páginas en blanco y negro que desees:");
   let pagC = prompt("Introduce las páginas en color:");
   let size = prompt("Introduce el tamaño de las páginas (A4/A3):");
   let dobleCara = prompt("¿Las quieres de doble cara?:");
   let numEncuader = prompt("Introduce el número de encuadernaciones que desees:");
   let urgencia = prompt("¿Es urgente?:");*/


}
//Validar dobleCara

function validarNumeros(cantidad) {
  if (Number.isNaN(Number(cantidad))) {
    alert("Introduce un número válido (>= 0)");
    console.log("Error, debe ser un número, y tiene que ser mayor o igual a 0");
    return false;
  } else {
    return true;
  }
}
// Funcion para validar el si o no (Doble Cara, Urgencia)
function validarRespuesta(resp) {
  let respuesta = String(resp).toLowerCase().trim();
  if (respuesta !== 'si' && respuesta !== 'no') {
    alert('Introduce únicamente las opciones "Si" o "No"');
    console.log('Error valores diferentes a "Si" o "NO"');
    return false; 
  }
  return true; 
}

//Funcion A4 o A3
function validarSize(size) {
  let respuesta = String(size).toLowerCase().trim();
  if (respuesta !== 'a4' && respuesta !== 'a3') {
    alert('Introduce únicamente las opciones "A4" o "A3"');
    console.log('Error valores diferentes a "A4" o "A3"');
    return false; 
  }
}
//Menu
/* Copias color y b/n, tamaño, impresion doble cara, 
encuadernacion, urgencia
*/
function menu (){
  //Declaración de Variables
  let pagBN, pagC, size, dobleCara, numEncuader, urgencia;
  do {
      pagBN = prompt("Introduce las páginas en blanco y negro que desees:");
  } while (!validarNumeros(pagBN));
   //Almacenamos el valor
   pagBN = Number(pagBN);

  do {
       pagC = prompt("Introduce las páginas en color:");

  } while (!validarNumeros(pagC));
    size = prompt("Introduce el tamaño de las páginas (A4/A3):");
    dobleCara = prompt("¿Las quieres de doble cara?:");
    numEncuader = prompt("Introduce el número de encuadernaciones que desees:");
    urgencia = prompt("¿Es urgente?:");
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