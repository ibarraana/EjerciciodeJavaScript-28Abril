/*
### Ejercicio 4: Registro de Eventos con Timestamps Únicos

Crea un sistema para registrar eventos. Cada evento debe tener un timestamp como clave y una descripción como valor.
1.  Usa un `Map` para almacenar los eventos.
2.  Crea una función `registrarEvento(descripcion)`:
    *   Debe generar un timestamp (puedes usar `Date.now()`).
    *   Para asegurar la unicidad del timestamp como clave (en caso de llamadas muy rápidas), si el timestamp ya existe en el `Map`, intenta con el siguiente milisegundo hasta encontrar uno libre.
    *   Guarda el evento en el `Map`.
3.  Crea una función `obtenerEventosEntre({ inicio, fin })` que use desestructuración para los parámetros `inicio` y `fin` (timestamps). Debe devolver un array de objetos `{ timestamp, descripcion }` para los eventos dentro de ese rango.

**Pistas:**
*   Un `while` loop puede ser útil para encontrar un timestamp único.
*   Para `obtenerEventosEntre`, itera sobre las claves (timestamps) del `Map`.

 */



let registroEventos = new Map()

function registrarEvento(descripcion) {

    let timestamp = Date.now()

    while (registroEventos.has(timestamp)) {
        timestamp = timestamp + 1
    }

    registroEventos.set(timestamp, descripcion)
    
    return timestamp
}


function obtenerEventosEntre(rango) {

    let inicio = rango.inicio
    let fin = rango.fin
    
    let eventosEncontrados = []

    for (let [timestamp, descripcion] of registroEventos) {

        if (timestamp >= inicio && timestamp <= fin) {

            let evento = {
                timestamp: timestamp,
                descripcion: descripcion
            }

            eventosEncontrados.push(evento)
        }
    }

    return eventosEncontrados
}

registrarEvento("Inicio del programa")
registrarEvento("Carga de datos")
let tiempoAhora = Date.now()


// Esto tuve que googlearlo porque no lo entendia como resolverlo, espero que este bien
setTimeout(function() {
    registrarEvento("Fin del proceso")
    
    let misEventos = obtenerEventosEntre({ 
        inicio: tiempoAhora - 5000, 
        fin: tiempoAhora + 5000 
    })
    
    console.log("Eventos en el rango:", misEventos)
}, 100)
