import { Customer } from '../models/Customer.js';
import { renderCustomers } from '../functions/renderCustomers.js';
import { generateRandomId } from '../functions/utils.js';
import { saveDataToStorage } from '../functions/localStorage.js';
import { validateCustomerData } from '../functions/validations.js';

// Función principal para manejar el formulario de clientes
export function Form(customersDataBase, customersContainer) {
  const customerForm = document.querySelector('#customer-form'); // Obtiene el elemento del formulario
  const submitBtn = document.getElementById("btn-customer-form"); // Obtiene el botón de envío del formulario

  // Función interna para agregar un nuevo cliente a la base de datos
  const addCustomer = (customersDataBase, newCustomerData, id) => {
    // Verifica si los datos del cliente son válidos
    if (newCustomerData) {
      newCustomerData.id = id; // Asigna un ID único al nuevo cliente
      customersDataBase.addCustomer(new Customer(newCustomerData)); // Agrega el cliente a la base de datos

      // Muestra un mensaje de éxito utilizando SweetAlert
      swal({
        text: "Cliente agregado exitosamente.",
        icon: "success",
        button: "Salir",
      });
      swal("Bien hecho!", "Cliente agregado exitosamente!", "success");

      customerForm.reset(); // Reinicia el formulario
      submitBtn.classList.remove("add"); // Remueve la clase "add" del botón de envío
      submitBtn.disabled = true; // Deshabilita el botón de envío
    }
  };

  // Función interna para actualizar el estilo del botón de envío según la validez del formulario
  const handleSubmitButtonStyle = (form, submitBtn) => {
    const requiredInputs = form.querySelectorAll("input[required]"); // Obtiene los campos obligatorios del formulario
    // Verifica si todos los campos obligatorios están llenos
    const isInputFull = Array.from(requiredInputs).every(field => {
      return field.value.trim() !== "";
    });

    // Actualiza el estilo del botón de envío en función de si todos los campos están llenos
    if (isInputFull) {
      submitBtn.classList.add("add");
      submitBtn.disabled = false; // Habilita el botón si todos los campos están llenos
    } else {
      console.log('a'); // (Esta línea parece ser un console.log de depuración y podría ser eliminada)
      submitBtn.classList.remove("add");
      submitBtn.disabled = true; // Deshabilita el botón si algún campo está vacío
    }
  };

  // Agrega un event listener para manejar el envío del formulario
  customerForm.addEventListener('submit', e => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Valida los datos del cliente
    const customerData = validateCustomerData(customersDataBase, 'newCustomer');

    // Agrega el cliente si los datos son válidos
    addCustomer(customersDataBase, customerData, generateRandomId());
    renderCustomers(customersDataBase.customers, customersContainer); // Renderiza la lista de clientes actualizada
    saveDataToStorage('customersData', customersDataBase.customers); // Guarda los datos en el localStorage
  });

  // Agrega un event listener para actualizar el estilo del botón cada vez que se cambia un valor en el formulario
  customerForm.addEventListener("input", () => {
    handleSubmitButtonStyle(customerForm, submitBtn);
  });
}
