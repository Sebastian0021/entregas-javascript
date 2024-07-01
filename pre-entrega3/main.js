import { customersData } from './data/customerData.js';
import { CustomerDataBase } from './models/CustomerDataBase.js';
import { Customer } from './models/Customer.js';

// Inicializar la base de datos de clientes
const saveTasksStorage = (customersData) => {
    localStorage.setItem('customersData', JSON.stringify(customersData));
};
  
const getTasksStorage = () => {
    return JSON.parse(localStorage.getItem('customersData'));
};

const customersDataBase = new CustomerDataBase();
const customersDataStorage = getTasksStorage()

if(customersDataStorage){
    customersDataBase.addCustomersFromCustomersData(customersDataStorage);
}else{
    customersDataBase.addCustomersFromCustomersData(customersData);
}

const customersContainer = document.querySelector('#customers-container')

const customerForm = document.querySelector('#customer-form')
const customerInputName = document.querySelector('#name')
const customerInputUsername = document.querySelector('#username')
const customerInputPhone = document.querySelector('#phone')
const customerInputStreet = document.querySelector('#street')
const customerInputCity = document.querySelector('#city')
const customerInputProvince = document.querySelector('#province')

const inputs = document.querySelectorAll('.form-customer--input')

const generateRandomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
};

customerForm.addEventListener('submit', e => {
    e.preventDefault()
    
    addCustomer()
    renderCustomers(customersDataBase.customers)
    saveTasksStorage(customersDataBase.customers)

    inputs.forEach(input => input.value = '')
})

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
    
        customersContainer.innerHTML += `
        <div class="customer" id="${id}">
            <p><strong>Nombre</strong>: ${name}</p>
            <p><strong>Usuario</strong>: ${username}</p>
            <p><strong>Teléfono</strong>: ${phone}</p>
            <p><strong>Calle</strong>: ${address.street}</p>
            <p><strong>Ciudad</strong>: ${address.city}</p>
            <p><strong>Provincia</strong>: ${address.province}</p>
            <p><strong>Compras</strong>: ${purchases}</p>
            <p><strong>Puntos</strong>: ${points}</p>
            <button>Editar</button>
        </div>
        <br>
        `
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

customersContainer.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentNode.id
        console.log(id)
    }
})

renderCustomers(customersDataBase.customers)