// Renderiza una lista de clientes en el contenedor especificado.
export function renderCustomers(customersArr, customersContainer) {
  // Limpia el contenido actual del contenedor.
  customersContainer.innerHTML = ''; 

  // Itera sobre cada cliente en el array y crea un elemento HTML para mostrarlo.
  customersArr.forEach(customer => {
    // Extrae los datos del cliente para facilitar su uso.
    const { id, name, username, phone, address, purchases, points } = customer;

    // Crea el contenedor principal para el cliente.
    const customerDiv = document.createElement('div');
    customerDiv.id = id; // Asigna el ID del cliente al elemento para su identificación.
    customerDiv.classList.add('customer--container'); // Añade la clase CSS para estilos.

    // Plantilla HTML para mostrar los datos del cliente en modo normal (no editable).
    const customerHtml = `
      <div class="customer--div1">
        <div class="customer--img-container">
          <img src="./assets/customer-img.svg" alt="">
        </div>
        <div class="customer-info--container1">
          <div class="customer-info">
            <div class="customer-info-col1">
              <p>Nombre</p>
              <p>Usuario</p>
              <p>Teléfono</p>
              <p>Calle</p>
              <p>Ciudad</p>
              <p>Provincia</p>
            </div>
            <div class="customer-info-col2">
              <p>${name}</p>
              <p>${username}</p>
              <p>${phone}</p>
              <p>${address.street}</p>
              <p>${address.city}</p>
              <p>${address.province}</p>
            </div>
          </div>
        </div>
        <div class="customer--action">
          <button class="customer--action-btn edit" data-parentid="${id}"><i class="fa-solid fa-user-pen"></i> Editar</button>
          <button class="customer--action-btn remove" data-parentid="${id}"><i class="fa-solid fa-x"></i> Eliminar</button>
        </div>
      </div>
      <div class="customer--div2">
        <div class="customer-info--container2">
          <div class="customer-info">
            <div class="customer-info2-col1">
              <p>Compras</p>
              <p>Puntos</p>
            </div>
            <div class="customer-info2-col2">
              <p>${purchases}</p>
              <p>${points}</p>
            </div>
          </div>
        </div>
      </div>`;

    // Plantilla HTML para mostrar los datos del cliente en modo de edición (con campos editables).
    const customerEditingHtml = `
      <div class="customer--div1">
        <div class="customer--img-container">
          <img src="./assets/customer-img.svg" alt="">
        </div>
        <div class="customer-info--container1">
          <div class="customer-info-editing">
            <div class="customer-info-col1">
              <label for="name-${id}">Nombre</label>
              <label for="username-${id}">Usuario</label>
              <label for="phone-${id}">Teléfono</label>
              <label for="street-${id}">Calle</label>
              <label for="city-${id}">Ciudad</label>
              <label for="province-${id}">Provincia</label>
            </div>
            <div class="customer-info-col2">
              <input id="name-${id}" class="customer--input" type="text" placeholder="Nombre" value="${name}" required>
              <input id="username-${id}" class="customer--input" type="text" placeholder="Usuario" value="${username.substring(1)}" required>
              <input id="phone-${id}" class="customer--input" type="number" placeholder="Teléfono" value="${phone}" required>
              <input id="street-${id}" class="customer--input" type="text" placeholder="Calle" value="${address.street}" required>
              <input id="city-${id}" class="customer--input" type="text" placeholder="Ciudad" value="${address.city}" required>
              <input id="province-${id}" class="customer--input" type="text" placeholder="Provincia" value="${address.province}" required>
            </div>
          </div>
        </div>
        <div class="customer--action">
          <button class="customer--action-btn remove" data-parentid="${id}"><i class="fa-solid fa-x"></i> Eliminar</button>
        </div>
      </div>
      <div class="customer--div2">
        <div class="customer-info--container2">
          <div class="customer-info-editing">
            <div class="customer-info2-col1">
              <label for="purchases-${id}">Compras</label>
              <label for="points-${id}">Puntos</label>
            </div>
            <div class="customer-info2-col2">
              <input id="purchases-${id}" class="customer--input" type="number" placeholder="Compras" value=${purchases} required>
              <input id="points-${id}" class="customer--input" type="number" placeholder="Puntos" value=${points} required>
            </div>
          </div>
          <div>
            <button class="customer-editing--action-btn edit" data-parentid="${id}">Salir</button>
            <button class="submit--btn add" type="submit" data-parentid="${id}">Guardar</button>
          </div>
        </div>
      </div>`;


    // Inserta el HTML del cliente en el contenedor, dependiendo de si está en modo edición o no.
    customerDiv.innerHTML = customer.isEditing ? customerEditingHtml : customerHtml;
    customersContainer.appendChild(customerDiv); 
  });
}
