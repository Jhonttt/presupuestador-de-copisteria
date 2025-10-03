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
  pagC = Number(pagC);

  if (pagBN==0 && pagC==0){
    alert('Debes sacar por lo menos 1 COPIA');
  }

  do {
    size = prompt("Introduce el tamaño de las páginas (A4/A3):");
  } while (!validarSize(size));
  
  do{
    dobleCara = prompt("¿Las quieres de doble cara?:");
  } while (!validarRespuesta(dobleCara));

  do{
  numEncuader = prompt("Introduce el número de encuadernaciones que desees:");
  } while (!validarNumeros(numEncuader));
  
  do{
  urgencia = prompt("¿Es urgente?:");
  }while (!validarRespuesta(urgencia));
}
