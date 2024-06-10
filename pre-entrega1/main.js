
// Calcular nota final de alumnos ingresados.

// Función para controlar si el usuario desea agregar más notas o finalizar.
function continuar() {
    while (true) {
      const accion = prompt('Ingrese [ a ] para agregar otra nota o [ x ] para salir').toLowerCase();
      if (accion === 'a' || accion === 'x') {
        return accion === 'a'; // Devuelve true si quiere continuar, false si quiere salir.
      } else {
        alert('Por favor ingrese una opción válida');
      }
    }
  }
  
  // Función para calcular el promedio con 2 decimales.
  const calcularPromedio = (valor, cantidad) => Math.round((valor / cantidad) * 100) / 100;
  
  // Variables para almacenar la suma de notas y la cantidad de notas.
  let cantidadDeNotas = 0;
  let sumaDeNotas = 0;
  
  // Bucle principal para ingresar notas hasta que el usuario decida salir.
  do {
    // Bucle interno para validar que el usuario ingrese un número válido como nota.
    while (true) {
      const nota = Number(prompt('Ingrese la nota del alumno'));
      if (!isNaN(nota)) { // Verifica si es un número.
        if(nota >= 0 && nota <= 10){ // Verifica que el número sea una nota.
            sumaDeNotas += nota;
            cantidadDeNotas++;
            break; // Sale del bucle interno si la nota es válida.
        } else {
            alert('Por favor ingrese un número válido entre 0 y 10');
        }
      } else {
        alert('Por favor ingrese un número');
      }
    }
  
  } while (continuar()) // Pregunta al usuario si desea agregar más notas o finalizar.
  
  // Calcula el promedio final después de ingresar todas las notas.
  const promedio = calcularPromedio(sumaDeNotas, cantidadDeNotas);
  
  // Muestra el resultado al usuario, indicando el promedio o que solo se ingresó una nota.
  if (cantidadDeNotas > 1) {
    alert(`El promedio de las ${cantidadDeNotas} notas ingresadas es: ${promedio}`);
  } else {
    alert(`La nota ingresada fue: ${sumaDeNotas}. No se puede calcular el promedio con una sola nota.`);
  }
  