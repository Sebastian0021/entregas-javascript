import { customersData } from './data/customerData.js';
import { CustomerDataBase } from './models/CustomerDataBase.js';
import { searchCustomerById, addCustomer } from './ui/ui.js';

// Inicializar la base de datos de clientes
const customersDataBase = new CustomerDataBase();
customersDataBase.addCustomersFromCustomersData(customersData);

// Prueba para verificar que los datos se cargaron correctamente
console.log(customersDataBase.getCustomerById(1));

// Variable para controlar el bucle del menú
let loop = true;

// Bucle principal del menú
do {
    const action = prompt('Menú de Base de Datos de Clientes\n\n1. Buscar cliente por ID\n2. Agregar nuevo cliente\n3. Salir\n\nIngrese el número de la acción que desea realizar:');
    
    // Validar que la entrada sea exactamente un número entre 1 y 3
    if (/^[1-3]$/.test(action)) {
        switch (parseInt(action)) {
            case 1:
                searchCustomerById(customersDataBase); // Buscar cliente por ID
                break;
            case 2:
                addCustomer(customersDataBase); // Agregar nuevo cliente
                break;
            case 3:
                loop = false; // Salir del programa
                break;
            default:
                alert('Opción no válida. Por favor, ingrese un número del 1 al 3.');
        }
    } else {
        alert('Entrada no válida. Por favor, ingrese un número del 1 al 3.');
    }
} while (loop);
