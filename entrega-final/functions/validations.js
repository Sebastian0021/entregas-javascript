function getValidatedInputFromForm(inputId, validationRegex, errorMessage) {
    
    const input = document.getElementById(inputId);
    const value = input.value.trim();

    if (validationRegex.test(value)) {
        input.classList.remove("input-error")
        return value;
    } else {
        swal("Error al agregar un cliente", `${errorMessage}`, "error");
        input.classList.add("input-error")
        return null;
    }
}

export function validateCustomerData(customersDataBase,id){
    let isValid = true; // Variable para rastrear si el formulario es válido
    const newCustomerData = {};
    
    // Obtener y validar los datos del formulario
    newCustomerData.name = getValidatedInputFromForm(`name-${id}`, /[A-Za-z]{2,}.+/, 'Nombre inválido. Intente nuevamente con solo letras.');
    
    const usernameValidation = getValidatedInputFromForm(`username-${id}`, /^[A-Za-z0-9]+$/, 'Nombre de usuario inválido. Intente nuevamente.')
    newCustomerData.username = usernameValidation ? `@${usernameValidation}` : null;
    
    newCustomerData.phone = getValidatedInputFromForm(`phone-${id}`, /^\d{10}$/, 'Número de teléfono inválido. Debe contener 10 dígitos. Intente nuevamente.');
  
    newCustomerData.address = {
      street: getValidatedInputFromForm(`street-${id}`, /[A-Za-z0-9\s]{5,}.+/, 'La calle no es válida. Intente nuevamente.'),
      city: getValidatedInputFromForm(`city-${id}`, /[A-Za-z]{3,}.+/, 'La ciudad no es válida. Intente nuevamente.'),
      province: getValidatedInputFromForm(`province-${id}`, /[A-Za-z]{3,}.+/, 'La provincia no es válida. Intente nuevamente.')
    };
  
    if(customersDataBase.getCustomerById(id)){
      newCustomerData.purchases = getValidatedInputFromForm(`purchases-${id}`, /^[0-9]\d*$/, 'Número válido.');
      newCustomerData.points = getValidatedInputFromForm(`points-${id}`, /^[0-9]\d*$/, 'Número válido.');
    }
  
    for (const field in newCustomerData) {
      if (newCustomerData[field] === null || 
          (typeof newCustomerData[field] === 'object' && Object.values(newCustomerData[field]).includes(null))) {
        isValid = false;
        break; // Salir del bucle si se encuentra un campo inválido
      }
    }
    
    return isValid ? newCustomerData : isValid
}  