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
    console.log(customersDataStorage)
    customersDataBase.addCustomersFromCustomersData(customersDataStorage);

}else{
    customersDataBase.addCustomersFromCustomersData(customersData);
}

const customersContainer = document.querySelector('#customers-container')

// const customerForm = document.querySelector('#customer-form')
// const customerInputName = document.querySelector('#name')
// const customerInputUsername = document.querySelector('#username')
// const customerInputPhone = document.querySelector('#phone')
// const customerInputStreet = document.querySelector('#street')
// const customerInputCity = document.querySelector('#city')
// const customerInputProvince = document.querySelector('#province')

// const inputs = document.querySelectorAll('.form-customer--input')

const generateRandomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
};

// customerForm.addEventListener('submit', e => {
//     e.preventDefault()
    
//     addCustomer()
//     renderCustomers(customersDataBase.customers)
//     saveDataToStorage('customersData', customersDataBase.customers)

//     inputs.forEach(input => input.value = '')
// })

function addCustomer(){
    const name = customerInputName.value
    const username = `@${customerInputUsername.value}`
    const phone = customerInputPhone.value
    const street = customerInputStreet.value
    const city = customerInputCity.value
    const province = customerInputProvince.value
    
    const newCustomer = {id: generateRandomId(),name: name, username: username, phone: phone, address: {street: street, city: city, province: province}}
    customersDataBase.addCustomer(new Customer(newCustomer))
}

function renderCustomers(customersArr){
    customersContainer.innerHTML = ''
    
    customersArr.forEach(customer => {
        const {id, name ,username, phone, address, purchases, points} = customer
        
        
        if(!customer.isEditing){
            
            const customerDiv = document.createElement('div')
            customerDiv.id = id

            customerDiv.innerHTML += `
                <div class="customer--container">
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
                <button class="customer--action-btn remove"><i class="fa-solid fa-x"></i> Eliminar</button>
                <button class="customer--action-btn edit"><i class="fa-solid fa-user-pen"></i> Editar</button>
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
            </div>
          </div>
            `

            customersContainer.appendChild(customerDiv)
        }else{

            const customerForm = document.createElement('form')
            customerForm.id = id

            customerForm.innerHTML += `
            <p><strong>Nombre</strong>: <input type="text" class="input-${id}" value="${name}" id="name-${id}" name="name" placeholder="Nombre" required pattern="^[A-Za-z\sñ]+$" title="Nombre inválido. Intente nuevamente con solo letras y espacios."></p>
            <p><strong>Usuario</strong>: <input type="text" class="input-${id}" value="${username}" id="username-${id}" name="username" placeholder="Usuario" required></p>
            <p><strong>Teléfono</strong>: <input type="number" class="input-${id}" value="${phone}" id="phone-${id}" name="phone" placeholder="Teléfono" min="1000000000" max="9999999999" pattern="[0-9]{10}" title="La calle solo puede contener letras y números. Intente nuevamente." required></p>
            <p><strong>Calle</strong>: <input type="text" class="input-${id}" value="${address.street}" id="street-${id}" name="street" placeholder="Calle" required pattern="^[A-Za-z0-9\s]+$" title="La calle solo puede contener letras y números. Intente nuevamente."></p>
            <p><strong>Ciudad</strong>: <input type="text" class="input-${id}" value="${address.city}" id="city-${id}" name="city" placeholder="Ciudad" required pattern="^[A-Za-z\s]+$" title="La ciudad solo puede contener letras. Intente nuevamente.">
            <p><strong>Provincia</strong>: <input type="text" class="input-${id}" value="${address.province}" id="province-${id}" name="province" placeholder="Provincia" required pattern="^[A-Za-z\s]+$" title="La provincia solo puede contener letras. Intente nuevamente."></p>          </p>
            <p><strong>Compras</strong>: <input type="number" class="input-${id}" value="${purchases}" name="" id="purchases-${id}"></p>
            <p><strong>Puntos</strong>: <input type="number" class="input-${id}" value="${points}" name="" id="points-${id}"></p>
            <button>Guardar</button>
            <button>Eliminar</button>
            <button>Cancelar</button>
            `

            customersContainer.appendChild(customerForm)
        }
    })
}

const filterInput = document.querySelector('#filter')

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

// customersContainer.addEventListener('click', e => {
//     if(e.target.tagName === 'BUTTON'){
//         const id = e.target.parentNode.id  
        
//         if(e.target.textContent === 'Cancelar' || e.target.textContent === 'Editar'){
//             customersDataBase.customers.forEach(customer => {
//                 if(customer.id === id){
//                     customer.toggleIsEditing()
//                 }
//             })
//         }
        
//         if(e.target.textContent === 'Eliminar'){
//             customersDataBase.customers.forEach((customer, i) => {
//                 if(customer.id === id){
//                     customersDataBase.customers.splice(i,1)
//                 }
//             })
//         }

//         if(e.target.textContent === 'Guardar'){
//             const name = document.querySelector(`#name-${id}`).value
//             // const username = document.querySelector(`#username-${id}`)
//             // const phone = document.querySelector(`#phone-${id}`)
//             // const street = document.querySelector(`#street-${id}`)
//             // const city = document.querySelector(`#city-${id}`)
//             // const province = document.querySelector(`#province-${id}`)

//             customersDataBase.customers.forEach((customer) => {
//                 if(customer.id === id){
//                     customer.name = name
//                     customer.toggleIsEditing()
//                 }
//             })


//         }

//         renderCustomers(customersDataBase.customers)
//         saveDataToStorage('customersData', customersDataBase.customers)
//     }
// })

renderCustomers(customersDataBase.customers)