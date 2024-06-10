import { backToMenu, getValidatedInput } from '../utils/utils.js';
import { Customer } from '../models/Customer.js';

// Función para buscar un cliente por ID y mostrar sus detalles
export function searchCustomerById(customersDataBase) {
    do {
        const searchId = parseInt(prompt('Ingrese el ID del cliente que desea buscar:'));
        if (!isNaN(searchId)) {
            const customer = customersDataBase.getCustomerById(searchId);
            if (customer) {
                const { name, username, phone, address: { street, city, province } } = customer;
                alert(`Detalles del Cliente:\n\nNombre: ${name}\nUsuario: ${username}\nTeléfono: ${phone}\nDirección: ${street}, ${city}, ${province}`);
            } else {
                alert('No se encontró ningún cliente con el ID proporcionado.');
            }
        } else {
            alert('ID inválido. Por favor, ingrese un número.');
        }
    } while (backToMenu('buscar otro cliente'));
}

// Función para agregar un nuevo cliente a la base de datos
export function addCustomer(customersDataBase) {
    do {
        const newCustomerData = {};

        newCustomerData.id = getValidatedInput('Ingrese el ID del cliente (solo números):', /^\d+$/, 'ID inválido. Intente nuevamente con solo números.');

        // Verificar si el ID ya existe
        while (customersDataBase.getCustomerById(newCustomerData.id)) {
            alert('El ID proporcionado ya está en uso. Por favor, intente con otro ID.');
            newCustomerData.id = getValidatedInput('Ingrese un nuevo ID para el cliente (solo números):', /^\d+$/, 'ID inválido. Intente nuevamente con solo números.');
        }

        newCustomerData.name = getValidatedInput('Ingrese el nombre completo del cliente (solo letras y espacios):', /^[A-Za-z\s]+$/, 'Nombre inválido. Intente nuevamente con solo letras y espacios.');
        newCustomerData.username = getValidatedInput('Ingrese el nombre de usuario del cliente (debe comenzar con "@"):', /^@.+$/, 'Nombre de usuario inválido. Debe comenzar con "@". Intente nuevamente.');
        newCustomerData.phone = getValidatedInput('Ingrese el número de teléfono del cliente (10 dígitos):', /^\d{10}$/, 'Número de teléfono inválido. Debe contener 10 dígitos. Intente nuevamente.');
        newCustomerData.address = {
            street: getValidatedInput('Ingrese la calle donde vive el cliente:', /.+/, 'La calle no puede estar vacía. Intente nuevamente.'),
            city: getValidatedInput('Ingrese la ciudad donde vive el cliente:', /.+/, 'La ciudad no puede estar vacía. Intente nuevamente.'),
            province: getValidatedInput('Ingrese la provincia donde vive el cliente:', /.+/, 'La provincia no puede estar vacía. Intente nuevamente.')
        };

        customersDataBase.addCustomer(new Customer(newCustomerData));
        alert('Cliente agregado exitosamente.');

    } while (backToMenu('agregar otro cliente'));
}
