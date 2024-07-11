import { customersData } from './data/customerData.js';
import { CustomerDataBase } from './models/CustomerDataBase.js';
import { Customer } from './models/Customer.js';

// Inicializar la base de datos de clientes
const saveDataToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
  
const getDataFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const customersDataBase = new CustomerDataBase();
const customersDataStorage = getDataFromStorage('customersData')

if(customersDataStorage){
    customersDataBase.addCustomersFromCustomersData(customersDataStorage);
}else{
    customersDataBase.addCustomersFromCustomersData(customersData);
}

const customersContainer = document.querySelector('#customers-container')



const generateRandomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
};

//Form

const customerForm = document.querySelector('#customer-form')
const submitBtn = document.getElementById("btn-customer-form");

customerForm.addEventListener('submit', e => {
      e.preventDefault()

      // console.log('listener')

      addCustomer(customersDataBase)
      renderCustomers(customersDataBase.customers)
      saveDataToStorage('customersData', customersDataBase.customers)
  })

function validateCustomerData(id){
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

function addCustomer(customersDataBase) {
  console.log('a')

  const newCustomerData = validateCustomerData('newCustomer')
  
  // Verificar si todos los campos son válidos antes de agregar el cliente
  if (newCustomerData) { 
    newCustomerData.id = generateRandomId()
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

function getValidatedInputFromForm(inputId, validationRegex, errorMessage) {
  const input = document.getElementById(inputId);
  const value = input.value.trim();

  console.log

  if (validationRegex.test(value)) {
    input.classList.remove("input-error")
    return value;
  } else {
    swal("Error al agregar un cliente", `${errorMessage}`, "error");
    input.classList.add("input-error")
    console.log(input.classList)
    return null;
  }
}

function handleSubmitButtonStyle(form){
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

customerForm.addEventListener("input", () => {
  // Verificar si todos los campos requeridos están llenos
  handleSubmitButtonStyle(customerForm);
});

function renderCustomers(customersArr){
    customersContainer.innerHTML = ''
    
    customersArr.forEach(customer => {
      const {id, name ,username, phone, address, purchases, points} = customer
      
      const customerDiv = document.createElement('div')
      customerDiv.id = id
      customerDiv.classList.add('customer--container')

      const customerHtml = `
        <div class="customer--div1">
          <div class="customer--img-container">
            <img src="./assets/customer-img.svg" alt="">
          </div>
          <div class="customer-info--container1">
            <div class="customer-info">
              <div class="customer-info-col1">
                <p>Nombre</p>
                <p>Usuario</p>
                <p>Teléfono</p>
                <p>Calle</p>
                <p>Ciudad</p>
                <p>Provincia</p>
              </div>

              <div class="customer-info-col2">
                <p>${name}</p>
                <p>${username}</p>
                <p>${phone}</p>
                <p>${address.street}</p>
                <p>${address.city}</p>
                <p>${address.province}</p>
              </div>
            </div>
          </div>
          <div class="customer--action">
            <button class="customer--action-btn edit" data-parentid="${id}"><i class="fa-solid fa-user-pen"></i> Editar</button>
            <button class="customer--action-btn remove" data-parentid="${id}"><i class="fa-solid fa-x"></i> Eliminar</button>
          </div>

        </div>
        <div class="customer--div2">
          <div class="customer-info--container2">
            <div class="customer-info">
              <div class="customer-info2-col1">
                <p>Compras</p>
                <p>Puntos</p>
              </div>

              <div class="customer-info2-col2">
                <p>${purchases}</p>
                <p>${points}</p>
              </div>
            </div>
          </div>
        </div>`

      const customerEditingHtml =`
            <div class="customer--div1">
              <div class="customer--img-container">
                <img src="./assets/customer-img.svg" alt="">
              </div>
              <div class="customer-info--container1">
                <div class="customer-info-editing">
                  <div class="customer-info-col1">
                    <label for="name-${id}">Nombre</label>
                    <label for="username-${id}">Usuario</label>
                    <label for="phone-${id}">Teléfono</label>
                    <label for="street-${id}">Calle</label>
                    <label for="city-${id}">Ciudad</label>
                    <label for="province-${id}">Provincia</label>
                  </div>

                  <div class="customer-info-col2">
                    <input id="name-${id}" class="customer--input" type="text" placeholder="Nombre" value="${name}" required>
                    <input id="username-${id}" class="customer--input" type="text" placeholder="Usuario" value="${username.substring(1)}" required>
                    <input id="phone-${id}" class="customer--input" type="number" placeholder="Teléfono" value="${phone}" required>
                    <input id="street-${id}" class="customer--input" type="text" placeholder="Calle" value="${address.street}" required>
                    <input id="city-${id}" class="customer--input" type="text" placeholder="Ciudad" value="${address.city}" required>
                    <input id="province-${id}" class="customer--input" type="text" placeholder="Provincia" value="${address.province}" required>
                  </div>
                </div>
              </div>
              <div class="customer--action">
                <button class="customer--action-btn remove" data-parentid="${id}"><i class="fa-solid fa-x"></i>
                  Eliminar</button>
              </div>

            </div>
            <div class="customer--div2">
              <div class="customer-info--container2">
                <div class="customer-info-editing">
                  <div class="customer-info2-col1">
                    <label for="purchases-${id}">Compras</label>
                    <label for="points-${id}">Puntos</label>
                  </div>

                  <div class="customer-info2-col2">
                    <input id="purchases-${id}" class="customer--input" type="number" placeholder="Compras" value=${purchases} required>
                    <input id="points-${id}" class="customer--input" type="number" placeholder="Puntos" value=${points} required>
                  </div>
                </div>
                <div>
                  <button class="customer-editing--action-btn edit" data-parentid="${id}">Salir</button>
                  <button class="submit--btn add" type="submit" data-parentid="${id}">Guardar</button>
                </div>
              </div>
            </div>`
        
        customerDiv.innerHTML = customer.isEditing ? customerEditingHtml : customerHtml
        customersContainer.appendChild(customerDiv)
    })
}

//Filter

const filterInput = document.querySelector('#filter')
const filterContainer = document.querySelector('#search-customer')

filterContainer.addEventListener('click', () => {
    filterInput.focus()
})

filterInput.addEventListener("focus", () => {
  filterContainer.classList.add("focus");
});

filterInput.addEventListener("blur", () => {
  filterContainer.classList.remove("focus");
});

filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase()
    const filteredCustomers = customersDataBase.customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm) ||
                customer.username.toLowerCase().includes(searchTerm) ||
                customer.phone.toString().includes(searchTerm) ||
                customer.address.street.toLowerCase().includes(searchTerm) ||
                customer.address.city.toLowerCase().includes(searchTerm) ||
                customer.address.province.toLowerCase().includes(searchTerm) ||
                customer.purchases.toString().includes(searchTerm) ||
                customer.points.toString().includes(searchTerm);
    })
    renderCustomers(filteredCustomers)
})

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
            renderCustomers(customersDataBase.customers)
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

              renderCustomers(customersDataBase.customers)
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
          
          const customerValidation  = validateCustomerData(id)

          if(customerValidation){
            customersDataBase.updateCustomer(id, customerValidation)
            saveDataToStorage('customersData', customersDataBase.customers)
            renderCustomers(customersDataBase.customers)
            swal("Se han guardado los cambios correctamente!", {
              icon: "success",
            });            
          }
        }
    }
})

renderCustomers(customersDataBase.customers)