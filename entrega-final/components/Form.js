import { Customer } from '../models/Customer.js';
import { renderCustomers } from '../functions/renderCustomers.js';
import { generateRandomId } from '../functions/utils.js';
import { saveDataToStorage } from '../functions/localStorage.js';
import { validateCustomerData } from '../functions/validations.js';

export function Form(customersDataBase, customersContainer){
    const customerForm = document.querySelector('#customer-form')
    const submitBtn = document.getElementById("btn-customer-form");
    
    const addCustomer = (customersDataBase,newCustomerData, id) => {
        // const newCustomerData = validateCustomerData('newCustomer')
    
        // Verificar si todos los campos son válidos antes de agregar el cliente
        if (newCustomerData) { 
                newCustomerData.id = id
                customersDataBase.addCustomer(new Customer(newCustomerData));
                swal({
                    // title: "Cliente agregado exitosamente.",
                    text: "Cliente agregado exitosamente.",
                    icon: "success",
                    button: "Salir",
                });
                // alert('Cliente agregado exitosamente.');
                swal("Bien hecho!", "Cliente agregado exitosamente!", "success");
                customerForm.reset();
                submitBtn.classList.remove("add")
                submitBtn.disabled = true;
            }
    }

    const handleSubmitButtonStyle = (form, submitBtn) =>{
      const requiredInputs = form.querySelectorAll("input[required]");
      const isInputFull = Array.from(requiredInputs).every(field => {
          return field.value.trim() !== "";
      });
    
      // Agregar o quitar la clase según la validación
      if (isInputFull) {
          submitBtn.classList.add("add");
          submitBtn.disabled = false;
      } else {
          console.log('a')
          submitBtn.classList.remove("add");
          submitBtn.disabled = true;
      }
    }  

    customerForm.addEventListener('submit', e => {
          e.preventDefault()
    
          // console.log('listener')
          const customerData = validateCustomerData(customersDataBase,'newCustomer')
          addCustomer(customersDataBase, customerData, generateRandomId())
          renderCustomers(customersDataBase.customers, customersContainer)
          saveDataToStorage('customersData', customersDataBase.customers)
    })
    
    customerForm.addEventListener("input", () => {
      handleSubmitButtonStyle(customerForm, submitBtn);
    });
  }