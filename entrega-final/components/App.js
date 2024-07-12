import { Form } from './Form.js';
import { Filter } from './Filter.js';
import { Customers } from './Customers.js';

// Inicializa y coordina los componentes principales de la aplicación de gestión de clientes.
export function App(customersDataBase, customersContainer) {
  // Inicializa el formulario para agregar y editar clientes.
  Form(customersDataBase, customersContainer);

  // Inicializa la funcionalidad de filtrado de clientes.
  Filter(customersDataBase, customersContainer);

  // Inicializa la visualización y gestión de la lista de clientes.
  Customers(customersDataBase, customersContainer);
}
