# Calculadora de Copias y Encuadernaciones

Esta aplicación en JavaScript permite calcular el precio de un pedido de copias en blanco y negro, color o ambas, considerando tamaño de página, doble cara, encuadernación, urgencia y descuentos.

## Orden de cálculo

1. Precio base según tipo de copia (B/N o Color) y tamaño (A4/A3).
2. Ajuste por doble cara (reducción del 10%).
3. Coste de encuadernación según número de unidades. (3 x unidad)
4. Descuento si el subtotal supera ciertos umbrales:
   - ≥30€ → 5%
   - ≥60€ → 10%
5. Recargo por urgencia (+15%) si aplica.
6. IVA 21% aplicado sobre el total final.
7. Todos los cálculos se realizan en céntimos para evitar errores de precisión y se redondea el total final.

## Ejemplos reproducibles

### Ejemplo 1: Solo B/N, A4, doble cara, 1 encuadernación

Mensajes informativos previos  
Recuerda que mínimo necesitas pedir 5 páginas en total, y tener una facturación de 1€  
Necesitas 10 páginas para poder encuadernar.

Datos de Entrada (simulando teclado)  
Introduce las páginas en blanco y negro que desees: 20  
Introduce las páginas en color: 0  
Introduce el tamaño de las páginas (A4/A3): A4  
¿Quieres de doble cara?: si  
Introduce el número de encuadernaciones que deseas (máx 2): 1  
¿Es urgente?: no

Mensajes principales (alertas / consola)  
Se ha ejecutado la función Validar Números.  
Se ha ejecutado la función Validar Páginas.  
Se ha ejecutado la función Pedir Size.  
Se ha ejecutado la función Validar Size.  
Se ha ejecutado la función Pedir Doble Cara.  
Validación correcta: 1 encuadernaciones (máx: 2)  
Se ha ejecutado la función Precio Pág BN.  
Se ha ejecutado la función Calcular Doble Cara.  
Se ha ejecutado la función Calcular Encuadernar.  
Se ha ejecutado la función Calcular.

Cálculo paso a paso  
Precio base: 20 x 0,05€ = 1,00€  
Doble cara: -10% → 0,10€ = 0,90€  
Encuadernación: +1 x 3,00€ → 3,90€  
IVA 21%: +0,82€  
Precio total: 4,72€

Salida final  
Páginas B/N: 20 copias x 0.05 € = 1.00 €
Tamaño: A4
Doble Cara: Si (10%) → -0.10 €
N° Encuadernaciones: 1 unidades x 3 € = 3.00 €
IVA: 21% = 0.82 €
Precio total: 4.72 €
