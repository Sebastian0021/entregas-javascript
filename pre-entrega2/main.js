import { customersData } from './data/customerData.js';
import { CustomerDataBase } from './models/CustomerDataBase.js';
import { searchCustomerById, addCustomer, setCustomerPurchases } from './ui/ui.js';

// Inicializar la base de datos de clientes
const customersDataBase = new CustomerDataBase();
customersDataBase.addCustomersFromCustomersData(customersData);

// Variable para controlar el bucle del menú
let loop = true;

// Bucle principal del menú
do {
    const action = prompt('Menú de Base de Datos de Clientes\n\n1. Buscar cliente por ID\n2. Agregar nuevo cliente\n3. Actualizar número de compras de un cliente\n4. Salir\n\nIngrese el número de la acción que desea realizar:');
    
    // Validar que la entrada sea exactamente un número entre 1 y 4
    if (/^[1-4]$/.test(action)) {
        switch (parseInt(action)) {
            case 1:
                searchCustomerById(customersDataBase, false); // Buscar cliente por ID
                break;
            case 2:
                addCustomer(customersDataBase); // Agregar nuevo cliente
                break;
            case 3:
                setCustomerPurchases(customersDataBase); // Setear el número de compras a un cliente
                break;
            case 4:
                loop = false; // Salir del programa
                break;
            default:
                alert('Opción no válida. Por favor, ingrese un número del 1 al 4.');
        }
    } else {
        alert('Entrada no válida. Por favor, ingrese un número del 1 al 4.');
    }
} while (loop);
