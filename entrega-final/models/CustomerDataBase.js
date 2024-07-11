import { Customer } from './Customer.js';

// Clase CustomerDataBase que maneja una colección de clientes
export class CustomerDataBase {
    constructor() {
        this.customers = []; // Lista de clientes
    }
    
    // Método para agregar un cliente individual a la base de datos
    addCustomer(customer) {
        this.customers.push(customer);
    }
    
    // Método para agregar clientes desde un array de datos inicial
    addCustomersFromCustomersData(customersData) {
        customersData.forEach(customer => {
            this.addCustomer(new Customer(customer));
        });
    }

    // Método para obtener un cliente por su ID
    getCustomerById(id) {
        return this.customers.find(customer => customer.id == id);
    }

    removeCustomerById(id) {
        this.customers = this.customers.filter(customer => customer.id !== id);
    }

    updateCustomer(id, updatedCustomer) {
        const customer = this.getCustomerById(id);
        if (customer) {
            Object.assign(customer, updatedCustomer);
        }
    }
}
