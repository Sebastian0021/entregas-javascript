import { backToMenu, getValidatedInput } from '../utils/utils.js';
import { Customer } from '../models/Customer.js';

// Función para buscar un cliente por ID y mostrar sus detalles
export function searchCustomerById(customersDataBase, get) {
    do {
        const searchId = getValidatedInput('Ingrese el ID del cliente que desea buscar (solo números):', /^\d+$/, 'ID inválido. Por favor, ingrese un número.');
        const customer = customersDataBase.getCustomerById(parseInt(searchId));
        if (customer) {
            if (get) {
                return customer; // Devuelve el cliente si get es true
            }
            // Desestructuración del objeto customer para mostrar sus detalles
            const { name, username, phone, address: { street, city, province } } = customer;
            alert(`Detalles del Cliente:\n\nNombre: ${name}\nUsuario: ${username}\nTeléfono: ${phone}\nDirección: ${street}, ${city}, ${province}`);
        } else {
            alert('No se encontró ningún cliente con el ID proporcionado.');
        }
    } while (backToMenu('buscar otro cliente'));
}

// Función para setear el número de compras de un cliente
export function setCustomerPurchases(customersDataBase) {
    do {
        // Buscar y obtener el cliente al que se desea actualizar el número de compras
        const customer = searchCustomerById(customersDataBase, true);
        if (customer) {
            // Obtener y validar el número de compras ingresado por el usuario
            const numOfPurchases = getValidatedInput('Ingrese el número de compras del cliente (solo números):', /^\d+$/, 'Error. Intente nuevamente con solo números.');
            customer.setPurchases(parseInt(numOfPurchases)); // Actualizar el número de compras del cliente
            alert(`Número de compras de ${customer.name} actualizado exitosamente.`);
        }
    } while (backToMenu('actualizar el número de compras de otro cliente'));
}

// Función para agregar un nuevo cliente a la base de datos
export function addCustomer(customersDataBase) {
    do {
        const newCustomerData = {};

        // Obtener y validar el ID del nuevo cliente
        newCustomerData.id = getValidatedInput('Ingrese el ID del cliente (solo números):', /^\d+$/, 'ID inválido. Intente nuevamente con solo números.');

        // Verificar si el ID ya existe en la base de datos
        while (customersDataBase.getCustomerById(parseInt(newCustomerData.id))) {
            alert('El ID proporcionado ya está en uso. Por favor, intente con otro ID.');
            newCustomerData.id = getValidatedInput('Ingrese un nuevo ID para el cliente (solo números):', /^\d+$/, 'ID inválido. Intente nuevamente con solo números.');
        }

        // Obtener y validar el nombre completo del nuevo cliente
        newCustomerData.name = getValidatedInput('Ingrese el nombre completo del cliente (solo letras y espacios):', /^[A-Za-z\s]+$/, 'Nombre inválido. Intente nuevamente con solo letras y espacios.');
        // Obtener y validar el nombre de usuario del nuevo cliente
        newCustomerData.username = getValidatedInput('Ingrese el nombre de usuario del cliente (debe comenzar con "@"):', /^@.+$/, 'Nombre de usuario inválido. Debe comenzar con "@". Intente nuevamente.');
        // Obtener y validar el número de teléfono del nuevo cliente
        newCustomerData.phone = getValidatedInput('Ingrese el número de teléfono del cliente (10 dígitos):', /^\d{10}$/, 'Número de teléfono inválido. Debe contener 10 dígitos. Intente nuevamente.');
        // Obtener y validar la dirección del nuevo cliente
        newCustomerData.address = {
            street: getValidatedInput('Ingrese la calle donde vive el cliente:', /.+/, 'La calle no puede estar vacía. Intente nuevamente.'),
            city: getValidatedInput('Ingrese la ciudad donde vive el cliente:', /.+/, 'La ciudad no puede estar vacía. Intente nuevamente.'),
            province: getValidatedInput('Ingrese la provincia donde vive el cliente:', /.+/, 'La provincia no puede estar vacía. Intente nuevamente.')
        };

        // Agregar el nuevo cliente a la base de datos
        customersDataBase.addCustomer(new Customer(newCustomerData));
        alert('Cliente agregado exitosamente.');

    } while (backToMenu('agregar otro cliente'));
}
