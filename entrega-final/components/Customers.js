import { renderCustomers } from '../functions/renderCustomers.js'
import { saveDataToStorage } from '../functions/localStorage.js'
import { validateCustomerData } from '../functions/validations.js'
import { getFilteredCustomers } from './Filter.js'

export function Customers(customersDataBase, customersContainer){
    customersContainer.addEventListener('click', e => {
      if(e.target.dataset.parentid){
            const id = e.target.dataset.parentid  
    
            console.log(e.target.textContent)
            
            if(e.target.textContent.trim() === 'Salir' || e.target.textContent.trim() === 'Editar'){
                customersDataBase.customers.forEach(customer => {
                    if(customer.id === id){
                        customer.toggleIsEditing()
                    }
                })
                const filterInput = document.querySelector('#filter')
                const searchTerm = filterInput.value.toLowerCase()

                renderCustomers(getFilteredCustomers(customersDataBase, searchTerm), customersContainer)
                saveDataToStorage('customersData', customersDataBase.customers)
            }
            
            if(e.target.textContent.trim() === 'Eliminar'){
    
              swal({
                title: "¿Seguro que quieres eliminar el cliente?",
                text: "Una vez eliminado no se podrá recuperar la información del mismo!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  customersDataBase.removeCustomerById(id)
    
                  renderCustomers(customersDataBase.customers, customersContainer)
                  saveDataToStorage('customersData', customersDataBase.customers)
    
                  swal("El cliente ha sido eliminado correctamente!", {
                    icon: "success",
                  });
    
    
                } else {
                  swal("El cliente no se ha eliminado!");
                }
              });
            }
    
            if(e.target.textContent === 'Guardar'){
              
              const customerValidation  = validateCustomerData(customersDataBase,id)
    
              if(customerValidation){
                customerValidation.isEditing = false;
                customersDataBase.updateCustomer(id, customerValidation)
                saveDataToStorage('customersData', customersDataBase.customers)
                renderCustomers(customersDataBase.customers, customersContainer)
                swal("Se han guardado los cambios correctamente!", {
                  icon: "success",
                });            
              }
            }
        }
    })
  }