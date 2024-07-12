// Importa los módulos necesarios para la aplicación.
import { CustomerDataBase } from './models/CustomerDataBase.js';
import { renderCustomers } from './functions/renderCustomers.js';
import { getDataFromStorage } from './functions/localStorage.js';
import { App } from './components/App.js';

// Obtiene el contenedor de clientes del DOM.
const customersContainer = document.querySelector('#customers-container');
// Crea una instancia de la base de datos de clientes.
const customersDataBase = new CustomerDataBase();

// Inicializa la base de datos con datos del archivo JSON y del localStorage, 
// luego renderiza los clientes iniciales y inicia la aplicación principal.
customersDataBase.initDataBase('./data/customerData.json', getDataFromStorage('customersData'))
  .then(() => {
    renderCustomers(customersDataBase.customers, customersContainer); // Renderiza los clientes en el contenedor.
    App(customersDataBase, customersContainer); // Inicia la aplicación principal.
  });
