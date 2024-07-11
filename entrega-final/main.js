import { CustomerDataBase } from './models/CustomerDataBase.js';
import { renderCustomers } from './functions/renderCustomers.js'
import { getDataFromStorage } from './functions/localStorage.js';
import { App } from './components/App.js';

const customersContainer = document.querySelector('#customers-container')
const customersDataBase = new CustomerDataBase();

customersDataBase.initDataBase('./data/customerData.json', getDataFromStorage('customersData'))
  .then(() => renderCustomers(customersDataBase.customers, customersContainer))

App(customersDataBase, customersContainer)