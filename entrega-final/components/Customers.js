import { renderCustomers } from '../functions/renderCustomers.js';
import { saveDataToStorage } from '../functions/localStorage.js';
import { validateCustomerData } from '../functions/validations.js';
import { getFilteredCustomers } from './Filter.js';

// Función principal para gestionar los eventos de los clientes (editar, eliminar, guardar)
export function Customers(customersDataBase, customersContainer) {
  // Agrega un event listener para manejar clics en el contenedor de clientes
  customersContainer.addEventListener('click', e => {
    // Verifica si el elemento clicado tiene un atributo data-parentid (identificador del cliente)
    if (e.target.dataset.parentid) {
      const id = e.target.dataset.parentid;

      // Maneja el evento de editar/salir de edición del cliente
      if (e.target.textContent.trim() === 'Salir' || e.target.textContent.trim() === 'Editar') {
        // Recorre todos los clientes y cambia el estado de edición del cliente correspondiente
        customersDataBase.customers.forEach(customer => {
          if (customer.id === id) {
            customer.toggleIsEditing();
          }
        });

        // Obtiene el término de búsqueda actual y filtra los clientes en base a él
        const filterInput = document.querySelector('#filter');
        const searchTerm = filterInput.value.toLowerCase();
        renderCustomers(getFilteredCustomers(customersDataBase, searchTerm), customersContainer);

        // Guarda los datos actualizados de los clientes en el localStorage
        saveDataToStorage('customersData', customersDataBase.customers);
      }

      // Maneja el evento de eliminar el cliente
      if (e.target.textContent.trim() === 'Eliminar') {
        // Muestra un mensaje de confirmación antes de eliminar al cliente
        swal({
          title: "¿Seguro que quieres eliminar el cliente?",
          text: "Una vez eliminado no se podrá recuperar la información del mismo!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) { // Si el usuario confirma la eliminación
            customersDataBase.removeCustomerById(id); // Elimina el cliente de la base de datos
            renderCustomers(customersDataBase.customers, customersContainer); // Vuelve a renderizar los clientes
            saveDataToStorage('customersData', customersDataBase.customers); // Guarda los cambios en el localStorage

            // Muestra un mensaje de éxito
            swal("El cliente se ha eliminado correctamente!", {
              icon: "success",
            });
          } else { // Si el usuario cancela la eliminación
            swal("El cliente no se ha eliminado!"); // Muestra un mensaje de cancelación
          }
        });
      }

      // Maneja el evento de guardar los cambios del cliente
      if (e.target.textContent === 'Guardar') {
        // Valida los datos del cliente antes de guardar
        const customerValidation = validateCustomerData(customersDataBase, id);

        // Si los datos son válidos
        if (customerValidation) {
          customerValidation.isEditing = false; // Sale del modo de edición
          customersDataBase.updateCustomer(id, customerValidation); // Actualiza los datos del cliente en la base de datos
          saveDataToStorage('customersData', customersDataBase.customers); // Guarda los cambios en el localStorage
          renderCustomers(customersDataBase.customers, customersContainer); // Vuelve a renderizar los clientes

          // Muestra un mensaje de éxito
          swal("Se han guardado los cambios correctamente!", {
            icon: "success",
          });
        }
      }
    }
  });
}
