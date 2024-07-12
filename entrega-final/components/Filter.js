import { renderCustomers } from '../functions/renderCustomers.js';

// Función para filtrar los clientes en base a un término de búsqueda
export const getFilteredCustomers = (customersDataBase, searchTerm) => {
  // Se filtran los clientes cuyo nombre, usuario, teléfono, dirección, compras o puntos
  // contengan el término de búsqueda (sin distinguir mayúsculas/minúsculas).
  const filteredCustomers = customersDataBase.customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm) ||
           customer.username.toLowerCase().includes(searchTerm) ||
           customer.phone.toString().includes(searchTerm) ||
           customer.address.street.toLowerCase().includes(searchTerm) ||
           customer.address.city.toLowerCase().includes(searchTerm) ||
           customer.address.province.toLowerCase().includes(searchTerm) ||
           customer.purchases.toString().includes(searchTerm) ||
           customer.points.toString().includes(searchTerm);
  });

  return filteredCustomers; // Retorna el array de clientes filtrados
};

// Función principal para gestionar el filtrado de clientes
export function Filter(customersDataBase, customersContainer) {
  const filterInput = document.querySelector('#filter'); // Obtiene el elemento de entrada de texto para el filtro
  const filterContainer = document.querySelector('#search-customer'); // Obtiene el contenedor del filtro

  // Agrega un event listener para enfocar el input al hacer clic en el contenedor del filtro
  filterContainer.addEventListener('click', () => {
    filterInput.focus(); 
  });

  // Agrega un event listener para agregar la clase "focus" al contenedor cuando el input tiene foco
  filterInput.addEventListener("focus", () => {
    filterContainer.classList.add("focus");
  });

  // Agrega un event listener para quitar la clase "focus" del contenedor cuando el input pierde el foco
  filterInput.addEventListener("blur", () => {
    filterContainer.classList.remove("focus");
  });

  // Agrega un event listener para filtrar y renderizar los clientes cada vez que se escribe en el input
  filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase(); // Obtiene el término de búsqueda y lo convierte a minúsculas
    const filteredCustomers = getFilteredCustomers(customersDataBase, searchTerm); // Filtra los clientes
    renderCustomers(filteredCustomers, customersContainer); // Renderiza los clientes filtrados
  });
}
