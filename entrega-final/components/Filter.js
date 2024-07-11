import { renderCustomers } from '../functions/renderCustomers.js'

export const getFilteredCustomers = (customersDataBase, searchTerm) => {
  const filteredCustomers = customersDataBase.customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm) ||
            customer.username.toLowerCase().includes(searchTerm) ||
            customer.phone.toString().includes(searchTerm) ||
            customer.address.street.toLowerCase().includes(searchTerm) ||
            customer.address.city.toLowerCase().includes(searchTerm) ||
            customer.address.province.toLowerCase().includes(searchTerm) ||
            customer.purchases.toString().includes(searchTerm) ||
            customer.points.toString().includes(searchTerm);
  })

  return filteredCustomers
}

export function Filter(customersDataBase, customersContainer){
    const filterInput = document.querySelector('#filter')
    const filterContainer = document.querySelector('#search-customer')
    
    filterContainer.addEventListener('click', () => {
        filterInput.focus()
    })
    
    filterInput.addEventListener("focus", () => {
      filterContainer.classList.add("focus");
    });
    
    filterInput.addEventListener("blur", () => {
      filterContainer.classList.remove("focus");
    });
    
    filterInput.addEventListener('input', () => {
        const searchTerm = filterInput.value.toLowerCase()
        const filteredCustomers = getFilteredCustomers(customersDataBase,searchTerm)
        renderCustomers(filteredCustomers, customersContainer)
    })
  }

