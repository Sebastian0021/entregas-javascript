import { Form } from './Form.js';
import { Filter } from './Filter.js';
import { Customers } from './Customers.js';

export function App(customersDataBase, customersContainer){
    Form(customersDataBase, customersContainer)
    Filter(customersDataBase, customersContainer)
    Customers(customersDataBase, customersContainer)
}