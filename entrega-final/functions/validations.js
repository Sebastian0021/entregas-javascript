// Obtiene y valida un valor de entrada de un formulario, mostrando un mensaje de error si es necesario.
function getValidatedInputFromForm(inputId, validationRegex, errorMessage) {
    const input = document.getElementById(inputId);
    const value = input.value.trim();
  
    if (validationRegex.test(value)) {
      input.classList.remove("input-error"); // Remueve la clase de error si la validación es exitosa.
      return value; // Retorna el valor validado.
    } else {
      swal("Error al agregar un cliente", `${errorMessage}`, "error"); // Muestra un mensaje de error personalizado.
      input.classList.add("input-error"); // Agrega la clase de error al campo inválido.
      return null; // Retorna null para indicar que la validación falló.
    }
  }
  
  // Valida los datos de un cliente ingresados en un formulario.
  export function validateCustomerData(customersDataBase, id) {
    let isValid = true; // Inicialmente, asume que todos los campos son válidos.
    const newCustomerData = {}; // Objeto para almacenar los datos validados.
  
    // Obtiene y valida los datos del formulario, uno por uno.
    newCustomerData.name = getValidatedInputFromForm(`name-${id}`, /^[a-zA-Z]+$/, 'Nombre inválido. Solo se permiten letras.');
  
    const usernameValidation = getValidatedInputFromForm(`username-${id}`, /^[A-Za-z0-9.]+$/, 'Usuario inválido. Solo se permiten letras, números y puntos.');
    newCustomerData.username = usernameValidation ? `@${usernameValidation}` : null; // Agrega "@" al nombre de usuario si es válido.
  
    newCustomerData.phone = getValidatedInputFromForm(`phone-${id}`, /^\d{10}$/, 'Teléfono inválido. Debe tener 10 dígitos.');
  
    newCustomerData.address = {
      street: getValidatedInputFromForm(`street-${id}`, /[A-Za-z0-9\s]{5,}.+/, 'Calle inválida.'),
      city: getValidatedInputFromForm(`city-${id}`, /[A-Za-z]{3,}.+/, 'Ciudad inválida.'),
      province: getValidatedInputFromForm(`province-${id}`, /[A-Za-z]{3,}.+/, 'Provincia inválida.')
    };
  
    // Si el cliente ya existe en la base de datos, valida los campos adicionales (compras y puntos).
    if (customersDataBase.getCustomerById(id)) {
      newCustomerData.purchases = getValidatedInputFromForm(`purchases-${id}`, /^[0-9]\d*$/, 'Compras inválidas. Solo se permiten números.');
      newCustomerData.points = getValidatedInputFromForm(`points-${id}`, /^[0-9]\d*$/, 'Puntos inválidos. Solo se permiten números.');
    }
  
    // Verifica si algún campo no pasó la validación.
    for (const field in newCustomerData) {
      if (newCustomerData[field] === null || (typeof newCustomerData[field] === 'object' && Object.values(newCustomerData[field]).includes(null))) {
        isValid = false;
        break; // Si se encuentra un campo inválido, no es necesario seguir validando.
      }
    }
  
    // Retorna los datos validados si todos los campos son válidos, o false si alguno falló.
    return isValid ? newCustomerData : isValid;
  }
  