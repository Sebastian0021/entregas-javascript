// Función que solicita al usuario que ingrese 'a' para continuar o 'x' para volver al menú
export function backToMenu(action) {
    while (true) {
        const accion = prompt(`Ingrese [a] para ${action} o [x] para volver al menú principal.`).toLowerCase();
        if (accion === 'a' || accion === 'x') {
            return accion === 'a'; // Devuelve true si quiere continuar, false si quiere salir
        } else {
            alert('Opción no válida. Por favor, ingrese "a" para continuar o "x" para volver al menú.');
        }
    }
}

// Función que solicita una entrada válida al usuario basada en una expresión regular
export function getValidatedInput(promptMessage, validationRegex, errorMessage) {
    while (true) {
        const input = prompt(promptMessage);
        if (validationRegex.test(input)) {
            return input;
        } else {
            alert(errorMessage);
        }
    }
}
