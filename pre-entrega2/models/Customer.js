// Clase Customer que define la estructura de un cliente
export class Customer {
    constructor({ id, name, username, phone, address, purchases = 0, points = 0 }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.phone = phone;
        this.address = address;  // Objeto que contiene la dirección del cliente
        this.purchases = purchases; // Número de compras del cliente
        this.points = points; // Puntos de fidelidad del cliente
    }

    // Método para setear el número de compras de un cliente
    setPurchases(numOfPurchases) {
        this.purchases = numOfPurchases;
    }
}
