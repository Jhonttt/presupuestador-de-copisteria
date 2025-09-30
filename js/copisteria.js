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
   // entradas (variables)
   let pagBN;
   let pagC;
   let size;
   let dobleCara;
   let numEncuader;
   let urgencia;


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